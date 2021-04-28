export let clientSize = {width: window.innerWidth, height: window.innerHeight};

window.addEventListener('resize', e => {
    clientSize = {width: window.innerWidth,  height: window.innerHeight};
});