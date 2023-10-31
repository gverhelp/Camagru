// import { getPost } from './request.js';

// Button's variables
const leftBtns = document.getElementById('leftBtns');
const bottomBtns = document.getElementById('bottomBtns');
const navbarBtns = document.getElementById('navbar');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.getElementById('dropdownMenu');

// Modal's variables
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modalContent = document.querySelector('.modal-content');

// Theme's variable
var actualTheme = 0;

//Active page variable
var activePage = {'home': 0, 'profile': 0, 'create': 0, 'settings': 0};

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
        signUp();
    }
    if (name == 'signIn') {
        signIn();
    }
});

leftBtns.addEventListener('click', (event) => {
    let elem = event.target;

    if (elem.nodeName != 'BUTTON') {
        elem = elem.parentNode;
    }

    let name = elem.getAttribute('name');
    changeIcon(name);
    changePage(name);
});

bottomBtns.addEventListener('click', (event) => {
    let elem = event.target;

    if (elem.nodeName != 'BUTTON') {
        elem = elem.parentNode;
    }

    let name = elem.getAttribute('name');
    changeIcon(name);
    changePage(name);
});

dropdownMenu.addEventListener('click', (event) => {
    let elem = event.target;
    const menuIcon = document.querySelector('.menuIcon');

    dropdownMenu.classList.remove('open');
    menuIcon.src = "../static/img/menu-bar.svg";

    elemName = elem.getAttribute('name');
    if (elemName == 'sign-up') {
        signUp();
    }
    else if (elemName == 'sign-in') {
        signIn();
    }
    else if (elemName == 'theme') {
        changeTheme();
    }
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.querySelectorAll('.sign').forEach(e => {
            e.classList.add('hidden');
        });
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.querySelectorAll('.sign').forEach(e => {
        e.classList.add('hidden');
    });
});

dropdownBtn.addEventListener('click', () => {
    const menuIcon = document.querySelector('.menuIcon');
    
    if (dropdownMenu.classList.toggle('open')) {
        menuIcon.src = "../static/img/x-mark.svg";
    } else {
        menuIcon.src = "../static/img/menu-bar.svg";
    }
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
            // if (!activePage['home']) {
                // active(name);
                home();
            // }
            break;
        case 'create':
            // if (!activePage['create']) {
                // active(name);
                create();
            // }
            break;
        case 'profile':
            // if (!activePage['profile']) {
                // active(name);
                profile();
            // }
            break;
        case 'settings':
            // if (!activePage['settings']) {
                // active(name);
                settings();
            // }
            break;
    }
}

// function active(name) {
//     for (key in activePage) {
//         activePage[key] = 0;
//         if (key == name) {
//             activePage[key] = 1;
//         }
//     }
// }

function hiddenPage(name) {
    for (key in activePage) {
        document.querySelector('.' + key + '-ctn').classList.add('hidden');
        if (key == name) {
            document.querySelector('.' + key + '-ctn').classList.remove('hidden');
        }
    }
}

// function setAsFlex(elem) {
//     setTimeout(function() {
//         elem.style.display = "flex";
//     });
// }

async function home() {

    const postsData = [
        {
            avatarURL: '../static/img/lol2.JPG',
            username: 'Garreth Verhelpen',
            localisation: 'Altitude 100, Forest',
            pictureURL: '../static/img/lol2.JPG',
            like: '1345',
            comment: '378'
        },
        {
            avatarURL: '../static/img/lol2.JPG',
            username: 'Garreth Verhelpen',
            localisation: 'Rome, Italy',
            pictureURL: '../static/img/lol4.JPG',
            like: '2456',
            comment: '506'
        },
        {
            avatarURL: '../static/img/lol3.JPG',
            username: 'Camille Arcoulin',
            localisation: 'Lolo',
            pictureURL: '../static/img/lol3.JPG',
            like: '456',
            comment: '45'
        },
        {
            avatarURL: '../static/img/lol2.JPG',
            username: 'Garreth Verhelpen',
            localisation: 'Rome, Italy',
            pictureURL: '../static/img/lol.JPG',
            like: '1345',
            comment: '378'
        }
    ]

    // const postsData = await getPost(userID);
    // console.log(postsData);
    // console.log(userID);

    const template = document.getElementById('post-ctn');
    const homeCtn = document.querySelector('.home-ctn');

    postsData.forEach(post => {
        const postCtn = document.importNode(template.content, true);
      
        const postName = postCtn.querySelector('#post-name');
        const postLocalisation = postCtn.querySelector('#post-localisation');
        const postAvatar = postCtn.querySelector('#post-avatar');
        const postPicture = postCtn.querySelector('#post-picture');
        const postLike = postCtn.querySelector('#post-like');
        const postComment = postCtn.querySelector('#post-comment');
      
        postName.textContent = post.username;
        postLocalisation.textContent = post.localisation;
        postAvatar.src = post.avatarURL;
        postPicture.src = post.pictureURL;
        postLike.textContent = post.like;
        postComment.textContent = post.comment;
      
        homeCtn.appendChild(postCtn);
    });
}

function profile() {

    const userData = {
        username: 'Garreth Verhelpen',
        avatarURL: '../static/img/lol2.JPG',
        postNbr: 72,
        followers: 359,
        following: 406,
        bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ad reiciendis quo repellendus recusandae quas odit similique',
        gallery: [
            {
                imageURL: '../static/img/lol.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol2.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol3.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol4.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol2.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol3.JPG',
                likes: 1376,
                comments: 202
            },
            {
                imageURL: '../static/img/lol4.JPG',
                likes: 1376,
                comments: 202
            },
        ]
    };

    const template = document.getElementById('gallery-ctn');
    const profileGallery = document.querySelector('.profile-gallery');

    document.getElementById('profile-picture').src = userData.avatarURL;
    document.getElementById('profile-name').textContent = userData.username;
    document.getElementById('profile-posts').textContent = userData.postNbr;
    document.getElementById('profile-followers').textContent = userData.followers;
    document.getElementById('profile-following').textContent = userData.following;
    document.getElementById('profile-bio').textContent = userData.bio;

    userData.gallery.forEach(item => {
        const itemCtn = document.importNode(template.content, true);

        const itemIMG = itemCtn.querySelector('.gallery-image');
        const itemLikes = itemCtn.querySelector('#gallery-like');
        const itemComments = itemCtn.querySelector('#gallery-comment');

        itemIMG.src = item.imageURL;
        itemLikes.textContent = item.likes;
        itemComments.textContent = item.comments;

        profileGallery.appendChild(itemCtn);
    });
}

function create() {
}

function settings() {
}

function signUp() {
    const signup = document.getElementById('signup');

    signup.classList.remove('hidden');
    modalContent.appendChild(signup);
    modal.style.display = 'flex';
}

function signIn() {
    const signin = document.getElementById('signin');

    signin.classList.remove('hidden');
    modalContent.appendChild(signin);
    modal.style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", () => {
    changePage('home');
});