import * as requests from '../../../backend/requests/requests.js';

// Button's variables
const leftBtns = document.getElementById('leftBtns');
const bottomBtns = document.getElementById('bottomBtns');
const navbarBtns = document.getElementById('navbar');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Modal's variables
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modalContent = document.querySelector('.modal-content');



// Theme's variable
var actualTheme = 0;

navbarBtns.addEventListener('click', (event) => {
    let elem = event.target;

    if (elem.nodeName != 'BUTTON') {
        elem = elem.parentNode;
    }

    let name = elem.getAttribute('name');
    if (name == 'theme') {
        changeTheme();
    }
    if (name == 'signUp') {
        signUpPage();
    }
    if (name == 'signIn') {
        signInPage();
    }
});

leftBtns.addEventListener('click', (event) => {
    let elem = event.target;

    if (elem.nodeName != 'BUTTON') {
        elem = elem.parentNode;
    }

    let name = elem.getAttribute('name');
    if (name) {
        changeIcon(name);
        changePage(name);
    }
});

bottomBtns.addEventListener('click', (event) => {
    let elem = event.target;

    if (elem.nodeName != 'BUTTON') {
        elem = elem.parentNode;
    }

    let name = elem.getAttribute('name');
    if (name) {
        changeIcon(name);
        changePage(name);
    }
});

dropdownMenu.addEventListener('click', (event) => {
    let elem = event.target;
    const menuIcon = document.querySelector('.menuIcon');

    dropdownMenu.classList.remove('open');
    menuIcon.src = "../static/img/menu-bar.svg";

    let elemName = elem.getAttribute('name');
    if (elemName == 'sign-up') {
        signUpPage();
    }
    else if (elemName == 'sign-in') {
        signInPage();
    }
    else if (elemName == 'theme') {
        changeTheme();
    }
});

dropdownBtn.addEventListener('click', () => {
    const menuIcon = document.querySelector('.menuIcon');
    
    if (dropdownMenu.classList.toggle('open')) {
        menuIcon.src = "../static/img/x-mark.svg";
    } else {
        menuIcon.src = "../static/img/menu-bar.svg";
    }
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
        document.querySelectorAll('.sign').forEach(s => {
            s.classList.remove('open');
        });
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    document.querySelectorAll('.sign').forEach(s => {
        s.classList.remove('open');
    });
});


function changeIcon(nameIcon) {
    const names = ['home', 'create', 'profile', 'settings'];

    names.forEach(name => {
        const imgs = document.querySelectorAll("." + name + "Img");

        imgs.forEach(img => {
            if (name == nameIcon) {
                img.src = '../static/img/' + name + '-filled.svg';
            }
            else {
                if (nameIcon != '')
                    img.src = '../static/img/' + name + '-outlined.svg';
            }

            if (actualTheme == 1) {
                img.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
            }
            else {
                img.removeAttribute('style');
            }
        });
    });
}

function changeTheme() {
    const logoIcon = document.querySelector('.logoIcon');
    const themeIcon = document.querySelector('.themeIcon');
    const menuIcon = document.querySelector('.menuIcon');
    const signInLogo = document.getElementById('signInLogo');
    const signUpLogo = document.getElementById('signUpLogo');

    actualTheme = document.body.classList.toggle('dark-mode');

    let sendTheme = 0;
    actualTheme ? sendTheme = 1 : sendTheme = 0;

    requests.updateThemeData(userId, sendTheme)
    .catch((error) => {
        console.error('Error in changeThemeData:', error);
    });

    if (actualTheme == 1) {
        logoIcon.src = "../static/img/instgram-white.png";
        themeIcon.src = "../static/img/sun-outlined.svg";
        menuIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        themeIcon.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
        signInLogo.src = "../static/img/instgram-white.png";
        signUpLogo.src = "../static/img/instgram-white.png";
    }
    else {
        logoIcon.src = "../static/img/instgram-black.png";
        themeIcon.src = "../static/img/moon-outlined.svg";
        signInLogo.src = "../static/img/instgram-black.png";
        signUpLogo.src = "../static/img/instgram-black.png";
        menuIcon.removeAttribute('style');
        themeIcon.removeAttribute('style');
    }
    changeIcon('');
}

function changePage(name) {
    hiddenPage(name);

    switch (name) {
        case 'home':
            home();
            break;
        case 'create':
            create();
            break;
        case 'profile':
            profile();
            break;
        case 'settings':
            settings();
            break;
    }
}

function hiddenPage(name) {
    const pages = ['home', 'profile', 'create', 'settings'];

    pages.forEach(elem => {
        document.querySelector('.' + elem + '-ctn').classList.add('hidden');
        if (elem == name) {
            document.querySelector('.' + elem + '-ctn').classList.remove('hidden');
        }
    });
}

