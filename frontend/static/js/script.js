// Button's variables
const themeBtns = document.querySelectorAll("#switchThemeBtn");
const homeBtns = document.querySelectorAll("#homeBtn");
const createBtns = document.querySelectorAll("#createBtn");
const profileBtns = document.querySelectorAll("#profileBtn");
const settingsBtns = document.querySelectorAll("#settingsBtn");
const signUpBtns = document.querySelectorAll('#sign-up');
const signInBtns = document.querySelectorAll('#sign-in');

// Logo's variables
const logoIcon = document.querySelector('#logoIcon');
const themeIcon = document.querySelector('#themeIcon');
const homeIcons = document.querySelectorAll('#homeIcon');
const createIcons = document.querySelectorAll('#createIcon');
const profileIcons = document.querySelectorAll('#profileIcon');
const settingsIcons = document.querySelectorAll('#settingsIcon');
const menuIcon = document.querySelector('#menuIcon');

// Modal's variables
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modalContent = document.querySelector('.modal-content');

// Gallery's variables
const galleryItemInfo = document.querySelectorAll('.gallery-item-infos');

// Main content div's variables
const contentDiv = document.querySelector('.main-center-ctn');

// Dropdown menu
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown__menu');
const dropdownMenuBtns = document.querySelectorAll('.dropdown-menu-btn');

// Theme's variable
var actualTheme = 0;


function changeIcon(iconType) {

    homeIcons.forEach(homeIcon => {
        homeIcon.src = '../static/img/home-outlined.svg';
    });

    createIcons.forEach(createIcon => {
        createIcon.src = '../static/img/create-outlined.svg';
    });

    profileIcons.forEach(profileIcon => {
        profileIcon.src = '../static/img/profile-outlined.svg';
    });

    settingsIcons.forEach(settingsIcon => {
        settingsIcon.src = '../static/img/settings-outlined.svg';
    });

    document.querySelectorAll('#' + iconType).forEach(icon => {
        icon.src = '../static/img/' + iconType.substring(0, iconType.length - 4) + '-filled.svg';
    });
}

