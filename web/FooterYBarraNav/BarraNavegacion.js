function DirigirInicioCentral(){
    fetch("modulos/SICEFACentral/InicioCentral/InicioCentral.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFACentral/InicioCentral/InicioCentral.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirSucursalesCentral(){
    fetch("modulos/SICEFACentral/AdmSucursales/vistaSucursal.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFACentral/AdmSucursales/AdmSucursalesStyle.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirProductosCentral(){
    fetch("modulos/SICEFACentral/AdmProductos/AdmProductos.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFACentral/AdmProductos/AdmProductos.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirPedidosCentral(){
    fetch("modulos/SICEFACentral/AdmPedidos/AdmPedidos.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFACentral/AdmPedidos/AdmPedidos.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirInicioSucursal(){
    fetch("modulos/SICEFASucursal/InicioSucursal/InicioSucursal.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/InicioSucursal/InicioSucursal.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirClientesSucursal(){
    fetch("modulos/SICEFASucursal/AdmClientes/vistaCliente.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/AdmClientes/AdmClientesStyle.css' type='text/css' rel='stylesheet'  id='style1'/>";
        }
    );
}


function DirigirEmpleadosSucursal(){
    fetch("modulos/SICEFASucursal/AdmEmpleados/vistaEmpleado.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/AdmEmpleados/AdmEmpleados.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirProductosSucursal(){
    fetch("modulos/SICEFASucursal/ConsultaProductos/ConsultaProductos.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/ConsultaProductos/ConsultaProductos.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirPedidosSucursal(){
    fetch("modulos/SICEFASucursal/AdmPedidos/AdmPedidos.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/AdmPedidos/AdmPedidos.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}


function DirigirVentasSucursal(){
    fetch("modulos/SICEFASucursal/AdmVentas/AdmVentas.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorPrincipal").innerHTML = html;
            document.getElementById("style1").innerHTML = "<link href='modulos/SICEFASucursal/AdmVentas/AdmVentas.css' rel='stylesheet' type='text/css' id='style1'/>";
        }
    );
}