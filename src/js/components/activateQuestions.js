export function activateQuestions(questions) {
    questions.forEach(question => {
        question.addEventListener('click', function () {
            let transitionContainer = this.nextElementSibling;
            let answerHeight = transitionContainer.querySelector('.answer').offsetHeight;
            this.querySelector('.question__more-icon').classList.toggle('active');
            transitionContainer.classList.toggle('active');
            transitionContainer.classList.contains('active') ? transitionContainer.style = `height:${answerHeight}px` : transitionContainer.style = '';
        })
    })
}
