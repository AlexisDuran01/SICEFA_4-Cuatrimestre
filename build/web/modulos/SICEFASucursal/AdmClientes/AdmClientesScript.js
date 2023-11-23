let indexClienteSeleccionado;
let clientes = [];

// Cargar datos de clientes desde un archivo JSON

fetch("modulos/SICEFASucursal/AdmClientes/Clientes.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        clientes = jsondata;
        loadTablaClientes();
    });

function addCliente()
// Obtener valores de los campos de entrada
{
    let numero_unico_cliente,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        rfc,
        curp,
        domicilio,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        colonia,
        correo_electronico,
        estatus,
        fecha_ingreso;

    numero_unico_cliente = document.getElementById("txtNumUnico").value;
    nombre = document.getElementById("txtNombre").value;
    apellido_paterno = document.getElementById("txtApePaterno").value;
    apellido_materno = document.getElementById("txtApeMaterno").value;
    genero = document.getElementById("txtGenero").value;
    fecha_nacimiento = document.getElementById("fechaNacimiento").value;
    rfc = document.getElementById("txtRfc").value;
    curp = document.getElementById("CURP").value;
    domicilio = document.getElementById("domicilio").value;
    codigo_postal = document.getElementById("codigoPostal").value;
    ciudad = document.getElementById("ciudad").value;
    estado = document.getElementById("estado").value;
    telefono = document.getElementById("txtTelefono").value;
    correo_electronico = document.getElementById("txtCorreo").value;
    colonia = document.getElementById("txtColonia").value;
    fecha_ingreso = document.getElementById("fechaIngreso").value;


    let cliente = {
        // Crear un objeto cliente
        numero_unico_cliente,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        rfc,
        curp,
        domicilio,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        correo_electronico,
        estatus: "Activo",
        colonia,
        fecha_ingreso
    };
    // Agregar el cliente al arreglo y actualizar la tabla
    clientes.push(cliente);
    cleanClientes();
    loadTablaClientes();
}

