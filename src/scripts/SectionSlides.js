import VirtualScroll from 'virtual-scroll';
import { gsap } from 'gsap';
import { RollerSection } from './RollerSection';
import { animateSkills, animateEducation } from './sections-animations';
import { sections } from './config';

window.onbeforeunload = () => window.scrollTo(0, 0);

export class SectionSlides {

    constructor (el, menu) {
        this.DOM = {
            container: el
        };
        this.scroller = new VirtualScroll({
            preventTouch: true,
            passive: true
        });

        this.menu = menu;
        
        this.sections = {
            list: sections,
            index: 0,
            length: Object.keys(sections).length
        };
        this.currentSection = this.sections.list[this.sections.index];
        
        this.nbOfWorks = Object.keys(sections);

        this.sumScroll = 0;
        this.timer;

        this.translateY = 0;
        this.isScrolling = false;

        // CREATE ROLLER CLASS --> séparer les responsabilités
        this.worksIndex = 0;

        this.rollerSection = new RollerSection(document.querySelector('[data-roller-section]'));
        this.indexRollerSection = 3;
        
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

    onClickMenu (indexSection) {
        this.setCurrentSection(indexSection);
        this.scroll();
    }

    bindSectionSlide (handler) {
        this.onSectionSlide = handler;
    }

    onScroll (deltaY) {
        console.log('event');
        this.sumScroll += deltaY;

        if (!this.timer) {
                this.timer = setTimeout(() => {
                console.log("end timer");
                this.sumScroll = 0;
                clearTimeout(this.timer);
                this.timer = undefined;
            }, 700);
        }
        
        if (!(Math.abs(this.sumScroll) > 600)) return;

        
        if (this.isScrolling) return;

        const goesDown = deltaY < 0;
        
        if (this.sections.index === this.indexRollerSection) {
            if (goesDown && !this.rollerSection.isAtBottom()) {
                this.rollerSection.roll(1);
                return;
            };
            if (!goesDown && !this.rollerSection.isAtTop()) {
                this.rollerSection.roll(-1);
                return;
            }
        }

        if (goesDown && this.isAtBottom()) return;
        this.rollerSection.reset();
        if (!goesDown && this.isAtTop()) return;

        // if (this.isOnRollerSection() && !this.rollerSection.isOnBoundaries()) return;
        
        if (deltaY < 0) this.sections.index++;
        if (deltaY > 0) this.sections.index--;

        if (this.sections.index === this.indexRollerSection) {
            this.rollerSection.roll(1);
        }

        this.setCurrentSection(this.sections.index);

        this.onSectionSlide(this.sections.index);

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