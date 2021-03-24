"use strict";

(function () {
    const onScrollTrigger = 50;
    let header = document.querySelector(".header");
    let stickyElements = ['.tab__list.sticky', '.event-detail__next', '.threat-detail__next', '.compliance-detail__next'];
    let getCurrentScroll = () => window.pageYOffset || document.documentElement.scrollTop;

    let handleScrollHeader = function () {
        let scroll = getCurrentScroll();
        if (scroll >= onScrollTrigger) {
            header.classList.remove("header_transparent");
            header.classList.add("header_scroll");
        } else {
            if (!header.classList.contains("header-non-transparent")) {
                header.classList.add("header_transparent");
            }
            header.classList.remove("header_scroll");
        }
    };

    handleScrollHeader();

    function addStickyElement(element) {
        if (document.querySelector(element) !== null) {
            let elementNode = document.querySelector(element);
            elementNode.style.top = `${header.offsetHeight - 15}px`;
        }
    }

    stickyElements.forEach(element => {
        addStickyElement(element);
    });

    window.addEventListener("scroll", handleScrollHeader);

})();
