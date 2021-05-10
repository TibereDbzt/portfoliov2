import { colors, easings } from './../config';

/*
    REQUIRES :
    - inner span for the content
    - 'overflow: hidden' on the container
*/
export const animSkewTY = (el, duration, delay, easing) => {
    return new Animation(new KeyframeEffect(
        el,
        [
            { transform: `translate3D(0, 180px, 0) skew(0, 40deg)` },
            { transform: `translate3D(0, 0, 0) skew(0, 0)` }
        ],
        { duration: duration, delay: delay, easing: easing, fill: 'both' }
    ),
    document.timeline);
};
/*
    REQUIRES :
    - inner span for the content
    - inner span for the band with : display block, pos absolute, w100%, h100%, background
    - 'overflow: hidden' on the container
*/
export const animBandReveal = (el, duration, delay, easing, offset) => {
    const content = el.querySelector('.animBand__content');
    const band = el.querySelector('.animBand__band');
    const animBand = new Animation(new KeyframeEffect(
        band,
        [
            { width: '100%', transform: 'translate3D(-100%, 0, 0)' },
            { width: '0', transform: 'translate3D(0, 0, 0)' }
        ],
        { duration: duration, delay: offset + delay, easing: easing, fill: 'both' }
    ),
    document.timeline);
    const animContent = new Animation(new KeyframeEffect(
        content,
        [
            { color: colors.white },
            { color: colors.black }
        ],
        { duration: 1, delay: offset * 2.5 + delay - 17, fill: 'both' }
    ),
    document.timeline);
    return {band: animBand, content: animContent};
};

/*
    REQUIRES :
    <none>
*/
export const animSkewOpacity = (el, duration, delay, easing, offset) => {
    return new Animation(new KeyframeEffect(
        el,
        [
            { opacity: '0', transform: 'skew(0, 8deg)' },
            { opacity: '0', transform: 'skew(0, 5deg)' },
            { opacity: '1', transform: 'skew(0, 0)' }
        ], { duration: duration, delay: delay, easing: easing, fill: 'both' }
    ),
    document.timeline);
};

/*
    REQUIRES :
    <none>
*/
export const animOpacity = (el, duration, delay, easing, offset) => {
    return new Animation(new KeyframeEffect(
        el,
        [
            { opacity: '0' },
            { opacity: '1' }
        ], { duration: duration, delay: offset + delay, easing: easing, fill: 'both' }
    ),
    document.timeline);
};

/*
    REQUIRES :
    <none>
*/
export const animTableReveal = (el, duration, delay, easing, offset) => {
    const mask = el;
    const content = el.querySelector('.animTableReveal__inner');
    const animMask = new Animation(new KeyframeEffect(
        mask,
        [
            { paddingTop: '120%', borderBottom: '1px solid rgba(0, 0, 0, 0)' },
            { paddingTop: '120%', borderBottom: '1px solid rgba(0, 0, 0, 1)', offset: 0.2 },
            { paddingTop: '0', borderBottom: '1px solid black' }
        ],
        { duration: duration, delay: offset + delay, easing: easing, fill: 'both' }
    ));
    const animContent = animSkewTY(content, 2500, 1050, easings.easeOutQuint);
    return {mask: animMask, content: animContent};
};
