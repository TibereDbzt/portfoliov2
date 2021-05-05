import VirtualScroll from 'virtual-scroll';
import { gsap } from 'gsap';
import { RollerSection } from './RollerSection';
import { animateSkills, animateEducation } from './sections-animations';
import { sections } from './config';

window.onbeforeunload = () => window.scrollTo(0, 0);

export class StepsNavigation {

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

        // CREATE ROLLER CLASS --> séparer les responsabilités
        this.worksIndex = 0;

        this.iniEvents();
    }

    iniEvents () {
        this.scroller.on(e => this.onScroll(e.deltaY));
    }

    animateContainer () {
        this.isScrolling = true;
        gsap.to(this.DOM.container, {
            y: this.translateY,
            duration: 0.4,
            ease: 'expo.inOut',
            onComplete: () => this.isScrolling = false
        })
    }

    animateSection () {
        const sectionID = this.currentSection.id;
        const animations = {
            'skills' : animateSkills(this.currentSection),
            'education' : animateEducation(this.currentSection),
            // 'works' : animateWorks(this.currentSection)
        }
        return animations[sectionID];
    }

    setCurrentSection (i) {
        this.sections.index = i;
        this.currentSection = this.sections.list[i];
    }

    setTranslateY () {
        this.translateY -= this.currentSection.getBoundingClientRect().top
    }

    scroll () {
        this.setTranslateY();
        this.animateContainer();
        this.animateSection();
    }

    onScroll (deltaY) {
        if (this.isScrolling) return;

        if (deltaY < 0 && this.isAtBottom()) return;
        if (deltaY > 0 && this.isAtTop()) return;

        // if (this.isOnRollerSection() && !this.rollerSection.isOnBoundaries()) return;
        
        if (deltaY < 0) this.sections.index++;
        if (deltaY > 0) this.sections.index--;

        this.setCurrentSection(this.sections.index);

        this.scroll();
    }

    // HELPERS
    isAtBottom () {
        return this.sections.index === this.sections.length - 1;
    }

    isAtTop () {
        return this.sections.index === 0;
    }

    isOnRollerSection () {
        return this.currentSection.hasAttribute('data-section-roller');
    }
}