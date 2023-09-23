var themeBtn = document.querySelector("#switchThemeBtn");
var homeBtns = document.querySelectorAll("#homeBtn");
var createBtns = document.querySelectorAll("#createBtn");
var profileBtns = document.querySelectorAll("#profileBtn");
var settingsBtns = document.querySelectorAll("#settingsBtn");

var logoIcon = document.querySelector('#logoIcon');
var themeIcon = document.querySelector('#themeIcon');
var homeIcons = document.querySelectorAll('#homeIcon');
var createIcons = document.querySelectorAll('#createIcon');
var profileIcons = document.querySelectorAll('#profileIcon');
var settingsIcons = document.querySelectorAll('#settingsIcon');

const contentDiv = document.querySelector('.main-center-ctn');

function changeIcon(iconType) {

    homeIcons.forEach(homeIcon => {
        homeIcon.src = 'static/img/home-outlined.svg';
    });

    createIcons.forEach(createIcon => {
        createIcon.src = 'static/img/create-outlined.svg';
    });

    profileIcons.forEach(profileIcon => {
        profileIcon.src = 'static/img/profile-outlined.svg';
    });

    settingsIcons.forEach(settingsIcon => {
        settingsIcon.src = 'static/img/settings-outlined.svg';
    });

    document.querySelectorAll('#' + iconType).forEach(icon => {
        icon.src = 'static/img/' + iconType.substring(0, iconType.length - 4) + '-filled.svg';
    });
}

themeBtn.addEventListener('click', function() {

    if (document.body.classList.toggle('dark-mode')) {
        homeIcons.forEach(homeIcon => {
            homeIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        });
    
        createIcons.forEach(createIcon => {
            createIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        });
    
        profileIcons.forEach(profileIcon => {
            profileIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        });
    
        settingsIcons.forEach(settingsIcon => {
            settingsIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        });

        logoIcon.src = "static/img/instgram-white.png";
        themeIcon.src = "static/img/sun-outlined.svg";
        themeIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
    } else {
        homeIcons.forEach(homeIcon => {
            homeIcon.removeAttribute('style');
        });
    
        createIcons.forEach(createIcon => {
            createIcon.removeAttribute('style');
        });
    
        profileIcons.forEach(profileIcon => {
            profileIcon.removeAttribute('style');
        });
    
        settingsIcons.forEach(settingsIcon => {
            settingsIcon.removeAttribute('style');
        });

        logoIcon.src = "static/img/instgram-black.png";
        themeIcon.src = "static/img/moon-outlined.svg";
        themeIcon.removeAttribute('style');
    }
});

homeBtns.forEach(homeBtn => {
    homeBtn.addEventListener('click', function() {
        changeIcon('homeIcon');

        html = '<p> Home </p>';

        contentDiv.innerHTML = html;
    });
});

createBtns.forEach(createBtn => {
    createBtn.addEventListener('click', function() {
        changeIcon('createIcon');

        html = '<p> Create </p>';

        contentDiv.innerHTML = html;
    });
});

profileBtns.forEach(profileBtn => {
    profileBtn.addEventListener('click', function() {
        changeIcon('profileIcon');

        html = '<p> Profile </p>';

        contentDiv.innerHTML = html;
    });
});

settingsBtns.forEach(settingsBtn => {
    settingsBtn.addEventListener('click', function() {
        changeIcon('settingsIcon');

        html = '<p> Settings </p>';

        contentDiv.innerHTML = html;
    });
});
