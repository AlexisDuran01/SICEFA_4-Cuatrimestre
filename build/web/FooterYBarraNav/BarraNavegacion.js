
function DirigirInicioCentral(){
    fetch("../Dashboard/vistaDashboard.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorDinamico").innerHTML = html;
        }
    );
}

function DirigirSucursalesCentral(){
    fetch("../AdmSucursales/vistaSucursal.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorDinamico").innerHTML = html;
                mostrarRegistrosSucursal();
        }
    );
}


function DirigirProductosCentral(){
    fetch("../AdmProductos/vistaProductos.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorDinamico").innerHTML = html;
            mostrarRegistrosProductos();
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
 fetch("../DashboardSucursal/vistaDashboardSucursal.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorDinamico").innerHTML = html;
        }
    );
}


function DirigirClientesSucursal(){
    fetch("../AdmClientes/vistaCliente.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorDinamico").innerHTML = html;
                mostrarRegistrosCliente();
        }
    );
}


function DirigirEmpleadosSucursal(){
    fetch("../AdmEmpleados/vistaEmpleado.html").then(
        function (data) {
            return data.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenedorDinamico").innerHTML = html;
           mostrarRegistrosEmpleado();        
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

function redirigirAIndex() {
    Swal.fire({
  title: "¿Estás seguro de cerrar sesión?",
  text: "Saldrás de tu usuario",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Aceptar"
}).then((result) => {
  if (result.isConfirmed) {
     window.location.href = "../../../index.html"; 
  }
}); 
}

DirigirInicioCentral();


