export const getMousePos = e => {
    return { x: e.clientX, y: e.clientY };
};

export const getClientSize = () => {
    return { width: window.innerWidth, height: window.innerHeight };
};

export const getDistanceTo = (el, elSide, target = window, targetSide = 'bottom') => {
    const elBounds = el.getBoundingClientRect();
    const targetBounds = (target == window) ? { top: 0, right: windowSize.width, bottom: windowSize.height, left: 0 } : target.getBoundingClientRect();

    if (elSide === 'top' && targetSide === 'top') return Math.ceil(targetBounds.top - elBounds.top);
    else if (elSide === 'top' && targetSide === 'bottom') return Math.ceil(targetBounds.bottom - elBounds.top);
    else if (elSide === 'bottom' && targetSide === 'top') return Math.ceil(targetBounds.top - elBounds.bottom);
    else if (elSide === 'bottom' && targetSide === 'bottom') return Math.ceil(targetBounds.bottom - elBounds.bottom);

    else if (elSide === 'right' && targetSide === 'right') return Math.ceil((targetBounds.right - elBounds.right));
    else if (elSide === 'right' && targetSide === 'left') return Math.ceil((targetBounds.right - elBounds.left));
    else if (elSide === 'left' && targetSide === 'right') return Math.ceil((targetBounds.right - elBounds.left));
    else if (elSide === 'left' && targetSide === 'left') return Math.ceil((targetBounds.left - elBounds.right));

    else return null;
};

window.addEventListener('resize', () => windowSize = getClientSize());
window.addEventListener('mousemove', e => mousePos = getMousePos(e));

let mousePos = { x: -10, y: -10 };
let windowSize = getClientSize();