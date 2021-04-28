import VirtualScroll from 'virtual-scroll'
import { clientSize } from './utils/getClientSize'
import { animSkewTY, animBandReveal, animSkewOpacity, animOpacity, animTableReveal } from './utils/animations'
import { sections, easings } from './config'

const scrollElement = document.querySelector('#scroll-container');
const scroller = new VirtualScroll();

let indexSection = 0;
let translateY = 0;
let isAnimating = false;

const animateScroll = (dY) => {
    isAnimating = true;
    let anim = scrollElement.animate(
        {transform: `translate3D(0, ${dY}px, 0)`}, // CHECK IMPLICIT TO/FROM KEYFRAMES SUPPORT !
        {
            duration: 400,
            easing: "cubic-bezier(0.83, 0, 0.17, 1)",
            fill: 'forwards'
        });
    anim.onfinish = () => {
        isAnimating = false;
    };
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
        default:
            break;
    }
}

const animateSkills = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1200, 300, easings.easeOutQuint).play();

    const description = section.querySelector('.animSkewOpacity');
    animSkewOpacity(description, 1200, 300, easings.easeInOutQuint, 0).play();

    const skillNames = section.querySelectorAll('.animTableReveal');
    skillNames.forEach((el, i) => {
        const anim = animTableReveal(el, 1200, 250*i, easings.easeInOutQuint, 750);
        anim.mask.play();
        anim.content.play();
    });
}

const animateEducation = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1200, 300, easings.easeOutQuint).play();

    const dates = section.querySelectorAll('.animOpacity');
    dates.forEach((el, i) => {
        animOpacity(el, 1000, 3000, easings.easeInOutQuint, 0).play();
    });

    const education = section.querySelectorAll('.animBand');
    education.forEach((el, i) => {
        const anim = animBandReveal(el, 1500, 750*i, easings.easeInOutQuint, 750);
        anim.band.play();
        anim.content.play();
    });

    const descriptions = section.querySelectorAll('.animSkewOpacity');
    descriptions.forEach((el, i) => {
        animSkewOpacity(el, 1500, 800*i, easings.easeInOutQuint, 750).play();
    });
}

const updateScrollValues = (delta) => {
    indexSection += delta;
    const distancetoTop = sections[indexSection].getBoundingClientRect().top;
    console.log("section demandée position relative : " + distancetoTop);
    translateY -= distancetoTop;
    console.log("translateY actuel : " + translateY);
    return translateY;
}

const moveToSection = deltaY => {
    let yToMove;
    if (!isAnimating) {
        if (deltaY < 0 && indexSection < sections.length - 1) yToMove = updateScrollValues(1);
        else if (deltaY > 0 && indexSection > 0) yToMove = updateScrollValues(-1);
        else console.log('end');
        if (yToMove !== undefined) {
            animateScroll(yToMove);
            animateElements();
        }
    } else {
        console.log("animation en cours");
    }
}

// window.addEventListener('resize', () => {
//     updateScrollValues(0);
// });

window.onbeforeunload = () => {
    indexSection = 0;
    window.scrollTo(0, 0);
};

scroller.on(e => {
    moveToSection(e.deltaY);
});
