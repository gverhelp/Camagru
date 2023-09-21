var themeBtn = document.querySelector("#switchThemeBtn");
var homeBtn = document.querySelector("#homeBtn");
var createBtn = document.querySelector("#createBtn");
var profileBtn = document.querySelector("#profileBtn");
var settingsBtn = document.querySelector("#settingsBtn");

var icons = [document.querySelector('#logoIcon'),
            document.querySelector('#themeIcon'),
            document.querySelector('#homeIcon'),
            document.querySelector('#createIcon'),
            document.querySelector('#profileIcon'),
            document.querySelector('#settingsIcon')]

var iconsDict = {
    'logoIcon' : 'static/img/instgram-white.png',
    'themeIcon' : 'static/img/moon-outlined.svg',
    'homeIcon' : 'static/img/home-outlined.svg',
    'createIcon' : 'static/img/create-outlined.svg',
    'profileIcon' : 'static/img/profile-outlined.svg',
    'settingsIcon' : 'static/img/settings-outlined.svg',
}

const contentDiv = document.querySelector('.main-center-ctn');

function changeIcon(iconType) {

    let a = 0;
    for (let key in iconsDict) {
        if (a >= 2) {
            icons[a].src = iconsDict[key];
        }
        a++;
    }

    document.querySelector('#' + iconType).src = 'static/img/' + iconType.substring(0, iconType.length - 4) + '-filled.svg';
}

themeBtn.addEventListener('click', function() {

    if (document.body.classList.toggle('dark-mode')) {

        for (let a = 1; a < icons.length; a++) {
            icons[a].style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        }
        icons[0].src = "static/img/instgram-white.png";
        icons[1].src = "static/img/sun-outlined.svg";

    } else {

        for (let a = 1; a < icons.length; a++) {
            icons[a].removeAttribute('style');
        }
        icons[0].src = "static/img/instgram-black.png";
        icons[1].src = "static/img/moon-outlined.svg";
    }
})

// homeBtn.addEventListener('click', function() {
//     changeIcon('homeIcon');

//     html = '<p> Home </p>';

//     contentDiv.innerHTML = html;
// })

// createBtn.addEventListener('click', function() {
//     changeIcon('createIcon');

//     html = '<p> Create </p>';

//     contentDiv.innerHTML = html;
// })

// profileBtn.addEventListener('click', function() {
//     changeIcon('profileIcon');

//     html = '<p> Profile </p>';

//     contentDiv.innerHTML = html;
// })

// settingsBtn.addEventListener('click', function() {
//     changeIcon('settingsIcon');

//     html = '<p> Settings </p>';

//     contentDiv.innerHTML = html;
// })