function setAsFlex(elem) {
    setTimeout(function() {
        elem.style.display = "flex";
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

dropdownBtn.addEventListener('click', () => {
    if (dropdownMenu.classList.toggle('open')) {
        menuIcon.src = "../static/img/x-mark.svg";
    } else {
        menuIcon.src = "../static/img/menu-bar.svg";
    }
});

dropdownMenuBtns.forEach(dropdownMenuBtn => {
    dropdownMenuBtn.addEventListener('click', () => {
        dropdownMenu.classList.remove('open');
        menuIcon.src = "../static/img/menu-bar.svg";
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

galleryItemInfo.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalContent.innerHTML = 'Indiv';
    });
});

themeBtns.forEach(themeBtn => {
    themeBtn.addEventListener('click', function() {

        if ((actualTheme = document.body.classList.toggle('dark-mode'))) {
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
    
            logoIcon.src = "../static/img/instgram-white.png";
            themeIcon.src = "../static/img/sun-outlined.svg";
            menuIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
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
    
            logoIcon.src = "../static/img/instgram-black.png";
            themeIcon.src = "../static/img/moon-outlined.svg";
            menuIcon.removeAttribute('style');
            themeIcon.removeAttribute('style');
        }
    });
});

signUpBtns.forEach(signUpBtn => {
    signUpBtn.addEventListener('click', () => {
        let html = '';
        let themeLogo = 'src="../static/img/instgram-black.png"';
        modal.style.display = 'flex';
    
        if (actualTheme == 1) {
            themeLogo = 'src="../static/img/instgram-white.png"';
        }
    
        html += '<div class="sign" id="signup" hidden>';
        html += '    <form class="sign-ctn" action="signup.php" method="post">';
        html += '        <img id="logoIcon" ' + themeLogo + ' alt="logo" style="margin-bottom: 40px; width: 135px; height: auto;">';
        html += '        <input class="auth-input" placeholder="Username" type="text" name="username" required>';
        html += '        </input>';
        html += '        <input class="auth-input" placeholder="Email" type="email" name="email" required>';
        html += '        </input>';
        html += '        <input class="auth-input" placeholder="Password" type="password" name="password" required>';
        html += '        </input>';
        html += '        <button class="button"> Submit </button>';
        html += '    </form>';
        html += '</div>';
    
        modalContent.innerHTML = html;
    });
});

signInBtns.forEach(signInBtn => {
    signInBtn.addEventListener('click', () => {
        let html = '';
        let themeLogo = 'src="../static/img/instgram-black.png"';
        modal.style.display = 'flex';
    
        if (actualTheme == 1) {
            themeLogo = 'src="../static/img/instgram-white.png"';
        }
    
        html += '<div class="sign" id="signin" hidden>';
        html += '    <form class="sign-ctn" action="signin.php" method="post">';
        html += '        <img id="logoIcon" ' + themeLogo + ' alt="logo" style="margin-bottom: 40px; width: 135px; height: auto;">';
        html += '        <input class="auth-input" placeholder="Username" type="text" name="username" required>';
        html += '        </input>';
        html += '        <input class="auth-input" placeholder="Password" type="password" name="password" required>';
        html += '        </input>';
        html += '        <button class="button"> Submit </button>';
        html += '    </form>';
        html += '</div>';
    
        modalContent.innerHTML = html;
    });
});

var homeContent = () => {
    let html = '';

    contentDiv.style.display = 'none';
    changeIcon('homeIcon');
    setAsFlex(contentDiv);

    html += '<div class="home-ctn">';
    for (let a = 0; a < 20; a++) {
        html += '<div class="post-ctn">';
        html += '    <header class="post-header">';
        html += '        <img class="post-avatar" src="../static/img/lol2.JPG" alt="avatar">';
        html += '        <div class="post-header-infos">';
        html += '            <h3> Garreth Verhelpen </h3>';
        html += '            <p> Rome, Italy </p>';
        html += '        </div>';
        html += '    </header>';
        html += '    <main class="post-main">';
        html += '            <img src="../static/img/lol2.JPG" alt="post">';
        html += '    </main>';
        html += '    <footer class="post-footer">';
        html += '        <button class="post-footer-btn">';
        html += '            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">';
        html += '                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />';
        html += '            </svg>';
        html += '            <span> 1340 </span>';
        html += '        </button>';
        html += '        <button class="post-footer-btn">';
        html += '            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">';
        html += '                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />';
        html += '            </svg>';
        html += '            <span> 322 </span>';
        html += '        </button>';
        html += '    </footer>';
        html += '</div>';

        html += '<div class="post-ctn">';
        html += '    <header class="post-header">';
        html += '        <img class="post-avatar" src="../static/img/lol4.JPG" alt="avatar">';
        html += '        <div class="post-header-infos">';
        html += '            <h3> Garreth Verhelpen </h3>';
        html += '            <p> Rome, Italy </p>';
        html += '        </div>';
        html += '    </header>';
        html += '    <main class="post-main">';
        html += '            <img src="../static/img/lol3.jpg" alt="post">';
        html += '    </main>';
        html += '    <footer class="post-footer">';
        html += '        <button class="post-footer-btn">';
        html += '            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">';
        html += '                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />';
        html += '            </svg>';
        html += '            <span> 1340 </span>';
        html += '        </button>';
        html += '        <button class="post-footer-btn">';
        html += '            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">';
        html += '                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />';
        html += '            </svg>';
        html += '            <span> 322 </span>';
        html += '        </button>';
        html += '    </footer>';
        html += '</div>';
    }
    html += '</div>';

    contentDiv.innerHTML = html;
};

homeBtns.forEach(homeBtn => {
    homeBtn.addEventListener('click', homeContent);
});

createBtns.forEach(createBtn => {
    createBtn.addEventListener('click', function() {
        let html = '';

        contentDiv.style.display = 'none';
        changeIcon('createIcon');
        setAsFlex(contentDiv);

        html += '<div class="create-ctn">';
        html += '   <div class="create-wrapper">';
        html += '       <div class="create-main">';
        html += '           <div class="create-canva"></div>';
        html += '           </div>';
        html += '           <div class="create-side"></div>';
        html += '       </div>';
        html += '   <div class="create-footer"></div>';
        html += '</div>';

        contentDiv.innerHTML = html;
    });
});

profileBtns.forEach(profileBtn => {
    profileBtn.addEventListener('click', function() {
        let html = '';

        contentDiv.style.display = 'none';
        changeIcon('profileIcon');
        setAsFlex(contentDiv);

        html += '   <div class="profile-content">';
        html += '        <header class="profile-header">';
        html += '            <div class="profile-avatar-ctn">';
        html += '                <img src="../static/img/lol2.JPG" alt="profile-picture">';
        html += '            </div>';
        html += '            <div class="profile-infos">';
        html += '                <div class="profile-infos-username">';
        html += '                    <span> Garreth Verhelpen </span>';
        html += '                </div>';
        html += '                <div class="profile-infos-stats">';
        html += '                    <li>';
        html += '                        <span>72</span>posts';
        html += '                    </li>';
        html += '                    <li>';
        html += '                        <span>359</span>followers';
        html += '                    </li>';
        html += '                    <li>';
        html += '                        <span>406</span>following';
        html += '                    </li>';
        html += '                </div>';
        html += '                <div class="profile-infos-bio">';
        html += '                    <span>';
        html += '                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        html += '                    </span>';
        html += '                </div>';
        html += '            </div>';
        html += '        </header>';
        html += '        <div class="profile-gallery">';

        for (let a = 0; a < 10; a++) {
            html += '            <div class="gallery-item">';
            html += '                <img alt="picture" src="../static/img/lol.JPG" class="gallery-image">';
            html += '                <div class="gallery-item-infos" data-target="individual-picture">';
            html += '                    <img src="../static/img/white-heart.png" alt="like">';
            html += '                    <span> 1376 </span>';
            html += '                    <img src="../static/img/white-comment.png" alt="comment">';
            html += '                    <span> 202 </span>';
            html += '                </div>';
            html += '            </div>';

            html += '            <div class="gallery-item">';
            html += '                <img alt="picture" src="../static/img/lol2.JPG" class="gallery-image">';
            html += '                <div class="gallery-item-infos">';
            html += '                    <img src="../static/img/white-heart.png" alt="like">';
            html += '                    <span> 1376 </span>';
            html += '                    <img src="../static/img/white-comment.png" alt="comment">';
            html += '                    <span> 202 </span>';
            html += '                </div>';
            html += '            </div>';

            html += '            <div class="gallery-item">';
            html += '                <img alt="picture" src="../static/img/lol3.jpg" class="gallery-image">';
            html += '                <div class="gallery-item-infos">';
            html += '                    <img src="../static/img/white-heart.png" alt="like">';
            html += '                    <span> 1376 </span>';
            html += '                    <img src="../static/img/white-comment.png" alt="comment">';
            html += '                    <span> 202 </span>';
            html += '                </div>';
            html += '            </div>';

            html += '            <div class="gallery-item">';
            html += '                <img alt="picture" src="../static/img/lol4.JPG" class="gallery-image">';
            html += '                <div class="gallery-item-infos">';
            html += '                    <img src="../static/img/white-heart.png" alt="like">';
            html += '                    <span> 1376 </span>';
            html += '                    <img src="../static/img/white-comment.png" alt="comment">';
            html += '                    <span> 202 </span>';
            html += '                </div>';
            html += '            </div>';
        }

        html += '        </div>';
        html += '    </div>';

        contentDiv.innerHTML = html;
    });
});

settingsBtns.forEach(settingsBtn => {
    settingsBtn.addEventListener('click', function() {
        let html = '';

        contentDiv.style.display = 'none';
        changeIcon('settingsIcon');
        setAsFlex(contentDiv);
        html = '<p> Settings </p>';

        contentDiv.innerHTML = html;
    });
});

homeContent();