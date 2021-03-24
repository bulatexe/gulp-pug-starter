import { TouchManager } from "./touchManager";

(function () {
    const TAB_ITEM_SELECTOR = '.tab__item';
    const CONTENT_ITEM_SELECTOR = '.tab__content-item';
    const ACTIVE_TAB_HEADER_CLASS = 'tab__item_active';
    const ACTIVE_TAB_CONTENT_CLASS = 'tab__content-item_active';
    const COUNTER_TAB = '.counter';


    class TabsManager {
        constructor(navNode) {
            this.tabs = [];
            this.activeTab = null;

            this.initFromHtml(navNode);

            if (window.location.href.includes('?=install')) {
                this.tabs.forEach(tab => {
                    if (tab.header.innerText === 'DataSunrise Installation') {
                        this.activateTab(tab)
                    }
                })
            } else {
                for (let i = 0; i < this.tabs.length; i++) {
                    if (!this.tabs[i].header.className.includes('disabled')) {
                        this.activateTab(this.tabs[i])
                        break
                    }
                }
            }

            this.counterElem = navNode.querySelector(COUNTER_TAB)
            this.counterCurrent = 1;
            this.counterTotal = this.tabs.length;

            this.updCounter()
        }

        initFromHtml (navNode) {
            const headers = navNode.querySelectorAll(TAB_ITEM_SELECTOR);
            const contents = navNode.querySelectorAll(CONTENT_ITEM_SELECTOR);

            for (let i = 0; i < headers.length; i++) {
                this.registerTab(headers[i], contents[i]);
            }
        }

        registerTab (header, content) {
            const tab = new TabItem(header, content);
            tab.onActivate(() => this.activateTab(tab));
            this.tabs.push(tab);
        }

        activateTab (tabItem) {
            if (this.activeTab) {
                this.activeTab.setActive(false);
            }

            this.activeTab = tabItem;
            this.activeTab.setActive(true);
            this.tabs.forEach(tab => {
                if (tab.header.className.includes(ACTIVE_TAB_HEADER_CLASS)) {
                    this.counterCurrent = this.tabs.indexOf(tab) + 1;
                }
            })
            this.updCounter();
        }

        setNextTab () {
            let nextActiveTab = this.tabs[this.tabs.indexOf(this.activeTab) + 1]
            if (this.tabs.indexOf(nextActiveTab) === -1) {
                nextActiveTab = this.tabs[0]
            }
            this.activateTab(nextActiveTab)
        }

        prevNextTab () {
            let prevActiveTab = this.tabs[this.tabs.indexOf(this.activeTab) - 1]
            if (this.tabs.indexOf(prevActiveTab) === -1) {
                prevActiveTab = this.tabs[this.tabs.length - 1]
            }

            this.activateTab(prevActiveTab)
        }

        updCounter () {
            if (this.counterElem !== undefined) {
                if (this.counterElem !== null) {
                    this.counterElem.innerHTML =
                        '<span class="count">' + '0' + this.counterCurrent + '</span>'+ '/' + '<span class="total">' + '0' +this.counterTotal + '</span>';
                }
            }
        }
    }

    class TabItem {
        constructor(header, content) {
            this.header = header;
            this.content = content;
        }
        onActivate (action) {
            this.header.addEventListener('click', () => action(this));
        }

        setActive (value) {
            this.header.classList.toggle(ACTIVE_TAB_HEADER_CLASS, value);
            this.content.classList.toggle(ACTIVE_TAB_CONTENT_CLASS, value);
        }
    }

    let tabs = document.querySelectorAll('.tab')

    for (let tab of tabs) {
        let tabManager = new TabsManager(tab);
        let tabContent = tab.querySelector('.tab__content-list')
        new TouchManager(tabContent, tabManager.setNextTab.bind(tabManager), null, tabManager.prevNextTab.bind(tabManager), null);
    }
})();