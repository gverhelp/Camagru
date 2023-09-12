var like = 0;
var modalSign = 0;
var modalProfilePost = 0;
var activeCtn = 0;

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
    const signModal = document.getElementById('signModal');

    signin.addEventListener("click", (event) => {activeCtn = 1;})
    signup.addEventListener("click", (event) => {activeCtn = 1;})
    if (activeCtn == 1) {
        activeCtn = 0;
        return;
    }
    if (modalSign == 0) {
        signModal.style.display = 'flex';
        if (type == 'signin') {
            signin.hidden = false;
        }
        else {
            signup.hidden = false;
        }
    } else {
        signModal.style.display = 'none';
        signin.hidden = true;
        signup.hidden = true;
    }
    modalSign = !modalSign;
}

function modalProfilePostDisplay() {
    const elem = document.getElementById('profilePostModal');
    const postElem = document.getElementById('indiv-post');

        postElem.addEventListener("click", (event) => {activeCtn = 1;})
    if (activeCtn == 1) {
        activeCtn = 0;
        return;
    }

    if (modalProfilePost == 0) {
        elem.style.display = 'flex';
    } else {
        elem.style.display = 'none';
    }
    modalProfilePost = !modalProfilePost;
}

function changeLeftIcon(icon) {
    document.getElementById('homeIcon').setAttribute("src", "static/img/home-empty.png");
    document.getElementById('createIcon').setAttribute("src", "static/img/post-empty.png");
    document.getElementById('profileIcon').setAttribute("src", "static/img/user-empty.png");
    document.getElementById('notificationsIcon').setAttribute("src", "static/img/notification-empty.png");
    document.getElementById('settingsIcon').setAttribute("src", "static/img/setting-empty.png");

    if (icon == 'createIcon') {
        document.getElementById('createIcon').setAttribute("src", "static/img/post-fill.png");
    } else if (icon == 'profileIcon') {
        document.getElementById('profileIcon').setAttribute("src", "static/img/user-fill.png"); 
    } else if (icon == 'notificationsIcon') {
        document.getElementById('notificationsIcon').setAttribute("src", "static/img/notification-fill.png"); 
    } else if (icon == 'settingsIcon') {
        document.getElementById('settingsIcon').setAttribute("src", "static/img/setting-fill.png"); 
    } else if (icon == 'homeIcon') {
        document.getElementById('homeIcon').setAttribute("src", "static/img/home-fill.png"); 
    }
}

function setAsFlex(elem) {
    setTimeout(function() {
        elem.style.display = "flex";
    });
}

function homeDisplay() {
    var html = '';

    for (let i = 0; i < 5; i++) {
        html += '<div class="post">';
        html += '   <div class="post-header">';
        html += '       <img class="post-avatar" src="static/img/pepe.jpeg" alt="Avatar">';
        html += '       <p> Pepe <br/> Frog </p>';
        html += '   </div>';
        html += '   <div class="post-body">';
        html += '       <img class="post-pictures" src="static/img/lol.JPG">';
        html += '   </div>';
        html += '   <div class="post-footer">';
        html += '       <button class="post-footer-btn" onclick="changeLikeButton()">';
        html += '           <div class="post-footer-btn-ctn">';
        html += '               <img src="static/img/heart.png" id="heart" alt="like" style="width: auto; height: 80%">';
        html += '           1300';
        html += '           </div>';
        html += '       </button>';
        html += '       <button class="post-footer-btn">';
        html += '           <div class="post-footer-btn-ctn">';
        html += '               <img src="static/img/comment2.png" alt="comments" style="width: auto; height: 80%">';
        html += '           1340';
        html += '           </div>';
        html += '       </button>';
        html += '   </div>';
        html += '</div>';
    }

    return html;
}

function createDisplay() {
    var html = '';

    html += '<div class="create-ctn">';
    html += '<div class="create-main-ctn">';
    html += '   <div class="create-aside-ctn">';
    html += '        <img class="create-picture" src="static/img/lol2.JPG">';
    html += '   </div>';
    html += '   <div class="create-bside-ctn"></div>';
    html += '</div>';
    html += '<div class="create-footer-ctn"></div>';
    html += '</div>';

    return html;
}

