let indexEmpleadoSeleccionado;
let Empleados = [];
fetch("modulos/SICEFASucursal/AdmEmpleados/Empleados.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            Empleados = jsondata;
            cargarTablaEmpleados();
        });
function addEmpleado() {
    let id,
            nombre,
            apellido_paterno,
            apellido_materno,
            genero,
            rfc,
            fecha_nacimiento,
            curp,
            domicilio,
            codigo_Postal,
            ciudad,
            estado,
            telefono,
            fecha_contratacion,
            puesto,
            correo_electronico,
            sueldo;

    id = document.getElementById("txtIdEmpleado").value;
    nombre = document.getElementById("txtNombre").value;
    apellido_paterno = document.getElementById("txtApePaterno").value;
    apellido_materno = document.getElementById("txtApeMaterno").value;
    genero = document.getElementById("txtGenero").value;
    rfc = document.getElementById("txtRFC").value;
    fecha_nacimiento = document.getElementById("txtFechaNac").value;
    curp = document.getElementById("txtCURP").value;
    domicilio = document.getElementById("txtDomicilio").value;
    codigo_Postal = document.getElementById("txtCP").value;
    ciudad = document.getElementById("txtCiudad").value;
    estado = document.getElementById("txtEstado").value;
    telefono = document.getElementById("txtTelefono").value;
    fecha_contratacion = document.getElementById("txtFechaIngreso").value;
    puesto = document.getElementById("txtPuesto").value;
    correo_electronico = document.getElementById("txtCorreo").value;
    sueldo = document.getElementById("txtSalario").value;

    let empleado = {
        id,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        rfc,
        fecha_nacimiento,
        curp,
        domicilio,
        codigo_Postal,
        ciudad,
        estado,
        telefono,
        fecha_contratacion,
        puesto,
        correo_electronico,
        sueldo
    };
    Empleados.push(empleado);
    cleanEmpleados();
    cargarTablaEmpleados();
}

