import paper from 'paper';
import NoisyCursor from './NoisyCursor';

export class PaperCanvas {

    constructor (el) {
        this.DOM = el;

        this.initCanvas();
        this.initCursor();
        this.initEvents();

        this.render();
    }

    initCanvas () {
        paper.setup(this.DOM);
    }

    initCursor () {
        this.noisyCursor = new NoisyCursor(2);
    }

    initEvents () {
        // events delegation ??
        document.querySelectorAll('.link').forEach((linkItem) => {
            linkItem.addEventListener('mouseenter', e => this.noisyCursor.onMouseEnter(e));
            linkItem.addEventListener('mouseleave', () => this.noisyCursor.onMouseLeave());
        });
    }
    
    render () {
        paper.view.onFrame = e => {
            this.noisyCursor.render(e);
        };
    }
    
}
