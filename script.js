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
        const expandedSquare = document.querySelector('.square.expanded');
        if (!expandedSquare) return;

        expandedSquare.classList.toggle('expanded');

        const parent = expandedSquare.closest('.square-container');
        if (!parent) return;

        const expandedDate = document.querySelector('.date.expanded');
        if (expandedDate)
            expandedDate.classList.toggle('expanded');

        const visibleText = document.querySelector('.text.visible');
        if (visibleText)
            visibleText.classList.toggle('visible');
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

    const fireOnClickEvent = (event) => {
        colapse();

        const selectedSquare = event.target;
        selectedSquare.classList.toggle('expanded');

        const parent = selectedSquare.closest('.square-container');

        if (!parent) return;

        const dateElement = parent.querySelector('.date');
        dateElement.classList.toggle('expanded');

        const textElement = parent.querySelector('.text-container .text');
        textElement.classList.toggle('visible');

    };

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            fireOnClickEvent(event);
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
    scrollableElement.addEventListener('wheel', debouncedHandleWheelEvent);
});