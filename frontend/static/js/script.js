import { getUserData, changeAvatar, signUp, signIn } from './requests.js';

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

//Active page variable
var pages = {'home': 0, 'profile': 0, 'create': 0, 'settings': 0};

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
    changeIcon(name);
    changePage(name);
});

bottomBtns.addEventListener('click', (event) => {
    let elem = event.target;

    if (elem.nodeName != 'BUTTON') {
        elem = elem.parentNode;
    }

    let name = elem.getAttribute('name');6
    changeIcon(name);
    changePage(name);
});

dropdownMenu.addEventListener('click', (event) => {
    let elem = event.target;
    const menuIcon = document.querySelector('.menuIcon');

    dropdownMenu.classList.remove('open');
    menuIcon.src = "../static/img/menu-bar.svg";

    let elemName = elem.getAttribute('name');
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
            if (!pages['home']) {
                home();
                // pages['home'] = 1;
            }
            break;
        case 'create':
            if (!pages['create']) {
                create();
                // pages['create'] = 1;
            }
            break;
        case 'profile':
            if (!pages['profile']) {
                profile();
                // pages['profile'] = 1;
            }
            break;
        case 'settings':
            if (!pages['settings']) {
                settings();
                // pages['settings'] = 1;
            }
            break;
    }
}

function hiddenPage(name) {
    for (let key in pages) {
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

function home() {

    const postsData = [
        {
            avatarURL: '../static/img/lol2.JPG',
            username: 'Carla Sanchez Boudart',
            localisation: 'Altitude 100, Forest',
            pictureURL: '../static/img/lol2.JPG',
            like: '1345',
            comment: '378'
        },
        {
            avatarURL: '../static/img/lol4.JPG',
            username: 'Célia Glore',
            localisation: 'Aywaille, Belgium',
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
            localisation: 'Sainte-Ode',
            pictureURL: '../static/img/lol.JPG',
            like: '1345',
            comment: '378'
        }
    ]

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

    // const userData = {
    //     username: 'Garreth Verhelpen',
    //     avatarURL: '../static/img/lol2.JPG',
    //     postNbr: 72,
    //     followers: 359,
    //     following: 406,
    //     bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ad reiciendis quo repellendus recusandae quas odit similique',
    //     gallery: [
    //         {
    //             imageURL: '../static/img/lol.JPG',
    //             likes: 1376,
    //             comments: 202
    //         },
    //         {
    //             imageURL: '../static/img/lol2.JPG',
    //             likes: 504,
    //             comments: 103
    //         },
    //         {
    //             imageURL: '../static/img/lol3.JPG',
    //             likes: 2054,
    //             comments: 1304
    //         },
    //         {
    //             imageURL: '../static/img/lol4.JPG',
    //             likes: 7860,
    //             comments: 4320
    //         },
    //         {
    //             imageURL: '../static/img/lol.JPG',
    //             likes: 4504,
    //             comments: 716
    //         },
    //         {
    //             imageURL: '../static/img/lol2.JPG',
    //             likes: 3679,
    //             comments: 405
    //         },
    //         {
    //             imageURL: '../static/img/lol3.JPG',
    //             likes: 2340,
    //             comments: 309
    //         },
    //         {
    //             imageURL: '../static/img/lol4.JPG',
    //             likes: 3654,
    //             comments: 967
    //         },
    //         {
    //             imageURL: '../static/img/lol.JPG',
    //             likes: 4504,
    //             comments: 716
    //         },
    //         {
    //             imageURL: '../static/img/lol2.JPG',
    //             likes: 3679,
    //             comments: 405
    //         },
    //         {
    //             imageURL: '../static/img/lol3.JPG',
    //             likes: 2340,
    //             comments: 309
    //         },
    //         {
    //             imageURL: '../static/img/lol4.JPG',
    //             likes: 3654,
    //             comments: 967
    //         },
    //     ]
    // };

    console.log(userId);

    getUserData(userId)
    .then((userData) => {
        if (userData) {
            // Handle userData here
            // if (userData.avatarURL == '' || userData.avatarURL == null) {
            //     changeAvatar(userId, "../static/img/profile-outlined.svg")
            //     .then((avatar) => {
            //         document.getElementById('profile-picture').src = avatar['avatarURL'];
            //     });
            // } else {
                document.getElementById('profile-picture').src = userData.avatarURL;
                document.getElementById('profile-name').textContent = userData.username;
            // }
            console.log(userData);
        }
    })
    .catch((error) => {
        console.error('Error in getUserData:', error);
    });



    // const template = document.getElementById('gallery-ctn');
    // const profileGallery = document.querySelector('.profile-gallery');

    // document.getElementById('profile-picture').src = userData.avatarURL;
    // document.getElementById('profile-name').textContent = userData.username;
    // document.getElementById('profile-posts').textContent = userData.postNbr;
    // document.getElementById('profile-followers').textContent = userData.followers;
    // document.getElementById('profile-following').textContent = userData.following;
    // document.getElementById('profile-bio').textContent = userData.bio;

    // userData.gallery.forEach(item => {
    //     const itemCtn = document.importNode(template.content, true);

    //     const itemIMG = itemCtn.querySelector('.gallery-image');
    //     const itemLikes = itemCtn.querySelector('#gallery-like');
    //     const itemComments = itemCtn.querySelector('#gallery-comment');

    //     itemIMG.src = item.imageURL;
    //     itemLikes.textContent = item.likes;
    //     itemComments.textContent = item.comments;

    //     profileGallery.appendChild(itemCtn);
    // });
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

        signUp(username, email, password)
        .then(data => {
            if (data.success) {
                // Redirect to a success page or perform other actions.
                navbarBtns.classList.add('hidden');
                document.getElementById('signUp-form').textContent = "Your account has been created successfuly!";
            } else {
                // Display the error message on the current page.
                console.log('sign up error');
                console.log(data['message']);
                document.getElementById("error-message").textContent = data.message;
            }
        })
        .catch((error) => {
            console.error("Error in signUp():", error);
        });

        console.log('Submit Sign Up');
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

        signIn(username, password)
        .then(data => {
            if (data.success) {
                // Redirect to a success page or perform other actions.
                navbarBtns.classList.add('hidden');
                document.getElementById('signIn-form').textContent = "You're connected, well done!";
            } else {
                // Display the error message on the current page.
                console.log('sign in error');
                console.log(data['message']);
                document.getElementById("error-message").textContent = data.message;
            }
        })
        .catch((error) => {
            console.error("Error in signUp():", error);
        });

        console.log('Submit Sign In');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    changePage('home');
});