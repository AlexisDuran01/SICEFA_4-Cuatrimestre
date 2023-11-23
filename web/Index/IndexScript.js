// Inicio de funciones para mostrar/ocultar la barra de navegación
function mostrarOpciones() {
    let opciones = document.getElementById("lista");
    opciones.style.display = "block";
}
function ocultarOpciones() {
    let opciones = document.getElementById("lista");
    opciones.style.display = "none";
}
// Fin de funciones para mostrar/ocultar la barra de navegación

let moduloLogin;
function cargarLoginCentral() {
    fetch("modulos/Login/IniciarSesion.html").then(
            function (data){
                return data.text();
            }
    ).then(
        function (html) {
            document.getElementById("barraNavegacion").innerHTML = "";
            document.getElementById("style").innerHTML = "<link href='modulos/Login/IniciarSesionStyle.css' rel='stylesheet' type='text/css'/>";
            document.getElementById("contenedorPrincipal").innerHTML = html;
        }
    );
}
function cargarLoginSucursal() {
    fetch("modulos/Login/IniciarSesionSucursal.html").then(
            function (data){
                return data.text();
            }
    ).then(
        function (html) {
            document.getElementById("barraNavegacion").innerHTML = "";
            document.getElementById("style").innerHTML = "<link href='modulos/Login/IniciarSesionStyle.css' rel='stylesheet' type='text/css'/>";
            document.getElementById("contenedorPrincipal").innerHTML = html; 
        }
    );
}