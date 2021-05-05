import { StepsNavigation } from './StepsNavigation';
import { sections } from './config';

console.log(document.querySelector('[data-scroll-container'));
const navigation = new StepsNavigation(document.querySelector('[data-scroll-container'));

export class SidebarMenu {

    constructor (el) {
        this.DOM = {
            sidebar: el,
            marker: el.querySelector('[data-marker'),
            nav: el.querySelector('[data-nav]'),
            entries: el.querySelectorAll('[data-entry]')
        };
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
                    navigation.setCurrentSection(i);
                    navigation.scroll();
                }
            });
        });
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