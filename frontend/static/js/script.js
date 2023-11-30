import * as requests from '../../../backend/requests/requests.js';

// Button's variables
const leftBtns = document.getElementById('leftBtns');
const bottomBtns = document.getElementById('bottomBtns');
const navbarBtns = document.getElementById('navbar');
const dropdownBtn = document.querySelector('.dropdown-btn');
const updateSettingsBtn = document.getElementById('updateBtn');
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
        document.querySelector('.individual-post-ctn').classList.add('hidden');
        // document.getElementById('indiv-picture').src = "";
        // document.getElementById('indiv-avatar').src = "";
        // document.getElementById('individual-post-username').textContent = "";
        // document.getElementById('individual-post-title').textContent = "";
        // document.getElementById('comment-username').textContent = "";
        // document.getElementById('comment-text').textContent = "";
        // document.getElementById('comment-avatar').src = "";
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    document.querySelectorAll('.sign').forEach(s => {
        s.classList.remove('open');
    });
    document.querySelector('.individual-post-ctn').classList.add('hidden');
});

function displayError(settingsResponse, message) {
    settingsResponse.classList.remove('hidden');
    settingsResponse.textContent = message;
}

function validatePassword(settingsResponse, newPassword, newPasswordVerif) {
    if (newPassword.value.length > 0) {
        if (newPasswordVerif.value.length == 0) {
            displayError(settingsResponse, "Please fill the password verification field.");
            newPasswordVerif.style.borderColor = "red";
            return false;
        } else if (newPassword.value != newPasswordVerif.value) {
            displayError(settingsResponse, "Please enter the same password in both fields.");
            newPasswordVerif.style.borderColor = "red";
            newPassword.style.borderColor = "red";
            return false;
        } else if (newPassword.value.length < 6) {
            displayError(settingsResponse, "Password must contain at least 6 characters.");
            newPassword.style.borderColor = "red";
            return false;
        } else if (!/[A-Z]/.test(newPassword.value)) {
            displayError(settingsResponse, "Password must contain at least one capital letter.");
            newPassword.style.borderColor = "red";
            return false;
        } else {
            newPasswordVerif.style.borderColor = "var(--second-color)";
            newPassword.style.borderColor = "var(--second-color)";
        }
    }
    return true;
}

updateSettingsBtn.addEventListener('click', function () {
    if (actualUserID == -1)
        return

    const maxLengthBio = 150;
    const maxLengthUsername = 25;
    const settingsResponse = document.getElementById('settings-response');
    const newUsername = document.getElementById('username-settings');
    const newEmail = document.getElementById('email-settings');
    const newPassword = document.getElementById('password-settings');
    const newPasswordVerif = document.getElementById('password-verification-settings');
    const newAvatar = document.getElementById('avatar-settings');
    const newBio = document.getElementById('bio-settings');

    if (newUsername.value.length > maxLengthUsername) {
        displayError(settingsResponse, "Username too long.");
    } else if (newBio.value.length > maxLengthBio) {
        displayError(settingsResponse, "Bio too long.");
    }

    if (!validatePassword(settingsResponse, newPassword, newPasswordVerif)) {
        return;
    }

    requests.updateSettings(actualUserID, newUsername.value, newEmail.value, newPassword.value, newAvatar.files[0], newBio.value)
        .then((message) => {
            newUsername.value = "";
            newEmail.value = "";
            newPassword.value = "";
            newPasswordVerif.value = "";
            newAvatar.value = "";
            newBio.value = "";
            newPasswordVerif.style.borderColor = "var(--second-color)";
            newPassword.style.borderColor = "var(--second-color)";

            settingsResponse.classList.remove('hidden');
            settingsResponse.textContent = message;
        })
        .catch((error) => {
            console.error('Error in updateSettings():', error);
        });
});


