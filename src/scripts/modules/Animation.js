export class Animation {

    constructor(element, duration, delay, ease, target = null) {
        this.element = element;

        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.target = target ? target : element;

        this.isVisible = false;

        if ('IntersectionObserver' in window) {
            this.createObserver();
            this.animateOut();
        } else {
            this.animateIn();
        }
    }

    createObserver() {
        console.log(this.element);
        this.observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!this.isVisible && entry.isIntersecting) {
                    this.animateIn();
                }
            });
        }).observe(this.element);
    }

    animateIn() {
        this.isVisible = true;
    }

    animateOut() {
        this.isVisible = false;
    }

}