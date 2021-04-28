import paper from 'paper';
import SimplexNoise from 'simplex-noise';

let clientX = -10;
let clientY = -10;

let lastX = 0;
let lastY = 0;
let isStuck = false;
let group, stuckX, stuckY;

const initCursor = () => {
    document.addEventListener('mousemove', e => {
        clientX = e.clientX;
        clientY = e.clientY;
    });
};

const initCanvas = () => {
    const canvas = document.querySelector('.cursor--canvas');
    const shapeBounds = {
        width: 50,
        height: 50
    };
    paper.setup(canvas);
    
    const strokeWidth = 1;
    const noiseScale = 80;
    const noiseRange = 4;
    let isNoisy = false;

    const polygons = [
        new paper.Path.RegularPolygon({
            center: [0, 0],
            sides: 8,
            radius: 15,
        }),
        new paper.Path.RegularPolygon({
            center: [0, 0],
            sides: 8,
            radius: 15,
        })
    ];

    const smallCursor = new paper.Path.Circle({
        center: [clientX, clientY],
        radius: 3,
        fillColor: '#262626'
    })
    smallCursor.blendMode = 'difference';

    group = new paper.Group({
        children: [polygons[0], polygons[1]],
        strokeColor: '#262626',
        strokeWidth: strokeWidth
    });

    group.applyMatrix = false;

    const noiseObjects = [
        polygons[0].segments.map(() => new SimplexNoise()),
        polygons[1].segments.map(() => new SimplexNoise())
    ];

    let bigCoordinates = [];

    const lerp = (a, b, n) => {
        return (1 - n) * a + n * b;
    };

    const map = (value, in_min, in_max, out_min, out_max) => {
        return (
            ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    };

    paper.view.onFrame = event => {
        smallCursor.position = new paper.Point(clientX, clientY);
        if (!isStuck) {
            lastX = lerp(lastX, clientX, 0.2);
            lastY = lerp(lastY, clientY, 0.2);
            group.position = new paper.Point(lastX, lastY);
        } else {
            lastX = lerp(lastX, stuckX, 0.2);
            lastY = lerp(lastY, stuckY, 0.2);
            group.position = new paper.Point(lastX, lastY);
        }
        
        if (isStuck && polygons[0].bounds.width < shapeBounds.width) {
            polygons.forEach(p => {
                p.scale(1.08);
            });
        } else if (!isStuck && polygons[0].bounds.width > 30) {
            if (isNoisy) {
                polygons.forEach(p => {
                    p.segments.forEach((segment, i) => {
                        segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
                    });
                });
                isNoisy = false;
                bigCoordinates = [];
            }
            polygons.forEach(p => {
                p.scale(0.92);
            });
        }

        if (isStuck && polygons[0].bounds.width >= shapeBounds.width) {
            isNoisy = true;
            if (bigCoordinates.length === 0) {
                polygons.forEach(p => {
                    p.segments.forEach((segment, i) => {
                        bigCoordinates[i] = [segment.point.x, segment.point.y];
                    });
                });
            }
            polygons.forEach((p, j) => {
                p.segments.forEach((segment, i) => {
                    const noiseX = noiseObjects[j][i].noise2D(event.count / noiseScale, 0);
                    const noiseY = noiseObjects[j][i].noise2D(event.count / noiseScale, 1);
                    const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
                    const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
                    const newX = bigCoordinates[i][0] + distortionX;
                    const newY = bigCoordinates[i][1] + distortionY;
                    segment.point.set(newX, newY);
                });
            });
        }
        polygons.forEach(p => {
            p.smooth({ type: 'geometric'});
        });
    }
};

const initHovers = () => {
    const handleMouseEnter = e => {
        console.log("ok");
        const navItemBox = e.currentTarget.getBoundingClientRect();
        stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
        stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
        isStuck = true;
    }

    const handleMouseLeave = () => {
        isStuck = false;
    }

    const linkItems = document.querySelectorAll('.link');
    linkItems.forEach((linkItem) => {
        linkItem.addEventListener('mouseenter', handleMouseEnter);
        linkItem.addEventListener('mouseleave', handleMouseLeave);
    })
}

initHovers();
initCanvas();
initCursor();
