import { animSkewTY, animBandReveal, animSkewOpacity, animOpacity, animTableReveal } from './modules/animations';
import { easings } from './config';

const animateSkills = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1600, 0, easings.easeOutQuint).play();

    const description = section.querySelector('.animSkewOpacity');
    animSkewOpacity(description, 1500, 500, easings.easeOutQuint, 0).play();

    const skillNames = section.querySelectorAll('.animTableReveal');
    skillNames.forEach((el, i) => {
        const anim = animTableReveal(el, 1200, 250 * i, easings.easeOutQuint, 750);
        anim.mask.play();
        anim.content.play();
    });
};

const animateEducation = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1600, 0, easings.easeOutQuint).play();

    const dates = section.querySelectorAll('.animOpacity');
    dates.forEach((el, i) => {
        animOpacity(el, 1000, 2000, easings.easeInOutQuint, 0).play();
    });

    const education = section.querySelectorAll('.animBand');
    education.forEach((el, i) => {
        const anim = animBandReveal(el, 1500, 500 * i, easings.easeInOutQuint, 500);
        anim.band.play();
        anim.content.play();
    });

    const descriptions = section.querySelectorAll('.animSkewOpacity');
    descriptions.forEach((el, i) => {
        animSkewOpacity(el, 1500, 500 * i, easings.easeInOutQuint, 500).play();
    });
};

export { animateSkills, animateEducation };
