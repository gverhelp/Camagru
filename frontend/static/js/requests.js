export async function getPost(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        return this.responseText;
    }
    xmlhttp.open("GET","getuser.php?id=" + id, true);
    xmlhttp.send();
}