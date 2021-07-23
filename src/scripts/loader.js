import paper from 'paper';
import SimplexNoise from 'simplex-noise';
import { getClientSize } from 'utils/getters';
import { map } from 'utils/math';

let client = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener('resize', e => { client = getClientSize(e); });

const initCanvas = () => {
    const noiseScale = 80;
    const noiseRange = 4;
    let bigCoordinates = [];
    const canvas = document.querySelector('.loader--canvas');

    paper.setup(canvas);

    const background = new paper.Path.Rectangle({
        point: [0, 0],
        size: [client.width, client.height]
    });

    background.fillColor = '#000000';
    // background.fullySelected = true;
    background.applyMatrix = false;
    // background.blendMode = 'substract';

    const loader = [
        new paper.Path.RegularPolygon({
            center: [0, 0],
            sides: 8,
            radius: 35,
            applyMatrix: false
        }),
        new paper.Path.RegularPolygon({
            center: [0, 0],
            sides: 8,
            radius: 35,
            applyMatrix: false
        })
    ];

    // loader[0].blendMode = 'substract';

    const group = new paper.Group({
        children: [loader[0], loader[1]],
        strokeColor: '#000000',
        fillColor: '#ffffff',
        strokeWidth: 1
    });
    group.applyMatrix = false;
    // group.fullySelected = true;

    const rateText = new paper.PointText(new paper.Point(client.width / 2, client.height / 2));
    rateText.fillColor = '#0000000';
    rateText.fontFamily = 'Graphik';
    // rateText.applyMatrix = false;

    group.position = new paper.Point(client.width / 2, client.height / 2);

    const noiseObjects = [
        loader[0].segments.map(() => new SimplexNoise()),
        loader[1].segments.map(() => new SimplexNoise())
    ];

    const symbols = '#[_-{}$;/%]!*?><=+'.split('');

    const textAnimation = setInterval(() => {
        rateText.tween({
            scaling: 2,
            opacity: 0.1
        }, {
            scaling: 1,
            opacity: 1
        }, {
            duration: 90,
            easing: 'easeInQuad'
        });
        rateText.content = symbols[Math.floor(Math.random() * symbols.length)];
    }, 300);

    window.addEventListener('load', e => {
        console.log('ok');
        const revealAnimation = setTimeout(() => {
            let tween = group.tweenTo({
                scaling: 30,
                opacity: 1
            }, {
                duration: 1200,
                easing: 'easeInOutQuart'
            });
            tween.then(() => {
                group.remove();
                background.remove();
                rateText.remove();
                clearInterval(textAnimation);
            });
            clearTimeout(revealAnimation);
        }, 500);
    });

    window.addEventListener('resize', () => {
        group.position = new paper.Point(client.width / 2, client.height / 2);
    });

    paper.view.onFrame = event => {
        if (bigCoordinates.length === 0) {
            loader.forEach(p => {
                p.segments.forEach((segment, i) => {
                    bigCoordinates[i] = [segment.point.x, segment.point.y];
                });
            });
        }

        loader.forEach((p, j) => {
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

        // background.exclude(loader[0]);
        loader[0].smooth();
        loader[1].smooth();
    };
};

initCanvas();