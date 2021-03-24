import Mark from "mark.js/src/vanilla";
import {activateQuestions} from "./activateQuestions";


//tooltip === item

function emptyResultsTemplate (keyword) {
    return `
            <div class="emptyResult">
                <h3>No results for <span class="keyword">${keyword}</span></h3>
                <p>No Results Found. Try The Following:</p>
                <ul>
                    <li>Make sure all words are spelled correctly.</li>
                    <li>Try different keywords.</li>
                    <li>Try more general keywords.</li>
                    <li>For more help, contact us</li>
                </ul>
            </div>
        `
}

function hideElements(nodes) {
    nodes.forEach(node => {
        node.classList.add('hide');
    });
}

export default class Search {
    constructor(container, searchIn, form, input, hideFor, searchElement, transitionContainer, activateTooltip) {
        this.$container = document.querySelector(container);
        this.$searchIn = document.querySelector(searchIn);
        this.$form = document.querySelector(form);
        this.$input = document.querySelector(input);
        this.$hideFor = document.querySelectorAll(hideFor);

        this.haveMarks = [];
        this.marks = [];
        this.$result = '';
        this.$transitionContainer = transitionContainer;
        this.tooltip = activateTooltip;
        this.searchElement = searchElement;
        this.activate();
    }

    activate() {
        let markInstance = new Mark(this.$searchIn);
        let container = this.$container;
        let lasTabClick = '';
        let closeBtn = document.querySelector('.search-block__remove-btn');
        let searchElement = this.searchElement

        let tabs = document.querySelectorAll('.tab__item')
        lasTabClick = tabs[0];
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                lasTabClick = this;
            })
        })

        let addElements = (keyword) => {
            let searchKeywordElement = document.createElement('div')
            let element = document.createElement('div')
            element.className = 'results';
            searchKeywordElement.innerHTML = `<p class="search-keyword">Results for <span class="keyword">${keyword}</span></p>`
            this.haveMarks.forEach(node => {
                element.appendChild(node);
            })
            this.$searchIn.appendChild(element);
            document.querySelector('.results').insertAdjacentElement('afterbegin', searchKeywordElement);
        }

        let cleanNodesForComparison = (node) => {
            if (this.$transitionContainer) {
                node.querySelector(this.$transitionContainer).setAttribute('style', '');
                node.querySelector(this.$transitionContainer).classList.remove('active');
                node.querySelector('.question__more-icon').classList.remove('active');
            }
        }

        document.querySelectorAll('.tab__item').forEach(node => {
            node.addEventListener('click', function () {
                document.querySelector('.search-block__input').value = ''
                closeBtn.classList.remove('active');
                document.querySelectorAll('.tab__content-item').forEach(dopNode => {
                    dopNode.classList.remove('hide')
                    markInstance.unmark();
                    if (document.querySelector('.results')) {
                        document.querySelector('.results').remove();
                    }
                    if (document.querySelector('.empty-result') !== null) {
                        document.querySelector('.empty-result').remove();
                    }
                })
            })
        })

        let isNodeEqual = (node) => {
            cleanNodesForComparison(node)
            for (let mark of this.haveMarks) {
                cleanNodesForComparison(mark)
                if (mark.isEqualNode(node)) {
                    return true;
                }
            }
            return false;
        }

        let resetResult = () => {
            this.$hideFor.forEach(node => {
                node.classList.remove('hide');
            })
            if (lasTabClick) {
                lasTabClick.classList.add('tab__item_active');
            }
            markInstance.unmark();
            closeBtn.classList.remove('active');
        }

        let onSubmit = (evt) => {
            evt.preventDefault();
            let keyword = this.$input.value;

            if (document.querySelector('.empty-result') !== null) {
                document.querySelector('.empty-result').remove();
            }

            if (keyword === '') {
                if (document.querySelector('.results')) {
                    document.querySelector('.results').remove();
                    resetResult();
                    return false;
                } else  {
                    return false;
                }
            }


            closeBtn.classList.add('active');
            hideElements(this.$hideFor);
            document.querySelectorAll('.tab__item').forEach(tab => {
                tab.classList.remove('tab__item_active');
            })

            markInstance.unmark({
                done: function(){
                    markInstance.mark(keyword, {
                        "noMatch": function () {
                            if (document.querySelector('.empty-result') === null) {
                                let element = document.createElement('div');
                                element.className = 'empty-result';
                                element.innerHTML = emptyResultsTemplate(keyword);
                                container.appendChild(element);
                            } else  {
                                document.querySelector('.empty-result').innerHTML = emptyResultsTemplate(keyword);
                            }
                        },
                    });
                }
            });

            this.marks = document.querySelectorAll('mark[data-markjs="true"]');
            this.haveMarks = [];

            this.marks.forEach(mark => {
                let searchElementMarks = mark.closest(searchElement);
                if (searchElementMarks) {
                    if (!isNodeEqual(searchElementMarks)) {
                        this.haveMarks.push(searchElementMarks.cloneNode(true));
                    }
                }
            });

            this.$result = document.querySelector('.results');
            if (this.$result) {
                this.$result.remove()
                addElements(keyword);
            } else {
                addElements(keyword);
            }

            document.querySelector('.results').querySelectorAll(this.$transitionContainer).forEach(node => {
                if (node.querySelector('mark[data-markjs="true"]') !== null) {
                    let answerHeight = node.querySelector('.answer').offsetHeight;
                    node.previousElementSibling.querySelector('.question__more-icon').classList.add('active');
                    node.classList.add('active');
                    node.style.height = `${answerHeight}px`;
                }
            })

            if (this.tooltip) {
                let questions = document.querySelectorAll('.results .question');

                activateQuestions(questions)
            }
        }

        this.$form.addEventListener('submit', onSubmit);
        closeBtn.addEventListener('click', function () {
            if (document.querySelector('.results') !== null) {
                document.querySelector('.results').remove();
            }
            if (document.querySelector('.empty-result') !== null) {
                document.querySelector('.empty-result').remove();
            }
            document.querySelector('.search-block__input').value = ''
            resetResult();
        });
    }

}

