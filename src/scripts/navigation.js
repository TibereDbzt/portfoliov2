import VirtualScroll from 'virtual-scroll';
import { gsap } from 'gsap';
import { animSkewTY, animBandReveal, animSkewOpacity, animOpacity, animTableReveal } from './modules/animations';
import { sections, easings } from './config';
import { SidebarMenu } from './SidebarMenu';

const scrollElement = document.querySelector('#scroll-container');
const scroller = new VirtualScroll({
    preventTouch: true,
    passive: true
});

let indexSection = 0;
let translateY = 0;
let isAnimating = false;
let indexWorks = -1;
const nbWorks = 3;

const animateScroll = (dY) => {
    isAnimating = true;
    gsap.to(scrollElement, {y: dY, duration: 0.4, ease: 'expo.inOut', onComplete: () =>{
        isAnimating = false;
        if (indexWorks < 0) {
            animateWorks();
        }
    }});
}

const animateElements = () => {
    const sectionEl = sections[indexSection];
    const sectionID = sections[indexSection].id;
    switch (sectionID) {
        case 'skills':
            animateSkills(sectionEl);
            break;
        case 'education':
            animateEducation(sectionEl);
            break;
        case 'worldmapquiz':
            animateWorldMapQuiz(sectionEl);
            break;
        default:
            break;
    }
}

const animateSkills = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1200, 0, easings.easeOutQuint).play();

    const description = section.querySelector('.animSkewOpacity');
    animSkewOpacity(description, 1500, 200, easings.easeInOutQuint, 0).play();

    const skillNames = section.querySelectorAll('.animTableReveal');
    skillNames.forEach((el, i) => {
        const anim = animTableReveal(el, 1200, 250*i, easings.easeInOutQuint, 750);
        anim.mask.play();
        anim.content.play();
    });
}

const animateEducation = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1200, 0, easings.easeOutQuint).play();

    const dates = section.querySelectorAll('.animOpacity');
    dates.forEach((el, i) => {
        animOpacity(el, 1000, 2000, easings.easeInOutQuint, 0).play();
    });

    const education = section.querySelectorAll('.animBand');
    education.forEach((el, i) => {
        const anim = animBandReveal(el, 1500, 500*i, easings.easeInOutQuint, 500);
        anim.band.play();
        anim.content.play();
    });

    const descriptions = section.querySelectorAll('.animSkewOpacity');
    descriptions.forEach((el, i) => {
        animSkewOpacity(el, 1500, 500*i, easings.easeInOutQuint, 500).play();
    });
}

const animateWorks = () => {
    console.log("Index works : " + indexWorks);
    const section = document.querySelector('#works');
    const masks = section.querySelectorAll('.roller__mask');
    masks.forEach(mask => {
        const containers = mask.querySelectorAll('.roller__container');
        containers.forEach(container => {
            if (indexWorks == -1) {
                console.log('reset tween');
                gsap.set(container, {clearProps: 'y'});
                return;
            }
            const items = container.querySelectorAll('.roller__item');
            console.log(items);
            const target = items[indexWorks];
            const tY = target.offsetTop;
            console.log(target);
            console.log("translateY(" + tY + "px)");
            gsap.to(container, {y: -tY, duration: 1});
            // animSkewTY(container, 800, 0, easings.easeInOutQuint);
        });
    });
}

const updateScrollValues = (delta) => {
    indexSection += delta;
    const distancetoTop = sections[indexSection].getBoundingClientRect().top;
    translateY -= distancetoTop;
    return translateY;
}

const setScrollValues = (index) => {
    indexSection = index;
    const distancetoTop = sections[indexSection].getBoundingClientRect().top;
    translateY -= distancetoTop;
    return translateY;
}

const moveToSection = deltaY => {
    let yToMove;
    if (!isAnimating) {
        if (indexSection == sections.length - 1) {
            if (deltaY < 0 && indexWorks < nbWorks - 1) {
                console.log("-------- projet suivant --------");
                indexWorks++;
                animateWorks();
            } else if (deltaY > 0) {
                if (indexWorks == 0) {
                    indexWorks--;
                    yToMove = updateScrollValues(-1);
                    animateScroll(yToMove);
                    animateElements();
                } else {
                    indexWorks--;
                    animateWorks();
                }
            }
        } else {
            if (deltaY < 0) {
                yToMove = updateScrollValues(1);
                animateScroll(yToMove);
                animateElements();
                if (indexSection == sections.length - 1) {
                    indexWorks++;
                    animateWorks();
                }
            } else if (deltaY > 0) {
                if (indexSection > 0) {
                    yToMove = updateScrollValues(-1);
                    animateScroll(yToMove);
                    animateElements();
                }
            }
        }
    } else {
        console.log("animation en cours");
    }
    console.log("Index section : " + indexSection);
}

window.onbeforeunload = () => {
    indexSection = 0;
    window.scrollTo(0, 0);
};

scroller.on( e => {
    moveToSection(e.deltaY);
});
