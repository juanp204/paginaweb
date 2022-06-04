var div_rutas = document.getElementById("div_rutas")
var div = document.createElement("div");
var fieldset1 = document.createElement("fieldset");
var label = document.createElement("label");
var fieldset2 = document.createElement("fieldset");
var btn = document.createElement("button");

fieldset1.appendChild(label)
fieldset2.appendChild(btn)
div.appendChild(fieldset1)
div.appendChild(fieldset2)
label.textContent="aaaaaaaaaaaaaaaa";
btn.textContent="Unirme";
btn.type="submit";

div_rutas.appendChild(div)