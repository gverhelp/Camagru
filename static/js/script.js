var like = 0;
var modalSign = 0;
var activeCtn = 0;

postDisplay();
changeLeftIcon('homeIcon');

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

function changeLeftIcon(icon) {
    document.getElementById('homeIcon').setAttribute("src", "static/img/home-empty.png");
    document.getElementById('createIcon').setAttribute("src", "static/img/post-empty.png");
    document.getElementById('userIcon').setAttribute("src", "static/img/user-empty.png");
    document.getElementById('notificationIcon').setAttribute("src", "static/img/notification-empty.png");
    document.getElementById('settingsIcon').setAttribute("src", "static/img/setting-empty.png");

    if (icon == 'createIcon') {
        document.getElementById('createIcon').setAttribute("src", "static/img/post-fill.png");
    } else if (icon == 'userIcon') {
        document.getElementById('userIcon').setAttribute("src", "static/img/user-fill.png"); 
    } else if (icon == 'notificationIcon') {
        document.getElementById('notificationIcon').setAttribute("src", "static/img/notification-fill.png"); 
    } else if (icon == 'settingsIcon') {
        document.getElementById('settingsIcon').setAttribute("src", "static/img/setting-fill.png"); 
    } else if (icon == 'homeIcon') {
        document.getElementById('homeIcon').setAttribute("src", "static/img/home-fill.png"); 
    }
}

function postDisplay() {
    const elem = document.getElementById('anim-center');
    var html = "";

    for (let i = 0; i < 5; i++) {
        html += '<div class="post">'
        html += '   <div class="post-header">'
        html += '       <div class="post-avatar">'
        html += '           <img src="static/img/pepe.jpeg" alt="Avatar" style="width: 100%; height: auto;">' 
        html += '       </div>'
        html += '       <p> Pepe <br/> Frog </p>'
        html += '   </div>'
        html += '   <div class="post-body">'
        html += '       <img class="post-pictures" src="static/img/lol2.JPG">'
        html += '   </div>'
        html += '   <div class="post-footer">'
        html += '       <button class="post-footer-btn" onclick="changeLikeButton()">'
        html += '           <div class="post-footer-btn-ctn">'
        html += '               <img src="static/img/heart.png" id="heart" alt="like" style="width: auto; height: 80%">'
        html += '           1300'
        html += '           </div>'
        html += '       </button>'
        html += '       <button class="post-footer-btn">'
        html += '           <div class="post-footer-btn-ctn">'
        html += '               <img src="static/img/comment2.png" alt="comments" style="width: auto; height: 80%">'
        html += '           1340'
        html += '           </div>'
        html += '       </button>'
        html += '   </div>'
        html += '</div>'
    }
    elem.innerHTML = html;
}

function createDisplay() {
    const elem = document.getElementById('anim-center');

    var html = "<p> Create </p>";

    elem.innerHTML = html;
}

function profileDisplay() {
    const elem = document.getElementById('anim-center');

    var html = "<p> Profile </p>";

    elem.innerHTML = html;
}

function notifDisplay() {
    const elem = document.getElementById('anim-center');

    var html = "<p> Notifications </p>";

    elem.innerHTML = html;
}

function settingsDisplay() {
    const elem = document.getElementById('anim-center');

    var html = "<p> Settings </p>";

    elem.innerHTML = html;
}

function changePage(page) {

    const elem = document.querySelector('.anim-center')
    elem.classList.add('pre-animation');
    setTimeout(function(){
        elem.classList.remove('pre-animation')
    }, 200);

    switch (page) {
        case 'home':
            postDisplay();
            break;
        case 'create':
            createDisplay();
            break;
        case 'profile':
            profileDisplay();
            break;
        case 'notification':
            notifDisplay();
            break;
        case 'settings':
            settingsDisplay();
            break;
    }
}