function cargarTablaEmpleados() {
    let cuerpo = "";
    Empleados.forEach(function (empleado) {
        let registro =
                '<tr onclick="selectEmpledo(' + Empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombre + '</td>' +
                '<td>' + empleado.apellido_paterno + ' ' + empleado.apellido_materno + '</td>' +
                '<td>' + empleado.genero + '</td>' +
                '<td>' + empleado.telefono + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML=cuerpo;
}

function selectEmpledo(index) {
    indexEmpleadoSeleccionado = index;
    let empleado = Empleados[index];
    document.getElementById("txtIdEmpleado").value = empleado.id;
    document.getElementById("txtNombre").value = empleado.nombre;
    document.getElementById("txtApePaterno").value = empleado.apellido_paterno;
    document.getElementById("txtApeMaterno").value = empleado.apellido_materno;
    document.getElementById("txtGenero").value = empleado.genero;
    document.getElementById("txtFechaNac").value = empleado.fecha_nacimiento;
    document.getElementById("txtRFC").value = empleado.rfc;
    document.getElementById("txtCURP").value = empleado.curp;
    document.getElementById("txtDomicilio").value = empleado.domicilio;
    document.getElementById("txtCP").value = empleado.codigo_Postal;
    document.getElementById("txtCiudad").value = empleado.ciudad;
    document.getElementById("txtEstado").value = empleado.estado;
    document.getElementById("txtTelefono").value = empleado.telefono;
    document.getElementById("txtCorreo").value = empleado.correo_electronico;
    document.getElementById("txtFechaIngreso").value = empleado.fecha_contratacion;
    document.getElementById("txtPuesto").value = empleado.puesto;
    document.getElementById("txtCorreo").value = empleado.correo_electronico;
    document.getElementById("txtSalario").value = empleado.sueldo;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexEmpleadoSeleccionado = index;
}


function cleanEmpleados() {
    document.getElementById("txtIdEmpleado").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApePaterno").value = "";
    document.getElementById("txtApeMaterno").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtFechaNac").value = "";
    document.getElementById("txtCURP").value = "";
    document.getElementById("txtDomicilio").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtFechaIngreso").value = "";
    document.getElementById("txtPuesto").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtSalario").value = "";

    document.getElementById("txtNombre").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexEmpleadoSeleccionado = 0;
}

function updateEmpleado() {
    let {
        id,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        rfc,
        fecha_nacimiento,
        curp,
        domicilio,
        codigo_Postal,
        ciudad,
        estado,
        telefono,
        fecha_contratacion,
        puesto,
        correo_electronico,
        sueldo
    } = getFormValuesEmpleados();

    let empleado = {
        id,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        rfc,
        fecha_nacimiento,
        curp,
        domicilio,
        codigo_Postal,
        ciudad,
        estado,
        telefono,
        fecha_contratacion,
        puesto,
        correo_electronico,
        sueldo,
        estatus: "Activo"
    };

    Empleados[indexEmpleadoSeleccionado] = empleado;
    cleanEmpleados();
    cargarTablaEmpleados();
}

function deleteEmpleado() {
    Empleados[indexEmpleadoSeleccionado].estatus = "Inactivo";
    cleanEmpleados();
    cargarTablaEmpleados();
}

function getFormValuesEmpleados() {
    let id = document.getElementById("txtIdEmpleado").value;
    let nombre = document.getElementById("txtNombre").value;
    let apellido_paterno = document.getElementById("txtApePaterno").value;
    let apellido_materno = document.getElementById("txtApeMaterno").value;
    let genero = document.getElementById("txtGenero").value;
    let fecha_nacimiento = document.getElementById("txtFechaNac").value;
    let rfc = document.getElementById("txtRFC").value;
    let curp = document.getElementById("txtCURP").value;
    let domicilio = document.getElementById("txtDomicilio").value;
    let codigo_Postal = document.getElementById("txtCP").value;
    let ciudad = document.getElementById("txtCiudad").value;
    let estado = document.getElementById("txtEstado").value;
    let telefono = document.getElementById("txtTelefono").value;
    let correo_electronico = document.getElementById("txtCorreo").value;
    let fecha_contratacion = document.getElementById("txtFechaIngreso").value;
    let puesto = document.getElementById("txtPuesto").value;
    let sueldo = document.getElementById("txtSalario").value;

    return {
        id,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        rfc,
        fecha_nacimiento,
        curp,
        domicilio,
        codigo_Postal,
        ciudad,
        estado,
        telefono,
        fecha_contratacion,
        puesto,
        correo_electronico,
        sueldo
    };
}


function filtrarEmpleados() {
    let textoBusqueda = document.getElementById("txtBusquedaEmpleado").value.toLowerCase();
    let empleadosFiltrados = [];

    for (let i = 0; i < Empleados.length; i++) {
        let empleado = Empleados[i];
        if (
                empleado.nombre.toLowerCase().includes(textoBusqueda) ||
                empleado.apellido_paterno.toLowerCase().includes(textoBusqueda) ||
                empleado.apellido_materno.toLowerCase().includes(textoBusqueda) ||
                empleado.genero.toLowerCase().includes(textoBusqueda) ||
                empleado.telefono.includes(textoBusqueda) ||
                empleado.estatus.toLowerCase().includes(textoBusqueda)
                ) {
            empleadosFiltrados.push(empleado);
        }
    }

    // Limpia la tabla antes de cargar los datos filtrados
    document.getElementById("tblEmpleados").innerHTML = "";

    // Carga los clientes filtrados en la tabla
    empleadosFiltrados.forEach(function (empleado) {
        let registro =
                '<tr onclick="selectCliente(' + Empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombre + '</td>' +
                '<td>' + empleado.apellido_paterno + ' ' + empleado.apellido_materno + '</td>' +
                '<td>' + empleado.genero + '</td>' +
                '<td>' + empleado.telefono + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        document.getElementById("tblEmpleados").innerHTML += registro;
    });
    
}