function profileDisplay() {
    var html = '';

    html += '<div class="profile-ctn">';
    html += '<div class="profile-header">';
    html += '    <div class="profile-avatar-ctn">';
    html += '        <img class="profile-avatar" alt="Avatar" src="static/img/lol2.JPG">';
    html += '    </div>';
    html += '    <section class="profile-infos-ctn">';
    html += '        <div class="profile-username-ctn">';
    html += '            <a>';
    html += '                Garreth Verhelpen';
    html += '            </a>';
    html += '        </div>';
    html += '        <div class="profile-stats">';
    html += '            <li>';
    html += '                <span class="profile-stats-text">';
    html += '                    20';
    html += '                </span>';
    html += '                posts';
    html += '            </li>';
    html += '            <li>';
    html += '                <span class="profile-stats-text">';
    html += '                    2785';
    html += '                </span>';
    html += '                 followers';
    html += '            </li>';
    html += '            <li>';
    html += '                <span class="profile-stats-text">';
    html += '                    387';
    html += '                </span>';
    html += '                 following';
    html += '            </li>';
    html += '        </div>';
    html += '        <div class="profile-bio-ctn">';
    html += '            <h1 class="profile-bio-text">';
    html += '                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    html += '            </h1>';
    html += '        </div>';
    html += '    </section>';
    html += '</div>';
    html += '<div class="gallery-ctn">';

    for (let a = 0; a < 20; a++) {
        html += '    <div class="gallery-item">';
        html += '        <img class="gallery-image" src="static/img/lol.JPG">';
        html += '        <div class="gallery-item-infos" onclick="modalProfilePostDisplay()">';
        html += '            <img class="gallery-like" src="static/img/white-heart.png">';
        html += '            <a>';
        html += '                1500';
        html += '            </a>';
        html += '            <img class="gallery-comment" src="static/img/white-comment.png">';
        html += '            <a>';
        html += '                200';
        html += '            </a>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="gallery-item">';
        html += '        <img class="gallery-image" src="static/img/lol2.JPG">';
        html += '        <div class="gallery-item-infos" onclick="modalProfilePostDisplay()">';
        html += '            <img class="gallery-like" src="static/img/white-heart.png">';
        html += '                <a>';
        html += '                    1500';
        html += '                </a>';
        html += '            <img class="gallery-comment" src="static/img/white-comment.png">';
        html += '                <a>';
        html += '                    200';
        html += '                </a>';
        html += '        </div>';
        html += '    </div>';
    }
    html += '</div>';
    html += '</div>';

    return html;
}

function notifDisplay() {
    var html = "<p> Notifications </p>";

    return html;
}

function settingsDisplay() {
    var html = "<p> Settings </p>";

    return html;
}

function changePage(page) {
    const elem = document.getElementById('anim-center');
    
    elem.style.display = 'none';
    setAsFlex(elem);

    switch (page) {
        case 'home':
            elem.innerHTML = homeDisplay();
            changeLeftIcon(page + 'Icon');
            break;

        case 'create':
            elem.innerHTML = createDisplay();
            changeLeftIcon(page + 'Icon');
            break;

        case 'profile':
            elem.innerHTML = profileDisplay();
            changeLeftIcon(page + 'Icon');
            break;

        case 'notifications':
            elem.innerHTML = notifDisplay();
            changeLeftIcon(page + 'Icon');
            break;

        case 'settings':
            elem.innerHTML = settingsDisplay();
            changeLeftIcon(page + 'Icon');
            break;

        default:
            elem.innerHTML = homeDisplay();
            changeLeftIcon('homeIcon');
            break;
    }
}

changePage();

// function getContent(fragmentId, callback){
//     var pages = {
//       home: postDisplay(),
//       create: createDisplay(),
//       profile: profileDisplay(),
//       notifications: notifDisplay(),
//       settings: settingsDisplay()
//     };
  
//     callback(pages[fragmentId]);
// }

// function loadContent() {
//     var contentDiv = document.getElementById("anim-center"),
//         fragmentId = location.hash.substring(1);

//     contentDiv.style.display = "none";
//     changeLeftIcon(fragmentId + 'Icon');
//     setAsFlex(contentDiv);
  
//     getContent(fragmentId, function (content) {
//       contentDiv.innerHTML = content;
//     });

// }
  
// if(!location.hash) {
//     location.hash = "#home";
//     changeLeftIcon('homeIcon');
// }
  
// loadContent();
  
// window.addEventListener("hashchange", loadContent);