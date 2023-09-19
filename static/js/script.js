var themeBtn = document.getElementById("switchTheme-btn");

themeBtn.onclick = function () {
    let themeIcon = document.getElementById('switchTheme-icon');
    let headerIcon = document.getElementById('headerIcon');
    let homeIcon = document.getElementById('homeIcon');
    let createIcon = document.getElementById('createIcon');
    let profileIcon = document.getElementById('profileIcon');
    let settingsIcon = document.getElementById('settingsIcon');

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = "static/img/sun-empty.svg";
        headerIcon.setAttribute("src", "static/img/instgram-white.png");
        homeIcon.setAttribute("src", "static/img/home-outlined-white.svg");
        createIcon.setAttribute("src", "static/img/create-outlined-white.svg");
        profileIcon.setAttribute("src", "static/img/profile-outlined-white.svg");
        settingsIcon.setAttribute("src", "static/img/settings-outlined-white.svg");
        themeIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)"; 
    } else {
        headerIcon.setAttribute("src", "static/img/instgram-black.png");
        homeIcon.setAttribute("src", "static/img/home-outlined-black.svg");
        createIcon.setAttribute("src", "static/img/create-outlined-black.svg");
        profileIcon.setAttribute("src", "static/img/profile-outlined-black.svg");
        settingsIcon.setAttribute("src", "static/img/settings-outlined-black.svg");
        themeIcon.removeAttribute('style');
    }
}