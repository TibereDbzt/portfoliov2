const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
};

const map = (value, in_min, in_max, out_min, out_max) => {
    return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
};

const getMousePos = e => {
    return {x: e.clientX, y: e.clientY};
};

const getClientSize = e => {
    return {width: window.innnerWidth, height: window.innerHeight};
};

export {lerp, map, getMousePos, getClientSize};
