let empleados = [];
function validarLoginCentral() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
    fetch('modulos/SICEFASucursal/AdmEmpleados/Empleados.json').then(
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
                            Llamar1();
                            Llamar2();
                            Llamar3();
                            break;
                        } else {
                            alert("Lo sentimos, no cuentas con el rol de administrador");
                            break;
                        }
                    } else {
                        alert("El usuario y/o contraseña son incorrectos");
                        break;
                    }
                }else if(i === empleados.length){
                    alert("El usuario ingresado es incorrecto");
                } 
            }
        }
    );
}
function validarLoginSucursal() {
    let user = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;
    fetch('modulos/SICEFASucursal/AdmEmpleados/Empleados.json').then(
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
                        Llamar1_1();
                        Llamar2_1();
                        Llamar3_1();
                        break;
                    } else {
                        alert("El usuario y/o contraseña son incorrectos");
                        break;
                    }
                }else if(i === empleados.length){
                    alert("El usuario ingresado es incorrecto");
                }
            }
        }
    );
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
function CambiarContrasena(){
    let newPassword;
    let verificarContrasena;
    newPassword = document.getElementById("txtNewPassword").value;
    verificarContrasena = document.getElementById("txtVerificarContrasena").value;
    for (let i = 0; i < empleados.length; i++) {
        if(user === empleados[i].usuario){
            if (verificarContrasena === empleados[i].contrasena) {  
                empleados[i].contrasena = newPassword;
                break;
            }
        }
    }
    console.log(empleados);
}