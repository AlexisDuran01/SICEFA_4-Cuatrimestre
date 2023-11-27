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

function cargarLoginCentral() {
  let boton = document.getElementById('central');
  boton.addEventListener('click', function() {
    window.location.href = 'modulos/Login/IniciarSesion.html';
  });
}

function cargarLoginSucursal() {
  let boton = document.getElementById('sucursal');
  boton.addEventListener('click', function() {
    window.location.href = 'modulos/Login/IniciarSesionSucursal.html';
  });
}

cargarLoginCentral();
cargarLoginSucursal();