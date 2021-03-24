import MicroModal from 'micromodal'
(function() {
    let contentItems = document.querySelectorAll('.contents__item')
    let iframeSrc;

    function onClick(evt) {
        iframeSrc = evt.target.parentElement.getAttribute('data-src')
    }

    contentItems.forEach(item=> {
        item.addEventListener('click', onClick)
    })

    MicroModal.init({
        onShow: function (modal) {
            modal.querySelector('iframe').src = iframeSrc
        }
    })
})()
