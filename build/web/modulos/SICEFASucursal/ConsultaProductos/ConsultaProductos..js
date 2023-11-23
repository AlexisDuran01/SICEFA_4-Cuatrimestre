//Consulta de productos
let indexProductosSeleccionado; // Almacena el índice del producto seleccionado.
let productos = [];  // Arreglo para almacenar los datos de los productos.
let historialBusqueda = new Set(); // Utilizar un Set para evitar duplicados

// Cargar datos de productos desde un archivo JSON
fetch("modulos/SICEFASucursal/ConsultaProductos/ConsultaProductos.json")
    .then(response => {
        return response.json(); // Cargar los datos JSON de la respuesta.
    })
    .then(function (jsondata) {
        productos = jsondata; // Asignar los datos de los productos al arreglo.
    });

function filtrarProductosConsulta() { 
    let textoBusqueda = document.getElementById("txtBusquedaProducto").value.toLowerCase();
    let productosFiltrados = [];

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        if (
            producto.nombreProducto.toLowerCase().includes(textoBusqueda) ||
            producto.nombreGenerico.toLowerCase().includes(textoBusqueda) ||
            producto.formaFarmaceutica.toLowerCase().includes(textoBusqueda) ||
            producto.unidadMedida.toLowerCase().includes(textoBusqueda) ||
            producto.presentacion.toLowerCase().includes(textoBusqueda) ||
            producto.unidadesEnvase.toLowerCase().includes(textoBusqueda) ||
            producto.precioUnitario.toString().includes(textoBusqueda) ||
            producto.codigoBarras.toLowerCase().includes(textoBusqueda) 
        ) {
            productosFiltrados.push(producto);
        }
    }

    document.getElementById("tblProductos").innerHTML = "";

    productosFiltrados.forEach(function (producto) {
        let registro =
            '<tr>' +
            '<td>' + producto.nombreProducto + '</td>' +
            '<td>' + producto.nombreGenerico + '</td>' +
            '<td>' + producto.formaFarmaceutica + '</td>' +
            '<td>' + producto.unidadMedida + '</td>' +
            '<td>' + producto.presentacion + '</td>' +
            '<td>' + producto.unidadesEnvase + '</td>' +
            '<td>' + producto.precioUnitario + '</td>' +
            '<td>' + producto.estatusProducto + '</td>' +
            '<td>' + producto.codigoBarras + '</td>' +
            '</tr>';
        document.getElementById("tblProductos").innerHTML += registro;

        // Agregar el producto al historial utilizando el Set
        historialBusqueda.add(producto);
    });
}

// Función para cargar el historial en la tabla
function cargarHistorial() {
    document.getElementById("tblProductos").innerHTML = "";

    historialBusqueda.forEach(function (producto) {
        let registro =
            '<tr>' +
            '<td>' + producto.nombreProducto + '</td>' +
            '<td>' + producto.nombreGenerico + '</td>' +
            '<td>' + producto.formaFarmaceutica + '</td>' +
            '<td>' + producto.unidadMedida + '</td>' +
            '<td>' + producto.presentacion + '</td>' +
            '<td>' + producto.unidadesEnvase + '</td>' +
            '<td>' + producto.precioUnitario + '</td>' +
            '<td>' + producto.estatusProducto + '</td>' +
            '<td>' + producto.codigoBarras + '</td>' +
            '</tr>';
        document.getElementById("tblProductos").innerHTML += registro;
    });
}