function loadTablaClientes() {

    // Cargar la tabla con los datos de los clientes

    let cuerpo = "";
    clientes.forEach(function (cliente) {
        let registro =
            '<tr onclick="selectCliente(' + clientes.indexOf(cliente) + ');">' +
            '<td>' + cliente.nombre + '</td>' +
            '<td>' + cliente.apellido_paterno + ' ' + cliente.apellido_materno + '</td>' +
            '<td>' + cliente.genero + '</td>' +
            '<td>' + cliente.telefono + '</td>' +
            '<td>' + cliente.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblClientes").innerHTML = cuerpo;
}

function selectCliente(index) {
    // Seleccionar un cliente para editar
    indexClienteSeleccionado = index;
    let cliente = clientes[index];
    document.getElementById("txtNumUnico").value = cliente.numero_unico_cliente;
    document.getElementById("txtNombre").value = cliente.nombre;
    document.getElementById("txtApePaterno").value = cliente.apellido_paterno;
    document.getElementById("txtApeMaterno").value = cliente.apellido_materno;
    document.getElementById("txtGenero").value = cliente.genero;
    document.getElementById("fechaNacimiento").value = cliente.fecha_nacimiento;
    document.getElementById("txtRfc").value = cliente.rfc;
    document.getElementById("CURP").value = cliente.curp;
    document.getElementById("domicilio").value = cliente.domicilio;
    document.getElementById("codigoPostal").value = cliente.codigo_postal;
    document.getElementById("ciudad").value = cliente.ciudad;
    document.getElementById("estado").value = cliente.estado;
    document.getElementById("txtTelefono").value = cliente.telefono;
    document.getElementById("txtCorreo").value = cliente.correo_electronico;
    document.getElementById("txtColonia").value = cliente.colonia;
    document.getElementById("fechaIngreso").value = cliente.fecha_ingreso;

    indexClienteSeleccionado = index;
}

function cleanClientes() {
    // Limpiar los campos de entrada
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApePaterno").value = "";
    document.getElementById("txtApeMaterno").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("txtRfc").value = "";
    document.getElementById("CURP").value = "";
    document.getElementById("domicilio").value = "";
    document.getElementById("codigoPostal").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtNombre").focus();
    document.getElementById("fechaIngreso").value = "";
    indexClienteSeleccionado = 0;
}

function updateCliente() {
    let {
        //Actualiza el cliente por si algún campo fue llenado de manera érronea
        numero_unico_cliente,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        rfc,
        curp,
        domicilio,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        correo_electronico,
        colonia,
        fecha_ingreso
    } = getFormValues();

    let cliente = {
        numero_unico_cliente,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        rfc,
        curp,
        domicilio,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        correo_electronico,
        colonia,
        fecha_ingreso,
        estatus: "Activo"
    };

    clientes[indexClienteSeleccionado] = cliente;
    cleanClientes();
    loadTablaClientes();
}

function deleteCliente() {
    //Cambia el estado del cliente a inactivo 
    clientes[indexClienteSeleccionado].estatus = "Inactivo";
    cleanClientes();
    loadTablaClientes();
}

function getFormValues() {
    //Obtiene los valores mediantes sus ID, todos son recabados através del formato 
    let numero_unico_cliente = document.getElementById("txtNumUnico").value;
    let nombre = document.getElementById("txtNombre").value;
    let apellido_paterno = document.getElementById("txtApePaterno").value;
    let apellido_materno = document.getElementById("txtApeMaterno").value;
    let genero = document.getElementById("txtGenero").value;
    let fecha_nacimiento = document.getElementById("fechaNacimiento").value;
    let rfc = document.getElementById("txtRfc").value;
    let curp = document.getElementById("CURP").value;
    let domicilio = document.getElementById("domicilio").value;
    let codigo_postal = document.getElementById("codigoPostal").value;
    let ciudad = document.getElementById("ciudad").value;
    let estado = document.getElementById("estado").value;
    let telefono = document.getElementById("txtTelefono").value;
    let correo_electronico = document.getElementById("txtCorreo").value;
    let colonia = document.getElementById("txtColonia").value;
    let fecha_ingreso = document.getElementById("fechaIngreso").value;

    // Regresando cada uno de los valores capturados

    return {
        numero_unico_cliente,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        rfc,
        curp,
        domicilio,
        codigo_postal,
        ciudad,
        estado,
        telefono,
        colonia,
        correo_electronico,
        fecha_ingreso
    };
}


function filtrarClientes() {

    //Esta funcion filtra mediante un ciclo for los que contiene en el archivo JSON
    //Buscando cuelqquier incidencia que pueda encontrar mostrandola en la tabla de resultados
    //Utilizando el operador logíco OR para una pronta búsqueda

    let textoBusqueda = document.getElementById("txtBusquedaCliente").value.toLowerCase();
    let clientesFiltrados = [];

    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (
            cliente.nombre.toLowerCase().includes(textoBusqueda) ||
            cliente.apellido_paterno.toLowerCase().includes(textoBusqueda) ||
            cliente.apellido_materno.toLowerCase().includes(textoBusqueda) ||
            cliente.genero.toLowerCase().includes(textoBusqueda) ||
            cliente.telefono.includes(textoBusqueda) ||
            cliente.estatus.toLowerCase().includes(textoBusqueda)
        ) {
            clientesFiltrados.push(cliente);
        }
    }

    // Limpia la tabla antes de cargar los datos filtrados
    document.getElementById("tblClientes").innerHTML = "";

    // Carga los clientes filtrados en la tabla
    clientesFiltrados.forEach(function (cliente) {
        let registro =
            '<tr onclick="selectCliente(' + clientes.indexOf(cliente) + ');">' +
            '<td>' + cliente.nombre + '</td>' +
            '<td>' + cliente.apellido_paterno + ' ' + cliente.apellido_materno + '</td>' +
            '<td>' + cliente.genero + '</td>' +
            '<td>' + cliente.telefono + '</td>' +
            '<td>' + cliente.estatus + '</td></tr>';
        document.getElementById("tblClientes").innerHTML += registro;
    });
}