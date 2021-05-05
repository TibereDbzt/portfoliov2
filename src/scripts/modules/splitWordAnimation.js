export const splitWord = el => {
    const letters = el.textContent.split('');
    el.textContent = '';
    letters.forEach(letter => {
        el.innerHTML += '<span class="toUp">' + letter + '</span>';
    });
}

export const splitLines = el => {
    const lines = el.textContent.split(/\r?\n/);
    console.log(lines);
}

export const animateLetters = (el) => {

    let i = 0;
    let interval = 20;
    // let timer = setInterval(() => addClass(), interval+100);

    let startAnimation = () => {
        const span = el.querySelectorAll('span')[i];
        span.classList.add('animating');
        i++;
        clearInterval(timer);
        interval += 20;
        // console.log(i);
        if (i === el.querySelectorAll('span').length) {
            return;
        } else {
            timer = setInterval(startAnimation, interval);
        }
    }
    let timer = setInterval(startAnimation, interval);

    // const addClass = () => {
    //     const span = el.querySelectorAll('span')[i];
    //     span.classList.add('animating');
    //     i++;
    //     interval += 1000;
    //     if (i === el.querySelectorAll('span').length) {
    //         clearInterval(timer);
    //         return;
    //     }
    // }
}