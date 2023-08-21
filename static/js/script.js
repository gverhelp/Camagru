function changeFilter(hover) {
    if (hover == 1) {
        document.getElementById('google').style.filter = "invert(18%) sepia(95%) saturate(3630%) hue-rotate(305deg) brightness(74%) contrast(100%)";
    }
    else {
        document.getElementById('google').style.filter = "invert(0%) sepia(3%) saturate(27%) hue-rotate(55deg) brightness(93%) contrast(100%)";
    }
}