import { gsap } from 'gsap';

export class RollerSection {
    
    constructor (el) {
        this.DOM = {
            roller: el,
            masks: el.querySelectorAll('[data-roller-mask]'),
            previews: el.querySelector('[data-preview]'),
            currentPreview: el.querySelectorAll('[data-preview-image]')[0],
            maskPreview: el.querySelector('[data-preview-mask]')
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
            const currentItem = mask.querySelectorAll('[data-roller-item]')[this.index];
            const contentHeight = currentItem.getBoundingClientRect().height;
            const containers = mask.querySelectorAll('[data-roller-container]');
            containers.forEach(container => {
                const items = container.querySelectorAll('[data-roller-item');
                const target = items[this.index];
                const tY = target.offsetTop;
                gsap.to(container, {y: -tY, duration: 1});
                gsap.to(mask, {height: contentHeight, duration: 1});
            });
        });

        const currentImage = this.DOM.previews.querySelectorAll('[data-preview-image]')[this.index];
        // console.log(currentImage);
        // currentImage.style.opacity = '1';
        // this.DOM.currentPreview.style.opacity = '0';
        
        this.DOM.maskPreview.style.opacity = '1';
        setTimeout(() => {
            currentImage.style.opacity = '1';
            this.DOM.currentPreview.style.opacity = '0';
            this.DOM.currentPreview = currentImage;
            this.DOM.maskPreview.style.opacity = '0';
        }, 1000);
    }
    
}
