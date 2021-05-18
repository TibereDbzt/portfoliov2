import gsap from 'gsap';
import { getMousePos } from './modules/utils';

let mouse = {x: -10, y: -10};
window.addEventListener('mousemove', e => { mouse = getMousePos(e); });

export class DotCursor {

    constructor (el) {
        this.DOM = el;
        this.initEvents();
        this.render();
    }

    initEvents () {
        document.addEventListener('mouseleave', e => this.onScreenLeave());
        document.addEventListener('mouseenter', e => this.onScreenEnter());
    }

    onScreenLeave () {
        gsap.to(this.DOM, {opacity: 0, duration: 0.5, ease: "power4.out"});
    }
    
    onScreenEnter () {
        gsap.to(this.DOM, {opacity: 1, duration: 0.5, ease: "power4.out"});
    }

    render () {
        this.DOM.style.transform = `translate3D(${mouse.x}px, ${mouse.y}px, 0)`;
        requestAnimationFrame(() => this.render());
    }

}
