import { debounce } from 'lodash-es';

import VirtualScroll from 'virtual-scroll';
import { gsap } from 'gsap';
import { RollerSection } from './RollerSection';
import { animateSkills, animateEducation } from './sections-animations';
import { sections } from './config';

window.onbeforeunload = () => window.scrollTo(0, 0);

export class SectionSlides {

    constructor (el) {
        this.DOM = {
            container: el
        };
        this.scroller = new VirtualScroll({
            preventTouch: true,
            passive: true
        });
        
        this.sections = {
            list: sections,
            index: 0,
            length: Object.keys(sections).length
        };
        this.currentSection = this.sections.list[this.sections.index];
        
        this.nbOfWorks = Object.keys(sections);

        this.translateY = 0;
        this.isScrolling = false;

        this.worksIndex = 0;

        this.rollerSection = new RollerSection(document.querySelector('[data-roller-section]'));
        this.indexRollerSection = 3;
        
        this.initEvents();
    }

    initEvents () {
        const bounced = debounce(this.onScroll.bind(this), 400, {
            'leading': true,
            'trailing': false
        });
        this.scroller.on(e => {
            console.log(e.originalEvent);
            bounced(e.deltaY);
        });
    }

    animateContainer () {
        this.isScrolling = true;
        gsap.to(this.DOM.container, {
            y: this.translateY,
            duration: 0.4,
            ease: 'expo.inOut',
            onComplete: () => { this.isScrolling = false; }
        });
    }

    animateSection () {
        const sectionID = this.currentSection.id;
        const animations = {
            'skills': animateSkills(this.currentSection),
            'education': animateEducation(this.currentSection),
        };
        return animations[sectionID];
    }

    setCurrentSection (i) {
        this.sections.index = i;
        this.currentSection = this.sections.list[i];
    }

    setTranslateY () {
        this.translateY -= this.currentSection.getBoundingClientRect().top;
    }

    scroll () {
        this.setTranslateY();
        this.animateContainer();
        this.animateSection();
    }

    onClickMenu (indexSection) {
        if (indexSection === this.sections.index) return;
        if (this.isOnRollerSection()) this.rollerSection.reset();
        this.setCurrentSection(indexSection);
        this.scroll();
        if (this.isOnRollerSection()) this.rollerSection.roll(-1);
    }

    bindSectionSlide (handler) {
        this.onSectionSlide = handler;
    }

    isOnRollerSection () {
        return this.sections.index === this.indexRollerSection;
    }

    onScroll (deltaY) {
        if (this.isOnRollerSection() && !this.rollerSection.isLeaving(deltaY)) {
            this.rollerSection.roll(deltaY);
            return;
        }

        if (this.isOnRollerSection() && this.rollerSection.isLeaving(deltaY)) this.rollerSection.reset();

        const goesDown = deltaY < 0;

        if (goesDown && this.isAtBottom()) return;
        if (!goesDown && this.isAtTop()) return;
        
        if (goesDown) this.sections.index++;
        if (!goesDown) this.sections.index--;

        this.setCurrentSection(this.sections.index);

        this.onSectionSlide(this.sections.index);

        this.scroll();

        if (this.isOnRollerSection()) this.rollerSection.roll(deltaY);
    }

    // HELPERS
    isAtBottom () {
        return this.sections.index === this.sections.length - 1;
    }

    isAtTop () {
        return this.sections.index === 0;
    }

}
