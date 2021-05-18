export const sections = [
    document.querySelector('#hero'),
    document.querySelector('#skills'),
    document.querySelector('#education'),
    document.querySelector('#works'),
    document.querySelector('#goal'),
    document.querySelector('#atthistime'),
    document.querySelector('#contact')
];

export const colors = {
    white: '#f2f3f5',
    black: '#1d1d1d',
    grey: '#BFBFBF'
};

export const easings = {
    // quint acceleration at the beginning
    easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
    // exponential acceleration at the beginning
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // circle acceleration at the beginning
    easeOutCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',

    // quint acceleration at the halfway point
    easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
    // exponential acceleration at the halfway point
    easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
    // circle acceleration at the halfway point
    easeInOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',
};
