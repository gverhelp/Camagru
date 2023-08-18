function changeFilter(hover) {
    if (hover == 1) {
        document.getElementById('google').style.filter = "invert(16%) sepia(86%) saturate(5440%) hue-rotate(291deg) brightness(103%) contrast(116%)";
    }
    else {
        document.getElementById('google').style.filter = "invert(0%) sepia(3%) saturate(27%) hue-rotate(55deg) brightness(93%) contrast(100%)";
    }
}