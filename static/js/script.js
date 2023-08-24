var like = 0;
var modal = 0;

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

function login(type) {
    if (modal == 0) {
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
    modal = !modal;
}