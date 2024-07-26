window.addEventListener('load', () => {
    let currentIndex, maxIndex = 0;

    const clss = {
        square: '.square',
        date: '.date',
        text: '.text',
        squareContainer: '.square-container',
        squareExpanded: '.square.expanded',
        dateExpanded: '.date.expanded',
        textExpanded: '.text.expanded',
        expanded: 'expanded'
    };

    const ids = {
        container: '#container'
    };

    const events = {
        click: 'click',
        wheel: 'wheel'
    };

    const getCurrentIndex = () => {
        Array.from(document.querySelectorAll(clss.squareContainer))?.map((el, index) => {
            if (el.querySelector(clss.squareExpanded))
                currentIndex = index;
            maxIndex = index;
        });
    };

    const toggle = els => Object.entries(els).map(([key, el]) => el.toggle(clss.expanded));

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

    const expand = container => {
        colapse();
        handleToggle(container, false);
    };

    const openNext = next => expand(document.querySelectorAll(clss.squareContainer)[next]);

    const handleOnClickEvent = element => expand(element.closest(clss.squareContainer));

    const bindEventToElements = els => els.length &&
        Array.from(els).map(x => x.addEventListener(events.click, (event) => handleOnClickEvent(event.target)));

    bindEventToElements(document.querySelectorAll(clss.square));

    bindEventToElements(document.querySelectorAll(clss.date));

    const handleWheelEvent = event => {
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
        scrollableElement.addEventListener(events.wheel, debouncedHandleWheelEvent);
});
