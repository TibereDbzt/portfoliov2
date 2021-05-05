import paper from 'paper';
import SimplexNoise from 'simplex-noise';
import { lerp, map, getMousePos } from './modules/utils';
import { colors } from './config';

let mouse = {x: -10, y: -10};
window.addEventListener('mousemove', e => mouse = getMousePos(e));

const shapeBounds = {
    width: 60,
    height: 60
};
const noiseScale = 80;
const noiseRange = 4;

export default class NoisyCursor {

    constructor (nb) {
        this.noise = [];
        this.cursors = this.createCursors(nb);
        this.group = this.createGroup();
        this.group.applyMatrix = false;

        this.isStuck = false;
        this.isNoisy = false;

        this.lastX = 100;
        this.lastY = 100;

        this.stuckX = 0;
        this.stuckY = 0;

        this.bigCoordinates = [];
    }

    createNoise (shape) {
        this.noise.push(shape.segments.map(() => new SimplexNoise()));
    }

    createCursors (nb) {
        let shapes = [];
        for (let i = 0; i < nb; i++) {
            const polygon = new paper.Path.RegularPolygon({
                center: [mouse.x, mouse.y],
                radius: 15,
                sides: 8
            });
            shapes.push(polygon);
            this.createNoise(polygon);
        }
        return shapes;
    }

    createGroup () {
        return new paper.Group({
            children: this.cursors,
            strokeColor: colors.black,
            strokeWidth: 1
        })
    }

    onMouseEnter (e) {
        const navItemBox = e.currentTarget.getBoundingClientRect();
        this.stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
        this.stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
        this.isStuck = true;
    }

    onMouseLeave () {
        this.isStuck = false;
    }

    updateCoords(lastX, lastY, currentX, currentY) {
        this.lastX = lerp(lastX, currentX, 0.2);
        this.lastY = lerp(lastY, currentY, 0.2);
    }

    isBigEnough () {
        return this.cursors[0].bounds.width > 30;
    }

    removeNoise () {
        this.cursors.forEach(c => {
            c.segments.forEach((segment, i) => {
                segment.point.set(this.bigCoordinates[i][0], this.bigCoordinates[i][1]);
            });
        });
    }

    distordCoords (count, indexCursor, indexSegment) {
        const noiseX = this.noise[indexCursor][indexSegment].noise2D(count / noiseScale, 0);
        const noiseY = this.noise[indexCursor][indexSegment].noise2D(count / noiseScale, 1);
        const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
        const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
        const x = this.bigCoordinates[indexSegment][0] + distortionX;
        const y = this.bigCoordinates[indexSegment][1] + distortionY;
        return {x, y};
    }

    render (event) {
        // check if is on link
        this.isStuck ? this.updateCoords(this.lastX, this.lastY, this.stuckX, this.stuckY) : this.updateCoords(this.lastX, this.lastY, mouse.x, mouse.y);
        
        // console.log(this.lastX, this.lastY);
        this.group.position = new paper.Point(this.lastX, this.lastY);
        
        // LINK HOVERED and NOT BIG ENOUGH
        if (this.isStuck && this.cursors[0].bounds.width < shapeBounds.width) {
            this.cursors.forEach(p => {
                p.scale(1.08);
            });
        // LINK NOT HOVERED and TOO BIG
        } else if (!this.isStuck && this.cursors[0].bounds.width > 30) { ///////////////////////////////
            // hited once when leave a link
            if (this.isNoisy) {
                this.removeNoise();
                this.isNoisy = false;
                this.bigCoordinates = [];
            }
            this.cursors.forEach(c => {
                c.scale(0.92);
            });
        }

        // LINK HOVERED and BIG ENOUGH
        if (this.isStuck && this.cursors[0].bounds.width >= shapeBounds.width) {
            this.isNoisy = true;
            // hited once to set bigCoordinates
            if (this.bigCoordinates.length === 0) {
                this.cursors.forEach(c => {
                    c.segments.forEach((segment, i) => {
                        this.bigCoordinates[i] = [segment.point.x, segment.point.y];
                    });
                });
            }
            // apply bigCoordinates every time
            this.cursors.forEach((c, i) => {
                c.segments.forEach((segment, j) => {
                    const distorded = this.distordCoords(event.count, i, j);
                    segment.point.set(distorded.x, distorded.y);
                });
            });
        }
        this.cursors.forEach(c => {
            c.smooth({ type: 'geometric'});
        });
    }
    
}