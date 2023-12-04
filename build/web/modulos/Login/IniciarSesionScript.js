
function validarLoginCentral() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

// URL del servicio REST
    let url = `http://localhost:8080/sicefa/api/inicioSesion/login?nombreUsuario=${user}&contrasenia=${password}`;

// Realizar la solicitud mediante fetch
    fetch(url)
            .then(response => {
                if (!response.ok) {
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                    console.log("El status de la respuesta no es OK");
                }
                return response.json();
            })
            .then(data => {
                // Manejar la respuesta JSON
                if (data.Mensaje === "usuario inexistente") {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario o contraseña incorrectos!"
                    });
                    
                    //alert("Usuario inexistente");
                } else if (data.Mensaje === "Contraseña incorrecta") {
                    //alert("Contraseña incorrecta");
                     Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario o contraseña incorrectos!"
                    });
                } else if (('ADMC') !== data.rolUsuario){
                   Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No tienes los permisos para ingresar a este sistema!"
                    });
                } else {
                    console.log('Usuario ingresado: '+data.rolUsuario);
                    window.location.href = '../SICEFACentral/InicioCentral/InicioCentral.html';
                    localStorage.setItem('rolUusario',data.rolUsuario);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                //alert('Ocurrió un error al procesar la solicitud.');
            });
}


function validarLoginSucursal() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

// URL del servicio REST
    let url = `http://localhost:8080/sicefa/api/inicioSesion/login?nombreUsuario=${user}&contrasenia=${password}`;

// Realizar la solicitud mediante fetch
    fetch(url)
            .then(response => {
                if (!response.ok) {
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                    console.log("El status de la respuesta no es OK");
                }
                return response.json();
            })
            .then(data => {
                // Manejar la respuesta JSON
                if (data.Mensaje === "usuario inexistente") {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario o contraseña incorrectos!"
                    });
                    //alert("Usuario inexistente");
                } else if (data.Mensaje === "Contraseña incorrecta") {
                    //alert("Contraseña incorrecta");
                     Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario o contraseña incorrectos!"
                    });
                } else if ( (('ADMS') !== data.rolUsuario) || (('EMPS') !== data.rolUsuario)) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No tienes los permisos para ingresar a este sistema!"
                    });
                }else {  // Usuario autenticado
                    window.location.href = '../SICEFASucursal/InicioSucursal/InicioSucursal.html';
                    localStorage.setItem('usuarioIniciado',data.rol);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                //alert('Ocurrió un error al procesar la solicitud.');
            });
}

function Llamar1() {
    fetch("modulos/SICEFACentral/InicioCentral/InicioCentral.html").then(
            function (data) {
                return data.text();
            }
    ).then(
            function (html) {
                document.getElementById("style").innerHTML = "<link href='FooterYBarraNav/FooterYBarraNavStyle.css' rel='stylesheet' type='text/css'/>";
                document.getElementById("style1").innerHTML = "<link href='modulos/SICEFACentral/InicioCentral/InicioCentral.css' rel='stylesheet' type='text/css'/>";
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}
function Llamar1_1() {
    fetch("modulos/SICEFASucursal/InicioSucursal/InicioSucursal.html").then(
            function (data) {
                return data.text();
            }
    ).then(
            function (html) {
                document.getElementById("style").innerHTML = "<link href='FooterYBarraNav/FooterYBarraNavStyle.css' rel='stylesheet' type='text/css'/>";
                document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/InicioSucursal/InicioSucursal.css' rel='stylesheet' type='text/css'/>";
                document.getElementById("contenedorPrincipal").innerHTML = html;
            }
    );
}
function Llamar2() {
    fetch("FooterYBarraNav/BarraNavegacionCentral.html").then(
            function (data) {
                return data.text();
            }
    ).then(
            function (html) {
                document.getElementById("barraNavegacion").innerHTML = html;
            }
    );
}
function Llamar2_1() {
    fetch("FooterYBarraNav/BarraNavegacion.html").then(
            function (data) {
                return data.text();
            }
    ).then(
            function (html) {
                document.getElementById("barraNavegacion").innerHTML = html;
            }
    );
}
function Llamar3() {
    fetch("FooterYBarraNav/Footer.html").then(
            function (data) {
                return data.text();
            }
    ).then(
            function (html) {
                document.getElementById("footer").innerHTML = html;
            }
    );
}
function Llamar3_1() {
    fetch("FooterYBarraNav/Footer.html").then(
            function (data) {
                return data.text();
            }
    ).then(
            function (html) {
                document.getElementById("footer").innerHTML = html;
            }
    );
}
function CambiarContrasena() {
    let newPassword;
    let verificarContrasena;
    newPassword = document.getElementById("txtNewPassword").value;
    verificarContrasena = document.getElementById("txtVerificarContrasena").value;
    for (let i = 0; i < empleados.length; i++) {
        if (user === empleados[i].usuario) {
            if (verificarContrasena === empleados[i].contrasena) {
                empleados[i].contrasena = newPassword;
                break;
            }
        }
    }
    console.log(empleados);
}

/*let empleados = [];
function validarLoginCentral2() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

    fetch('../SICEFASucursal/AdmEmpleados/Empleados.json').then(
            function (jsonText) {
                return jsonText.json();
            }
    ).then(
            function (jsonData) {
                empleados = jsonData;
                console.log(empleados);
                for (let i = 0; i < empleados.length; i++) {
                    if (empleados[i].usuario === user) {
                        if (empleados[i].contrasena === password) {
                            if ((empleados[i].puesto).toLowerCase() === "admin") {
                                window.location.href = '../SICEFACentral/InicioCentral/InicioCentral.html';
                                break;
                            } else {
                                alert("Lo sentimos, no cuentas con el rol de administrador");
                                break;
                            }
                        } else {
                            alert("El usuario y/o contraseña son incorrectos");
                            break;
                        }
                    } else if (i === empleados.length) {
                        alert("El usuario ingresado es incorrecto");
                    }
                }
            }
    );
}
 
 
/*
function validarLoginSucursal2() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
    fetch('../SICEFASucursal/AdmEmpleados/Empleados.json').then(
            function (jsonText) {
                return jsonText.json();
            }
    ).then(
            function (jsonData) {
                empleados = jsonData;
                console.log(empleados);
                for (let i = 0; i < empleados.length; i++) {
                    if (empleados[i].usuario === user) {
                        if (empleados[i].contrasena === password) {
                            window.location.href = '../SICEFASucursal/InicioSucursal/InicioSucursal.html';
                            break;
                        } else {
                            alert("El usuario y/o contraseña son incorrectos");
                            break;
                        }
                    } else if (i === empleados.length) {
                        alert("El usuario ingresado es incorrecto");
                    }
                }
            }
    );
}
 
 */