// function setAsFlex(elem) {
//     setTimeout(function() {
//         elem.style.display = "flex";
//     });
// }

function home() {

    requests.getHomeData()
    .then((postsData) => {
        const template = document.getElementById('post-ctn');
        const homeCtn = document.querySelector('.home-ctn');
    
        while (homeCtn.children.length != 1) {
            homeCtn.lastChild.remove();
        }
    
        postsData.forEach(post => {
            const postCtn = document.importNode(template.content, true);
          
            const postName = postCtn.querySelector('#post-username');
            const postTitle = postCtn.querySelector('#post-title');
            const postAvatar = postCtn.querySelector('#post-avatar');
            const postPicture = postCtn.querySelector('#post-picture');
            const postLike = postCtn.querySelector('#post-like');
            const postComment = postCtn.querySelector('#post-comment');
          
            postName.textContent = post['userUsername'];
            postTitle.textContent = post['title'];
            postAvatar.src = post['userAvatarURL'];
            postPicture.src = post['URL'];
            postLike.textContent = post['likes'].length;
            postComment.textContent = post['comments'].length;
          
            homeCtn.appendChild(postCtn);
        });
    })
    .catch((error) => {
        console.error('Error in getHomeData:', error);
    });
}

function profile() {
    requests.getProfileData(userId)
    .then((profileData) => {
        if (profileData) {
            // Handle profileData here
            const template = document.getElementById('gallery-ctn');
            const profileGallery = document.querySelector('.profile-gallery');

            document.getElementById('profile-picture').src = profileData['userData']['avatarURL'];
            document.getElementById('profile-name').textContent = profileData['userData']['username'];
            document.getElementById('profile-followers').textContent = profileData['userData']['followers'].length;
            document.getElementById('profile-following').textContent = profileData['userData']['following'].length;
            document.getElementById('profile-bio').textContent = profileData['userData']['bio'];

            const postsData = profileData['userData']['userPostsData'];

            if (postsData) {

                while (profileGallery.children.length != 1) {
                    profileGallery.lastChild.remove();
                }

                document.getElementById('profile-posts').textContent = postsData.length;

                postsData.forEach(item => {
                    const itemCtn = document.importNode(template.content, true);

                    const itemIMG = itemCtn.querySelector('.gallery-image');
                    const itemLikes = itemCtn.querySelector('#gallery-like');
                    const itemComments = itemCtn.querySelector('#gallery-comment');

                    itemIMG.src = item['URL'];
                    itemLikes.textContent = item['likes'].length;
                    itemComments.textContent = item['comments'].length;

                    profileGallery.appendChild(itemCtn);
                });
            } else {
                document.getElementById('profile-posts').textContent = 0;
                profileGallery.style.display = "flex";
                profileGallery.style.fontSize = "2rem";
                profileGallery.style.fontWeight = 600;
                profileGallery.textContent = "You don't have any post.";
            }
        }
    })
    .catch((error) => {
        console.error('Error in getProfileData:', error);
    });
}

function create() {
}

function settings() {
}

function signUpPage() {
    const signup = document.getElementById('signup');

    signup.classList.add('open');
    modalContent.appendChild(signup);
    modal.classList.add('open');

    document.getElementById("signUp-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username-signup").value;
        const email = document.getElementById("email-signup").value;
        const password = document.getElementById("password-signup").value;

        requests.signUp(username, email, password)
        .then(data => {
            if (data.success) {
                // Redirect to a success page or perform other actions.
                document.getElementById('signUp-form').textContent = "Your account has been created successfuly!";
                location.reload();
            } else {
                // Display the error message on the current page.
                document.getElementById('error-message-signup').textContent = data.message;
            }
        })
        .catch((error) => {
            console.error("Error in signUp():", error);
        });
    });
}

function signInPage() {
    const signin = document.getElementById('signin');

    signin.classList.add('open');
    modalContent.appendChild(signin);
    modal.classList.add('open');

    document.getElementById("signIn-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username-signin").value;
        const password = document.getElementById("password-signin").value;

        requests.signIn(username, password)
        .then(data => {
            if (data.success) {
                // Redirect to a success page or perform other actions.
                document.getElementById('signIn-form').textContent = "You're connected, well done!";
                location.reload();
            } else {
                // Display the error message on the current page.
                document.getElementById('error-message-signin').textContent = data.message;
            }
        })
        .catch((error) => {
            console.error("Error in signIn():", error);
        });

    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (userId != -1) {
        requests.getTheme(userId)
        .then((theme) => {
            if (theme == 1)
                changeTheme();
        })
        .catch((error) => {
            console.error('Error in getTheme:', error);
        });
    }

    changePage('home');
});