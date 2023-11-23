let indexCompraSeleccionado;
let compras = [];

fetch("modulos/SICEFASucursal/AdmPedidos/Pedidos.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            compras = jsondata;
            cargarTablaPedidos();
        });

function addCompra() {
    let idCompra="RF05",
            nombreProducto,
            sucursal,
            empleado,
            cantidadCompra,
            precioUnitario,
            fechaCompra,
            horaCompra;

    idCompra = document.getElementById("txtIdCompra").value;
    nombreProducto = document.getElementById("txtProductos").value;
    sucursal = document.getElementById("txtIdSucursal").value;
    empleado = document.getElementById("txtIdEmpleado").value;
    cantidadCompra = document.getElementById("txtCantidad").value;
    precioUnitario = document.getElementById("txtPrecio").value;
    fechaCompra = document.getElementById("txtFechaRegistro").value;
    horaCompra = document.getElementById("txtHoraRegistro").value;

    let compra = {
        idCompra,
        nombreProducto,
        sucursal,
        empleado,
        cantidadCompra,
        precioUnitario,
        fechaCompra,
        horaCompra
    };
    compras.push(compra);
    cleanPedidos();
    cargarTablaPedidos();
}

function cargarTablaPedidos() {
    let cuerpo = "";
    compras.forEach(function (compra) {
        let registro =
                '<tr onclick="selectCompra(' + compras.indexOf(compra) + ');">' +
                '<td>' + compra.idCompra + '</td>' +
                '<td>' + compra.fechaCompra + '</td>' +
                '<td> ' + compra.precioUnitario + '</td>' +
                '<td>' + compra.nombreProducto + '</td>' +
                '<td>' + compra.cantidadCompra + '</td>' +
                '<td>' + compra.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblCompras").innerHTML = cuerpo;
}

function selectCompra(index) {
    indexCompraSeleccionado = index;
    let compra = compras[index];
    document.getElementById("txtIdCompra").value = compra.idCompra;
    document.getElementById("txtProductos").value = compra.nombreProducto;
    document.getElementById("txtIdSucursal").value = compra.sucursal;
    document.getElementById("txtIdEmpleado").value = compra.empleado;
    document.getElementById("txtCantidad").value = compra.cantidadCompra;
    document.getElementById("txtPrecio").value = compra.precioUnitario;
    document.getElementById("txtFechaRegistro").value = compra.fechaCompra;
    document.getElementById("txtHoraRegistro").value = compra.horaCompra;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexEmpleadoSeleccionado = index;
}

function cleanPedidos() {
    document.getElementById("txtIdCompra").value = "";
    document.getElementById("txtProductos").value = "";
    document.getElementById("txtIdSucursal").value = "";
    ;
    document.getElementById("txtIdEmpleado").value = "";
    document.getElementById("txtCantidad").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtFechaRegistro").value = "";
    document.getElementById("txtHoraRegistro").value = "";

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexCompraSeleccionado = 0;
}

function updateCompra() {
    let {
        idCompra,
        nombreProducto,
        sucursal,
        empleado,
        cantidadCompra,
        precioUnitario,
        fechaCompra,
        horaCompra
    } = getFormValuesPedidos();

    let compra = {
        idCompra,
        nombreProducto,
        sucursal,
        empleado,
        cantidadCompra,
        precioUnitario,
        fechaCompra,
        horaCompra,
        estatus: "Activo"
    };

    compras[indexCompraSeleccionado] = compra;
    cleanPedidos();
    cargarTablaPedidos();
}

function deleteCompra() {
    compras[indexCompraSeleccionado].estatus = "Inactivo";
    cleanPedidos();
    cargarTablaPedidos();
}

function getFormValuesPedidos() {
    let  idCompra = document.getElementById("txtIdCompra").value;
    let nombreProducto = document.getElementById("txtProductos").value;
    let sucursal = document.getElementById("txtIdSucursal").value;
    let empleado = document.getElementById("txtIdEmpleado").value;
    let cantidadCompra = document.getElementById("txtCantidad").value;
    let precioUnitario = document.getElementById("txtPrecio").value;
    let fechaCompra = document.getElementById("txtFechaRegistro").value;
    let horaCompra = document.getElementById("txtHoraRegistro").value;


    return {
        idCompra,
        nombreProducto,
        sucursal,
        empleado,
        cantidadCompra,
        precioUnitario,
        fechaCompra,
        horaCompra
    };
}


function filtrarCompras() {
    let textoBusqueda = document.getElementById("txtBusquedaCompra").value.toLowerCase();
    let comprasFiltrados = [];

    for (let i = 0; i < compras.length; i++) {
        let compra = compras[i];
        if (
                compra.fechaCompra.toLowerCase().includes(textoBusqueda) ||
                compra.nombreProducto.includes(textoBusqueda) ||
                compra.estatus.toLowerCase().includes(textoBusqueda)
                ) {
            comprasFiltrados.push(compra);
        }
    }

    // Limpia la tabla antes de cargar los datos filtrados
    document.getElementById("tblCompras").innerHTML = "";

    // Carga las compras filtrados en la tabla
    comprasFiltrados.forEach(function (compra) {
        let registro =
                '<tr onclick="selectCompra(' + compras.indexOf(compra) + ');">' +
                '<td>' + compra.idCompra + '</td>' +
                '<td>' + compra.fechaCompra + '</td>' +
                '<td> ' + compra.precioUnitario + '</td>' +
                '<td>' + compra.nombreProducto + '</td>' +
                '<td>' + compra.cantidadCompra + '</td>' +
                '<td>' + compra.estatus + '</td></tr>';

        document.getElementById("tblCompras").innerHTML += registro;
    });
}