document.getElementById('comment-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const commentInput = document.getElementById('comment-input');
    const postID = commentInput.getAttribute('data-post-id')

    if (actualUserID == -1)
        return

    requests.addComment(actualUserID, postID, commentInput.value)
    .then(() => {
        commentInput.value = "";
        displayIndivPicture(postID);
    })
    .catch((error) => {
        console.error('Error in addComment():', error);
    });
});

function likeButton(postId, likeButtonElem) {
    if (actualUserID == -1) {
        alert("You're not connected. Please sign up or sign in to your account before liking any post.");
        return
    }

    requests.updatePostLike(actualUserID, postId)
    .then((data) => {
        let likeCountElem = likeButtonElem.querySelector('#post-like');
        let svgLikeElem = likeButtonElem.querySelector('#svg-like');
        let svgLikeFillElem = likeButtonElem.querySelector('#svg-like-fill');

        if (data.message == "Added") {
            likeCountElem.textContent++;
            svgLikeElem.classList.add('hidden');
            svgLikeFillElem.classList.remove('hidden');
        } else {
            likeCountElem.textContent--;
            svgLikeElem.classList.remove('hidden');
            svgLikeFillElem.classList.add('hidden');
        }
    })
    .catch((error) => {
        console.error('Error in updatePostLike():', error);
    });
}

function displayIndivPicture(postId) {
    const indivPostCtn = document.querySelector('.individual-post-ctn');
    const indivPicture = document.getElementById('indiv-picture');
    const indivAvatar = document.getElementById('indiv-avatar');
    const indivUsername = document.getElementById('individual-post-username');
    const indivTitle = document.getElementById('individual-post-title');
    const commentInput = document.getElementById('comment-input');

    commentInput.setAttribute('data-post-id', postId)
    modalContent.appendChild(indivPostCtn);
    modal.classList.add('open');
    indivPostCtn.classList.remove('hidden');

    if (actualUserID == -1) {
        commentInput.setAttribute('placeholder', "You have to be connected to comment a post.");
    }

    requests.getPost(postId)
    .then((data) => {
        if (data['postData']) {
            indivPicture.src = data['postData']['URL'];
            indivTitle.textContent = data['postData']['title'];
            indivAvatar.src = data['userData']['avatarURL'];
            indivUsername.textContent = data['userData']['username'];

            if (data['commentsData']) {
                const template = document.getElementById('commentsList');
                const commentsUl = document.getElementById('commentsUl');

                while (commentsUl.children.length != 1) {
                    commentsUl.lastChild.remove();
                }

                data['commentsData'].forEach((comment) => {
                    const commentList = document.importNode(template.content, true);

                    const tempUsername = commentList.getElementById('comment-username');
                    const tempText = commentList.getElementById('comment-text');
                    const tempAvatar = commentList.getElementById('comment-avatar');

                    tempUsername.textContent = comment['userData']['username'];
                    tempAvatar.src = comment['userData']['avatarURL']
                    tempText.textContent = comment['text'];

                    commentsUl.appendChild(commentList);
                });
            }
        }
    })
    .catch((error) => {
        console.error('Error in getPost():', error);
    });
}

document.querySelector('.home-ctn').addEventListener('click', function(event) {
    let elem = event.target;

    while (elem.parentElement) {
        if (elem.getAttribute('name') == "likeBtn") {
            const postId = elem.parentElement.parentElement.getAttribute('data-post-id');

            likeButton(parseInt(postId), elem);
            break;
        } if (elem.getAttribute('name') == "commentBtn") {
            if (actualUserID != -1) {
                const postId = elem.parentElement.parentElement.getAttribute('data-post-id');

                displayIndivPicture(postId);
            } else {
                alert("You're not connected. Please sign up or sign in to your account before commenting any post.");
            }
            break;
        } if (elem.getAttribute('name') == 'post-username') {
            if (elem.getAttribute('data-user-id') == actualUserID) {
                changeIcon('profile');
                changePage('profile');
            } else
                changePage('profile', elem.getAttribute('data-user-id'));
            break;
        } if (elem.getAttribute('name') == 'post-ctn') {
            const postId = elem.getAttribute('data-post-id');

            displayIndivPicture(postId);
            break;
        }
        elem = elem.parentElement;
    }
});

