var toggleTheme = 0;

function switchTheme() {
    let btn = document.getElementById('switchTheme-icon');

    if (toggleTheme == 0) {
        document.documentElement.style.setProperty('--bg-color', 'rgb(21, 32, 43)');
        document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--main-color', 'rgb(55, 68, 77)');

        btn.setAttribute("src", "static/img/sun-empty.svg");
        btn.style.filter = "invert(100%) sepia(95%) saturate(20%) hue-rotate(275deg) brightness(104%) contrast(105%)";
    } else {
        document.documentElement.style.setProperty('--bg-color', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--text-color', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--main-color', 'rgb(230, 230, 230)');

        btn.setAttribute("src", "static/img/moon-empty.svg");
        btn.removeAttribute('style');
    }
    toggleTheme = !toggleTheme;
}