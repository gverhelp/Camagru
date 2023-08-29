var like = 0;
var modalSign = 0;
var activeCtn = 0;
var modalPost = 0;

function changeFilter(hover) {
    if (hover == 1) {
        document.getElementById('google').style.filter = "invert(30%) sepia(84%) saturate(958%) hue-rotate(302deg) brightness(97%) contrast(105%)";
    } else {
        document.getElementById('google').style.filter = "invert(0%) sepia(3%) saturate(27%) hue-rotate(55deg) brightness(93%) contrast(100%)";
    }
}

function changeLikeButton() {
    if (like == 0) {
        document.getElementById('heart').setAttribute("src", "static/img/heart-fill.png");
    } else {
        document.getElementById('heart').setAttribute("src", "static/img/heart.png"); 
    }
    like = !like;
}

function modalSignDisplay(type) {
    const signin = document.getElementById('signin');
    const signup = document.getElementById('signup');

    signin.addEventListener("click", (event) => {activeCtn = 1;})
    signup.addEventListener("click", (event) => {activeCtn = 1;})
    if (activeCtn == 1) {
        activeCtn = 0;
        return;
    }
    if (modalSign == 0) {
        document.getElementById('modal').style.display = 'flex';
        if (type == 'signin') {
            document.getElementById('signin').hidden = false;
        }
        else {
            document.getElementById('signup').hidden = false;
        }
    } else {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('signin').hidden = true;
        document.getElementById('signup').hidden = true;
    }
    modalSign = !modalSign;
}

function modalPostDisplay() {
    const createPostCtn = document.getElementById('createPostCtn');

    createPostCtn.addEventListener("click", (event) => {activeCtn = 1;})
    if (activeCtn == 1) {
        activeCtn = 0;
        return;
    }
    if (modalPost == 0) {
        document.getElementById('modal-left').style.display = 'flex';
    } else {
        document.getElementById('modal-left').style.display = 'none';
    }
    modalPost = !modalPost;
}

function changeLeftIcon(icon) {
    // const modal = document.getElementById('modal-left');

    if (icon == 'createIcon') {
        document.getElementById('createIcon').setAttribute("src", "static/img/post-fill.png");
    } else if (icon == 'userIcon') {
        document.getElementById('userIcon').setAttribute("src", "static/img/user-fill.png"); 
    } else if (icon == 'notificationIcon') {
        document.getElementById('notificationIcon').setAttribute("src", "static/img/notification-fill.png"); 
    } else if (icon == 'settingsIcon') {
        document.getElementById('settingsIcon').setAttribute("src", "static/img/setting-fill.png"); 
    }
    // modal.addEventListener("click", (event) => {
    //     console.log('lol');
    //     document.getElementById('createIcon').setAttribute("src", "static/img/post-empty.png");
    //     document.getElementById('userIcon').setAttribute("src", "static/img/user-empty.png");
    //     document.getElementById('notificationIcon').setAttribute("src", "static/img/notification-empty.png");
    //     document.getElementById('settingsIcon').setAttribute("src", "static/img/setting-empty.png"); 
    // })
}