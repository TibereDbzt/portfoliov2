import gsap from 'gsap';
import { animSkewTY, animBandReveal, animSkewOpacity, animOpacity, animTableReveal, animSkewMouse } from './modules/animations';
import { getMousePos } from './modules/utils';
import { easings } from './config';

let mouse = { x: -10, y: -10 };
window.addEventListener('mousemove', e => { mouse = getMousePos(e); });

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

const animateWorks = (section) => {
    const title = section.querySelector('.animSkewTY__inner');
    animSkewTY(title, 1600, 0, easings.easeOutQuint).play();

    const preview = section.querySelector('.js-window');
    // gsap.to(preview, {skewX: mouse.x*0.1, skewY: mouse.y*0.1, repeat: -1});

    // setTimeout(() => {
    //     const boundings = preview.getBoundingClientRect();

    //     console.log(boundings);
    //     console.log(preview.clientY);

    //     const dX = boundings.left + boundings.width / 2;
    //     const dY = boundings.top + boundings.height / 2;

    //     console.log(dX);
    //     console.log(dY);
        
    //     let deltaX = dX - mouse.x;
    //     let deltaY = dY - mouse.y;

    //     preview.addEventListener('mouseover', e => {
    //         // mouse = getMousePos(e);
    //         deltaX = dX - mouse.x;
    //         deltaY = dY - mouse.y;
    
    //         console.log("skewX = " + deltaX);
    //         console.log("skewY = " + deltaY);
    //         gsap.to(preview, {skewX: deltaX*0.02, skewY: deltaY*0.02});
    //     });

    //     // window.addEventListener('mousemove', e => {

    //     //     mouse = getMousePos(e);
    //     //     deltaX = dX - mouse.x;
    //     //     deltaY = dY - mouse.y;
    
    //     //     console.log("skewX = " + deltaX);
    //     //     console.log("skewY = " + deltaY);
    //     //     gsap.to(preview, {skewX: deltaX*0.02, skewY: deltaY*0.02, repeat: -1});
    //     // });
    // }, 300);


    
    // const animskew = animSkewMouse(preview);
    // console.log(animskew);
}

export { animateSkills, animateEducation, animateWorks };
