"use strict";

(function () {
    const onScrollTrigger = 50;
    let header = document.querySelector(".header");
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

    window.addEventListener("scroll", handleScrollHeader);

})();
