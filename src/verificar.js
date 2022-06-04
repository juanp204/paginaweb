var cookies = document.cookie.trim().split(";");
var date = new Date();
date.setTime(date.getTime()+(24*60*60*1000));
var expira = "expires="+date.toUTCString();
function getCookie(nombre="usuario="){
    for (var i=0; i<cookies.length; i++){
        var c = cookies[i].trim();
        if (c.indexOf(nombre)==0){
            return c.substring(nombre.length, c.length);
        }
    }
    return null;
}
var cook = getCookie();
console.log(cook)


if (cook == null | cook == "null"){
    //document.write(filehanle);
    console.log("if null")
    fetch(`/barrasinse`)
    .then( data => data.text())
    .then( fichero => document.write(fichero));
    //document.cookie=`usuario=null;${expira};`;
}