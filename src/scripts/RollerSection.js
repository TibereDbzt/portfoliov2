import { gsap } from 'gsap';

export class RollerSection {
    
    constructor (el) {
        this.DOM = {
            roller: el,
            masks: el.querySelectorAll('[data-roller-mask]'),
        };
        this.length = this.DOM.roller.dataset.rollerItems;
        this.index = -1;
    }

    isAtTop () {
        return this.index === 0;
    }

    isAtBottom () {
        return this.index === this.length - 1;
    }

    reset () {
        this.index = -1;
        this.DOM.masks.forEach(mask => {
            const containers = mask.querySelectorAll('[data-roller-container]');
            containers.forEach(container => {
                gsap.set(container, {delay: 0.2, clearProps: 'y'});
            });
        });
    }

    isLeaving (deltaY) {
        const goesDown = deltaY < 0;
        return (goesDown && this.isAtBottom()) || (!goesDown && this.isAtTop());
    }

    roll (deltaY) {
        const goesDown = deltaY < 0;

        if (this.index === -1) this.index = 0;
        else goesDown ? this.index += 1 : this.index -= 1;
        
        this.DOM.masks.forEach(mask => {
            const containers = mask.querySelectorAll('[data-roller-container]');
            containers.forEach(container => {
                const items = container.querySelectorAll('[data-roller-item');
                const target = items[this.index];
                const tY = target.offsetTop;
                gsap.to(container, {y: -tY, duration: 1});
                // animSkewTY(container, 800, 0, easings.easeInOutQuint);
            });
        });
    }
    
}
