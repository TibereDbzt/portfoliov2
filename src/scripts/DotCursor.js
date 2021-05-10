import { getMousePos } from './modules/utils';

let mouse = {x: -10, y: -10};
window.addEventListener('mousemove', e => { mouse = getMousePos(e); });

export class DotCursor {

    constructor (el) {
        this.DOM = el;
        this.render();
    }

    render () {
        this.DOM.style.transform = `translate3D(${mouse.x}px, ${mouse.y}px, 0)`;
        requestAnimationFrame(() => this.render());
    }

}
