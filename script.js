window.addEventListener('load', () => {
    let currentIndex = 0;
    let maxIndex = 0;

    const clss = {
        square: '.square',
        date: '.date',
        text: '.text',
        squareContainer: '.square-container',
        squareExpanded: '.square.expanded',
        dateExpanded: '.date.expanded',
        textExpanded: '.text.expanded',
    };

    const ids = {
        container: '#container'
    };

    const getCurrentIndex = () => {
        const containers = document.querySelectorAll(clss.squareContainer);
        maxIndex = containers.length - 1
        for (let index = 0; index < containers.length; index++) {
            if (containers[index].querySelector(clss.squareExpanded))
                currentIndex = index
        }
        // Array.from(document.querySelectorAll(clss.squareContainer))?.find((el, index) => {
        //     if (el.querySelector(clss.squareExpanded))
        //         currentIndex = index;
        // });
    };

    const toggle = (els) => Object.entries(els).map(([key, el]) => el.toggle('expanded'));

    const handleToggle = (container, isExpanded) => {
        if (!container) return;

        const els = {
            square: container.querySelector(isExpanded ? clss.squareExpanded : clss.square)?.classList,
            date: container.querySelector(isExpanded ? clss.dateExpanded : clss.date)?.classList,
            text: container.querySelector(isExpanded ? clss.textExpanded : clss.text)?.classList
        };

        toggle(els);
    };

    const colapse = () => handleToggle(document, true);

    const expand = (container) => {
        colapse();
        handleToggle(container, false);
    };

    const openNext = (next) => expand(document.querySelectorAll(clss.squareContainer)[next]);

    const handleOnClickEvent = (element) => expand(element.closest(clss.squareContainer));

    const bindEventToElements = (els) => els.length &&
        Array.from(els).map(x => x.addEventListener('click', (event) => handleOnClickEvent(event.target)));

    bindEventToElements(document.querySelectorAll(clss.square));

    bindEventToElements(document.querySelectorAll(clss.date));

    const handleWheelEvent = (event) => {
        getCurrentIndex();

        if (currentIndex != 0 && event.deltaY == -100)
            openNext(currentIndex - 1);

        if (currentIndex != maxIndex && event.deltaY == 100)
            openNext(currentIndex + 1);
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
    const scrollableElement = document.querySelector(ids.container);

    if (scrollableElement)
        scrollableElement.addEventListener('wheel', debouncedHandleWheelEvent);
});
