import gsap from 'gsap';
import { getDistanceTo } from 'utils/getters';
import { Animation } from 'modules/Animation';

export class TranslateYSkewY extends Animation {

    constructor(element, duration, delay, ease) {
        super(element, duration, delay, ease, element);

        this.mask = this.element.closest('[data-animation-mask]');
        this.translateY = getDistanceTo(this.element, 'top', this.mask, 'bottom');
    }

    animateIn() {
        super.animateIn();

        gsap.from(this.element, {
            translateY: this.translateY = 70,
            skewY: '40deg',
            duration: this.duration,
            delay: this.delay,
            ease: this.ease
        });
    }

    animateOut() {
        super.animateOut();

        gsap.to(this.element, {
            translateY: -this.translateY,
            skewY: '0deg',
            duration: this.duration,
            delay: this.delay,
            ease: this.ease
        });
    }

}