document.querySelector('.profile-gallery').addEventListener('click', function(event) {
    let elem = event.target;

    while (elem.parentElement) {
        if (elem.getAttribute('name') == 'galleryItemInfos') {
            displayIndivPicture(elem.getAttribute('data-post-id'));
            break;
        }
        elem = elem.parentElement;
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

    if (actualUserID != -1) {
        requests.updateThemeData(actualUserID, sendTheme)
        .catch((error) => {
            console.error('Error in changeThemeData():', error);
        });
    }

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

function changePage(name, userID = actualUserID) {
    displayPage(name);

    switch (name) {
        case 'home':
            home();
            break;
        case 'create':
            create();
            break;
        case 'profile':
            profile(userID);
            break;
        case 'settings':
            settings();
            break;
    }
}

function displayPage(name) {
    const pages = ['home', 'profile', 'create', 'settings'];

    pages.forEach(elem => {
        document.querySelector('.' + elem + '-ctn').classList.add('hidden');
        if (elem == name) {
            document.querySelector('.' + elem + '-ctn').classList.remove('hidden');
        }
    });
}

function home() {
    requests.getHomeData()
    .then((postsData) => {
        const template = document.getElementById('post-ctn');
        const homeCtn = document.querySelector('.home-ctn');
    
        while (homeCtn.children.length != 1) {
            homeCtn.lastChild.remove();
        }
    
        postsData.forEach(post => {
            const postTemplate = document.importNode(template.content, true);
          
            const postCtn = postTemplate.querySelector('.post-ctn');
            const postName = postTemplate.querySelector('#post-username');
            const postTitle = postTemplate.querySelector('#post-title');
            const postAvatar = postTemplate.querySelector('#post-avatar');
            const postPicture = postTemplate.querySelector('#post-picture');
            const postLike = postTemplate.querySelector('#post-like');
            const postComment = postTemplate.querySelector('#post-comment');
          
            postCtn.setAttribute('data-post-id', post['idposts']);
            postName.setAttribute('data-user-id', post['userID']);
            postName.textContent = post['username'];
            postTitle.textContent = post['title'];
            postAvatar.src = post['avatarURL'];
            postPicture.src = post['URL'];
            postLike.textContent = post['likes'].length;
            postComment.textContent = post['comments'].length;

            // console.log(post['URL']);


            // // Assuming binaryImageData is retrieved properly
            // const binaryImageData = atob(post['URL']);

            // // Create Blob from base64-encoded string
            // const blob = new Blob([binaryImageData], { type: 'image/jpeg' });

            // // Create Object URL for the Blob
            // const imageUrl = URL.createObjectURL(blob);

            // // Assign Image URL to src attribute of your image element
            // postPicture.src = imageUrl;


            post['likes'].forEach((user) => {
                if (actualUserID == user['userID']) {
                    postTemplate.getElementById('svg-like').classList.add('hidden');
                    postTemplate.getElementById('svg-like-fill').classList.remove('hidden');
                }
            });

            if (actualUserID == -1) {
                postTemplate.querySelectorAll('.post-footer-btn').forEach((button) => {
                    // button.disabled = true;
                    button.classList.add('disabled');
                });
            } else {
                postTemplate.querySelectorAll('.post-footer-btn').forEach((button) => {
                    // button.disabled = false;
                    button.classList.remove('disabled');
                });
            }
          
            homeCtn.appendChild(postTemplate);
        });
    })
    .catch((error) => {
        console.error('Error in getHomeData:', error);
    });
}

function profile(userID) {
    requests.getProfileData(userID)
    .then((profileData) => {
        if (profileData) {
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
                    const itemInfo = itemCtn.querySelector('.gallery-item-infos');

                    itemIMG.src = item['URL'];
                    itemLikes.textContent = item['likes'].length;
                    itemComments.textContent = item['comments'].length;
                    itemInfo.setAttribute('data-post-id', item['idposts']);

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
        console.error('Error in getProfileData():', error);
    });
}

function create() {
    if (actualUserID == -1)
        return

    const cameraOptions = document.querySelector('select');
    const selectCameraCtn = document.querySelector('.create-footer-select-camera');
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    const screenshotImage = document.querySelector('.screenshot-img');
    const screenshot = document.querySelector('.screenshot-btn');
    const optionsButtons = document.querySelector('.create-footer-buttons-options');
    const [publishButton, cancelButton] = [...document.querySelectorAll('.option-button')];
    let screenshotDone = false;
    
    const constraints = {
      video: {
        width: {
        //   min: 1280,
          ideal: 1920,
        //   max: 2560,
        },
        height: {
        //   min: 720,
          ideal: 1080,
        //   max: 1440
        },
      }
    };
    
    const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const options = videoDevices.map(videoDevice => {
            return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
        });
        cameraOptions.innerHTML = options.join('');
    };
    
    const startStream = async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
    };
    
    const handleStream = (stream) => {
        video.srcObject = stream;
        screenshot.classList.remove('hidden');
    };
    
    getCameraSelection();

    cameraOptions.onchange = () => {
        const updatedConstraints = {
            ...constraints,
            deviceId: {
                exact: cameraOptions.value
            }
        };
        startStream(updatedConstraints);
    };

    const doScreenshot = () => {
        if (screenshotDone)
            return
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        screenshotImage.src = canvas.toDataURL('image/webp');
        screenshotImage.classList.remove('hidden');
        video.classList.add('hidden');
        screenshotDone = true;
        document.querySelector('.create-footer-buttons').classList.add('hidden');
        selectCameraCtn.classList.add('hidden');
        optionsButtons.classList.remove('hidden');
    };

    screenshot.onclick = doScreenshot;
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
            ...constraints,
            deviceId: {
                exact: cameraOptions.value
            }
        };
        startStream(updatedConstraints);
    }

    cancelButton.onclick = () => {
        screenshotImage.classList.add('hidden');
        video.classList.remove('hidden');
        screenshotDone = false;
        document.querySelector('.create-footer-buttons').classList.remove('hidden');
        optionsButtons.classList.add('hidden');
        selectCameraCtn.classList.remove('hidden');
    };

    publishButton.onclick = () => {
        if (!screenshotDone)
            return;

        const screenshotDataURL = canvas.toDataURL('image/webp');
        requests.addPost(actualUserID, screenshotDataURL)
        .catch((error) => {
            console.error('Error in addPost():', error);
        });
        // Optionally, reset UI or perform other actions after publishing
    };
}

function settings() {
    const settingsResponse = document.getElementById('settings-response');
    const newUsername = document.getElementById('username-settings');
    const newEmail = document.getElementById('email-settings');
    const newPassword = document.getElementById('password-settings');
    const newPasswordVerif = document.getElementById('password-verification-settings');
    const newBio = document.getElementById('bio-settings');
    
    settingsResponse.classList.add('hidden');
    newUsername.value = "";
    newEmail.value = "";
    newPassword.value = "";
    newPasswordVerif.value = "";
    newBio.value = "";
    newPassword.style.borderColor = "var(--second-color)";
    newPasswordVerif.style.borderColor = "var(--second-color)";
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
                document.getElementById('signUp-form').textContent = "Your account has been created successfuly!";
                location.reload();
            } else {
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
                document.getElementById('signIn-form').textContent = "You're connected, well done!";
                location.reload();
            } else {
                document.getElementById('error-message-signin').textContent = data.message;
            }
        })
        .catch((error) => {
            console.error("Error in signIn():", error);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (actualUserID != -1) {
        requests.getTheme(actualUserID)
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




// function setAsFlex(elem) {
//     setTimeout(function() {
//         elem.style.display = "flex";
//     });
// }