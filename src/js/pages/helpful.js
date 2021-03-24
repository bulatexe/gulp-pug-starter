(function () {
    let helpBtns = document.querySelectorAll('.helpful__btn');
    let stateBlock = document.querySelector('.state-block');

    helpBtns.forEach(btn => {
        btn.addEventListener('click', function (evt) {
            helpBtns.forEach(recursiveBtn => {
                recursiveBtn.classList.remove('active');
            })
            let btn = this;
            if (btn.classList.contains('btn-yes')) {
                btn.classList.add('active');
                stateBlock.innerHTML = `
                    <p>Thanks! Tell us about your opinion.</p>
                `
            } else {
                btn.classList.add('active');
                stateBlock.innerHTML = `
                    <p>We are constantly improving our guides. We'd love to hear how to make them better.</p>
                `
            }
        })
    })
})()