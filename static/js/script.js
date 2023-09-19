var toggleTheme = 0;

function switchTheme() {
    let btn = document.getElementById('switchTheme-icon');
    let headerIcon = document.getElementById('headerIcon');
    let homeIcon = document.getElementById('homeIcon');
    let createIcon = document.getElementById('createIcon');
    let profileIcon = document.getElementById('profileIcon');
    let settingsIcon = document.getElementById('settingsIcon');
    let rootElement = document.documentElement;

    if (toggleTheme == 0) {
        rootElement.style.setProperty('--bg-color', 'rgb(21, 32, 43)');
        rootElement.style.setProperty('--text-color', 'rgb(255, 255, 255)');
        rootElement.style.setProperty('--main-color', 'rgb(55, 68, 77)');

        btn.setAttribute("src", "static/img/sun-empty.svg");
        headerIcon.setAttribute("src", "static/img/instgram-white.png");
        homeIcon.setAttribute("src", "static/img/home-outlined-white.svg");
        createIcon.setAttribute("src", "static/img/create-outlined-white.svg");
        profileIcon.setAttribute("src", "static/img/profile-outlined-white.svg");
        settingsIcon.setAttribute("src", "static/img/settings-outlined-white.svg");
        btn.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
    } else {
        rootElement.style.setProperty('--bg-color', 'rgb(255, 255, 255)');
        rootElement.style.setProperty('--text-color', 'rgb(0, 0, 0)');
        rootElement.style.setProperty('--main-color', 'rgb(230, 230, 230)');

        btn.setAttribute("src", "static/img/moon-empty.svg");
        headerIcon.setAttribute("src", "static/img/instgram-black.png");
        homeIcon.setAttribute("src", "static/img/home-outlined-black.svg");
        createIcon.setAttribute("src", "static/img/create-outlined-black.svg");
        profileIcon.setAttribute("src", "static/img/profile-outlined-black.svg");
        settingsIcon.setAttribute("src", "static/img/settings-outlined-black.svg");
        btn.removeAttribute('style');
    }
    toggleTheme = !toggleTheme;
}