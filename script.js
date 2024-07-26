window.addEventListener('load', () => {
    let currentIndex = 0;
    let maxIndex = 0;
    const getCurrentIndex = () => {
        const containers = document.querySelectorAll('.square-container');
        maxIndex = containers.length - 1

        for (let index = 0; index < containers.length; index++) {
            if (containers[index].querySelector('.square.expanded'))
                currentIndex = index
        }
    };

    const colapse = () => {
        const square = document.querySelector('.square.expanded');
        if (square)
            square.classList.toggle('expanded');

        const date = document.querySelector('.date.expanded');
        if (date)
            date.classList.toggle('expanded');

        const text = document.querySelector('.text.visible');
        if (text)
            text.classList.toggle('visible');
    };

    const openNext = (next) => {
        const containers = document.querySelectorAll('.square-container');
        const nextcontainer = containers[next];

        if (!nextcontainer) return;

        const square = nextcontainer.querySelector('.square');
        if (square)
            square.classList.toggle('expanded');

        const date = nextcontainer.querySelector('.date');
        if (date)
            date.classList.toggle('expanded');

        const text = nextcontainer.querySelector('.text');
        if (text)
            text.classList.toggle('visible');
    };

    const handleOnClickEvent = (element) => {
        colapse();

        const parent = element.closest('.square-container');

        if (!parent) return;

        const square = parent.querySelector('.square');
        if (square)
            square.classList.toggle('expanded');

        const date = parent.querySelector('.date');
        if (date)
            date.classList.toggle('expanded');

        const text = parent.querySelector('.text-container .text');
        if (text)
            text.classList.toggle('visible');
    };

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            handleOnClickEvent(event.target);
        });
    });

    const dates = document.querySelectorAll('.date');
    dates.forEach(date => {
        date.addEventListener('click', (event) => {
            handleOnClickEvent(event.target);
        });
    });

    const handleWheelEvent = (event) => {
        getCurrentIndex();

        if (currentIndex != 0 && event.deltaY == -100) {
            colapse();
            openNext(currentIndex - 1);
        }

        if (currentIndex != maxIndex && event.deltaY == 100) {
            colapse();
            openNext(currentIndex + 1);
        }
    }

    const debounce = (func, delay) => {
        let timeoutId;

        return function (...args) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const debouncedHandleWheelEvent = debounce(handleWheelEvent, 150);
    const scrollableElement = document.querySelector('#container');

    if(scrollableElement)
        scrollableElement.addEventListener('wheel', debouncedHandleWheelEvent);
});
