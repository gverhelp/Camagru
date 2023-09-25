const themeBtn = document.querySelector("#switchThemeBtn");
const homeBtns = document.querySelectorAll("#homeBtn");
const createBtns = document.querySelectorAll("#createBtn");
const profileBtns = document.querySelectorAll("#profileBtn");
const settingsBtns = document.querySelectorAll("#settingsBtn");

const logoIcon = document.querySelector('#logoIcon');
const themeIcon = document.querySelector('#themeIcon');
const homeIcons = document.querySelectorAll('#homeIcon');
const createIcons = document.querySelectorAll('#createIcon');
const profileIcons = document.querySelectorAll('#profileIcon');
const settingsIcons = document.querySelectorAll('#settingsIcon');

const galleryItemInfo = document.querySelectorAll('.gallery-item-infos');
const modal = document.querySelector('.modal');

const contentDiv = document.querySelector('.main-center-ctn');


galleryItemInfo.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'block';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

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






// Récupération des éléments du DOM
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
// const modal = document.getElementById('myModal');

// Ajout d'un écouteur d'événement pour ouvrir le modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Ajout d'un écouteur d'événement pour fermer le modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});