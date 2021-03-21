(function () {
    let header = document.querySelector('.header');
    let mainNav = document.querySelector('.main-nav');
    let mainNavToggle = document.querySelector('.main-nav__toggle');
    let mainNavToggleIcon = document.querySelector('.main-nav__toggle-icon')
    let openSubNavItems = document.querySelectorAll('.main-nav__item');

    mainNavToggle.addEventListener('click', function () {
        mainNavToggleIcon.classList.toggle('main-nav__toggle-icon_active');
        mainNav.classList.toggle('menu-open');
        header.classList.toggle('main-nav-open');
    });

    openSubNavItems.forEach(item => {
        item.addEventListener('click', function () {
            this.querySelector('.main-nav__show-sub').classList.toggle('active')
            this.querySelector('.main-nav__sub-list').classList.toggle('sub-nav-open')
        });
    });
})();