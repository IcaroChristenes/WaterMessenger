function monkeyShow() {
    let monkey = document.querySelector('.mobile_mn');
    if (monkey.classList.contains('open')) {
        monkey.classList.remove('open');
    } else {
        monkey.classList.add('open');

    }
}