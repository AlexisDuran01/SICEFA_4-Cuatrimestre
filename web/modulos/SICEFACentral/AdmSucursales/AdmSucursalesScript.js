let indexSucursalSeleccionado;
let sucursales = [];

fetch("modulos/SICEFACentral/AdmSucursales/Sucursales.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        sucursales = jsondata;
        loadTablaSucursales();
    });

function addSucursal() {
    let nombreSucursal = document.getElementById("txtNombreSucursal").value;
    let nombreTitular = document.getElementById("txtNombreTitular").value;
    let rfcTitular = document.getElementById("txtRfcTitular").value;
    let domicilio = document.getElementById("txtDomicilio").value;
    let colonia = document.getElementById("txtColonia").value;
    let codigo_postal = document.getElementById("txtCodigoPostal").value;
    let ciudad = document.getElementById("txtCiudad").value;
    let estado = document.getElementById("txtEstado").value;
    let telefono = document.getElementById("txtTelefono").value;
    let latitud = document.getElementById("txtLatitud").value;
    let longitud = document.getElementById("txtLongitud").value;

    let sucursal = {
        nombreSucursal,
        nombreTitular,
        rfcTitular,
        domicilio,
        colonia,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        latitud,
        longitud,
        estatus: "Activo"
    };

    sucursales.push(sucursal);
    cleanSucursales();
    loadTablaSucursales();
}

function loadTablaSucursales() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal, index) {
        let registro =
                '<tr onclick="selectSucursal(' + index + ');">' +
                '<td>' + sucursal.nombreSucursal + '</td>' +
                '<td>' + sucursal.nombreTitular + '</td>' +
                '<td>' + sucursal.longitud + '</td>' +
                '<td>' + sucursal.latitud + '</td>' +
                '<td onclick="toggleEstatus(' + index + ');">' + sucursal.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}



function selectSucursal(index) {
    indexSucursalSeleccionado = index;
    let sucursal = sucursales[index];
    document.getElementById("txtNombreSucursal").value = sucursal.nombreSucursal;
    document.getElementById("txtNombreTitular").value = sucursal.nombreTitular;
    document.getElementById("txtRfcTitular").value = sucursal.rfcTitular;
    document.getElementById("txtDomicilio").value = sucursal.domicilio;
    document.getElementById("txtColonia").value = sucursal.colonia;
    document.getElementById("txtCiudad").value = sucursal.ciudad;
    document.getElementById("txtEstado").value = sucursal.estado;
    document.getElementById("txtCodigoPostal").value = sucursal.codigo_postal;
    document.getElementById("txtTelefono").value = sucursal.telefono;
    document.getElementById("txtLatitud").value = sucursal.latitud;
    document.getElementById("txtLongitud").value = sucursal.longitud; // Se mantiene en su lugar
}

function cleanSucursales() {
    document.getElementById("txtNombreSucursal").value = "";
    document.getElementById("txtNombreTitular").value = "";
    document.getElementById("txtRfcTitular").value = "";
    document.getElementById("txtDomicilio").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtCodigoPostal").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtLatitud").value = "";
    document.getElementById("txtLongitud").value = "";
    indexSucursalSeleccionado = 0;
}

// Resto del código JavaScript con correcciones
// ...

function updateSucursal() {
    let {
        nombreSucursal,
        nombreTitular,
        rfcTitular,
        domicilio,
        colonia,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        latitud,
        longitud
    } = getFormValuesSucursales();

    let sucursal = {
        nombreSucursal,
        nombreTitular,
        rfcTitular,
        domicilio,
        colonia,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        latitud,
        longitud,
        estatus: "Activo" // Mantener el estado actual
    };

    sucursales[indexSucursalSeleccionado] = sucursal;
    cleanSucursales();
    loadTablaSucursales();
}


function deleteSucursal() {
    // Cambia el estado de la sucursal a inactivo 
    sucursales[indexSucursalSeleccionado].estatus = "Inactivo";
    cleanSucursales();
    loadTablaSucursales();
}

function activateSucursal(index) {
    sucursales[index].estatus = "Activo";
    loadTablaSucursales();
}



// Resto del código JavaScript con correcciones

function getFormValuesSucursales() {
    let nombreSucursal = document.getElementById("txtNombreSucursal").value;
    let nombreTitular = document.getElementById("txtNombreTitular").value;
    let rfcTitular = document.getElementById("txtRfcTitular").value;
    let domicilio = document.getElementById("txtDomicilio").value;
    let colonia = document.getElementById("txtColonia").value;
    let ciudad = document.getElementById("txtCiudad").value;
    let estado = document.getElementById("txtEstado").value;
    let codigo_postal = document.getElementById("txtCodigoPostal").value;
    let telefono = document.getElementById("txtTelefono").value;
    let latitud = document.getElementById("txtLatitud").value; // Obtener valor directamente
    let longitud = document.getElementById("txtLongitud").value; // Obtener valor directamente

    return {
        nombreSucursal,
        nombreTitular,
        rfcTitular,
        domicilio,
        colonia,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        latitud,
        longitud
    };
}




function filtrarSucursal() {

//Esta funcion filtra mediante un ciclo for los que contiene en el archivo JSON
//Buscando cuelqquier incidencia que pueda encontrar mostrandola en la tabla de resultados
//Utilizando el operador logíco OR para una pronta búsqueda

    let textoBusqueda = document.getElementById("txtBusquedaSucursal").value.toLowerCase();
    let sucursalesFiltradas = [];

    for (let i = 0; i < sucursales.length; i++) {
        let sucursal = sucursales[i];
        if (
            sucursal.nombreSucursal.toLowerCase().includes(textoBusqueda) ||
            sucursal.nombreTitular.toLowerCase().includes(textoBusqueda) ||
            sucursal.colonia.toLowerCase().includes(textoBusqueda) ||
            sucursal.estatus.toLowerCase().includes(textoBusqueda)
        ) {
            sucursalesFiltradas.push(sucursal);
        }
    }

    // Limpia la tabla antes de cargar los datos filtrados
    document.getElementById("tblSucursal").innerHTML = "";

    // Carga las sucursales filtradas en la tabla
    sucursalesFiltradas.forEach(function (sucursal) {
        let registro =
            '<tr onclick="selectSucursal(' + sucursales.indexOf(sucursal) + ');">' +
            '<td>' + sucursal.nombreSucursal + '</td>' +
            '<td>' + sucursal.nombreTitular + '</td>' +
            '<td>' + sucursal.longitud + '</td>' +
            '<td>' + sucursal.latitud + '</td>' +
            '<td onclick="toggleEstatus(' + sucursales.indexOf(sucursal) + ');">' + sucursal.estatus + '</td></tr>';
        document.getElementById("tblSucursal").innerHTML += registro;
    });
}