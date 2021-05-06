export class SidebarMenu {

    constructor (el, stepsNavigation) {
        this.DOM = {
            sidebar: el,
            marker: el.querySelector('[data-marker'),
            nav: el.querySelector('[data-nav]'),
            entries: el.querySelectorAll('[data-entry]')
        };

        this.stepsNavigation = stepsNavigation;

        this.initElements();
        this.initEvents();
    }

    initElements () {
        const markerInitialY = this.getYOf(this.DOM.entries[0]);
        this.DOM.marker.style.transform = `translate3D(0, ${markerInitialY}px, 0)`;
    }

    initEvents () {
        this.DOM.nav.addEventListener('click', e => {
            e.preventDefault();
            if (!e.target.closest('[data-entry]')) return;
            const entry = e.target.closest('[data-entry]');
            this.moveMarker(entry);
            this.DOM.entries.forEach((el, i) => {
                if (el === entry) {
                    this.onClickMenu(i+1);
                    this.stepsNavigation.scroll();
                }
            });
        });
    }

    bindClickMenu (callback) {
        this.onClickMenu = callback;
    }

    onSlideSection (sectionIndex) {
        this.moveMarker(this.DOM.entries[sectionIndex]);
    }

    moveMarker (target) {
        // if (target.classList.contains('folder')) this.openFolder(target);
        const targetY = this.getYOf(target);
        this.DOM.marker.style.transform = `translate3D(0, ${targetY}px, 0)`;
    }

    openFolder (folder) {
        folder.parentElement.classList.add('open');
    }

    getYOf (entry) {
        const bounding = entry.getBoundingClientRect();
        return bounding.top + bounding.height/2 - (this.DOM.marker.getBoundingClientRect().height / 2);
    }
    
}