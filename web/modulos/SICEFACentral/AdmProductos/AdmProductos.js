let indexGestionProductoSeleccionado;
let Gestionproductos = [];

// Cargar datos de clientes desde un archivo JSON

fetch("modulos/SICEFACentral/AdmProductos/Productos.json")
    .then((response) => response.json())
    .then(function (jsondata) {
        Gestionproductos = jsondata;
        loadTablaGestionProductos();
    });

function addProducto()
// Obtener valores de los campos de entrada
{
    let numeroProducto,
        nombreProducto,
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        concentracion,
        presentacion,
        principalIndicacion,
        contraindicacion,
        unidadesEnvase,
        precioUnitario,
        codigoBarras,
        estatusProducto;

    numeroProducto = document.getElementById("txtNumUnico").value;
    nombreProducto = document.getElementById("txtNombre").value;
    nombreGenerico = document.getElementById("txtNombreGenerico").value;
    formaFarmaceutica = document.getElementById("txtformaFarmaceutica").value;
    unidadMedida = document.getElementById("txtUnidadMedida").value;
    concentracion = document.getElementById("txtConcentracion").value;
    presentacion = document.getElementById("txtPresentacion").value;
    principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;
    contraindicacion = document.getElementById("txtContradicciones").value;
    unidadesEnvase = document.getElementById("txtUnidadEnvase").value;
    precioUnitario = document.getElementById("txtPrecioUnitario").value;
    codigoBarras = document.getElementById("txtCodigoBarras").value;
    estatusProducto = document.getElementById("txtEstatus").value


    let producto = {
        // Crear un objeto cliente
        numeroProducto,
        nombreProducto,
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        concentracion,
        presentacion,
        principalIndicacion,
        contraindicacion,
        unidadesEnvase,
        precioUnitario,
        codigoBarras,
        estatusProducto
    };
    // Agregar el cliente al arreglo y actualizar la tabla



    Swal.fire({
        title: 'Deseas agregar el nuevo elemento',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Accion exitosa!', '', 'success')
            Gestionproductos.push(producto);
            cleanGestionProducto();
            loadTablaGestionProductos();
        } else if (result.isDenied) {
            Swal.fire('Accion Cancelada', '', 'error')
        }
    })




}

function loadTablaGestionProductos() {

    // Cargar la tabla con los datos de los clientes

    let cuerpo = "";
    Gestionproductos.forEach(function (producto) {
        let registro =
            '<tr onclick="selectProducto(' + Gestionproductos.indexOf(producto) + ');">' +
            '<td>' + producto.nombreGenerico + '</td>' +
            '<td>' + producto.precioUnitario + '</td>' +
            '<td>' + producto.concentracion + '</td>' +
            '<td>' + producto.unidadesEnvase + '</td>' +
            '<td>' + producto.estatusProducto + '</td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblGestionProductos").innerHTML = cuerpo;
}

function selectProducto(index) {
    console.log("funcion seleccionar")
    // Seleccionar un cliente para editar
    indexGestionProductoSeleccionado = index;
    let producto = Gestionproductos[index];
    numero_unico_producto = document.getElementById("txtNumUnico").value = Gestionproductos[index].numeroProducto;
    nombre_producto = document.getElementById("txtNombre").value = Gestionproductos[index].nombreProducto;
    nombre_generico = document.getElementById("txtNombreGenerico").value = Gestionproductos[index].nombreGenerico;
    forma_farmaceutica = document.getElementById("txtformaFarmaceutica").value = Gestionproductos[index].formaFarmaceutica;
    unidadMedida = document.getElementById("txtUnidadMedida").value = Gestionproductos[index].unidadMedida;
    presentacion = document.getElementById("txtPresentacion").value = Gestionproductos[index].presentacion;
    principal_indicacion = document.getElementById("txtPrincipalIndicacion").value = Gestionproductos[index].principalIndicacion;
    contraindicacion = document.getElementById("txtContradicciones").value = Gestionproductos[index].contraindicacion;
    concentracion = document.getElementById("txtConcentracion").value = Gestionproductos[index].concentracion;
    unidadesEnvase = document.getElementById("txtUnidadEnvase").value = Gestionproductos[index].unidadesEnvase;
    precioUnitario = document.getElementById("txtPrecioUnitario").value = Gestionproductos[index].precioUnitario;
    codigoBarras = document.getElementById("txtCodigoBarras").value = Gestionproductos[index].codigoBarras;
    estatusProducto = document.getElementById("txtEstatus").value = Gestionproductos[index].estatusProducto;
}

function cleanGestionProducto() {
    // Limpiar los campos de entrada
    numero_unico_cliente = document.getElementById("txtNumUnico").value = "";
    nombre_producto = document.getElementById("txtNombre").value = "";
    nombre_generico = document.getElementById("txtNombreGenerico").value = "";
    forma_farmaceutica = document.getElementById("txtformaFarmaceutica").value = "";
    unidadMedida = document.getElementById("txtUnidadMedida").value = "";
    presentacion = document.getElementById("txtPresentacion").value = "";
    principal_indicacion = document.getElementById("txtPrincipalIndicacion").value = "";
    contraindicacion = document.getElementById("txtContradicciones").value = "";
    concentracion = document.getElementById("txtConcentracion").value = "";
    unidadesEnvase = document.getElementById("txtUnidadEnvase").value = "";
    precioUnitario = document.getElementById("txtPrecioUnitario").value = "";
    codigoBarras = document.getElementById("txtCodigoBarras").value = "";
    estatusProducto = document.getElementById("txtEstatus").value = "";
    indexGestionProductoSeleccionado = 0;
    nombre_producto = document.getElementById("txtNombre").focus();

}

function updateProducto() {
    let {
        //Actualiza el cliente por si algún campo fue llenado de manera érronea
        numeroProducto,
        nombreProducto,
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        concentracion,
        presentacion,
        principalIndicacion,
        contraindicacion,
        unidadesEnvase,
        precioUnitario,
        codigoBarras,
        estatusProducto
    } = getFormValuesGestionProductos();

    let producto = {
        numeroProducto,
        nombreProducto,
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        concentracion,
        presentacion,
        principalIndicacion,
        contraindicacion,
        unidadesEnvase,
        precioUnitario,
        codigoBarras,
        estatusProducto
    };


    Swal.fire({
        title: 'Deseas guardar los cambios',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Accion exitosa!', '', 'success')
            Gestionproductos[indexGestionProductoSeleccionado] = producto;
            console.log("se guardo el cambio")
            cleanGestionProducto();
            loadTablaGestionProductos();
        } else if (result.isDenied) {
            Swal.fire('Accion Cancelada', '', 'error')
        }
    })


}

function deleteProducto() {
    //Cambia el estado del cliente a inactivo 
    Swal.fire({
        title: 'Estas seguro?',
        text: "Solo se cambiara el estatus a inactivo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            Gestionproductos[indexGestionProductoSeleccionado].estatusProducto = "Inactivo";
            cleanGestionProducto();
            loadTablaGestionProductos();
            Swal.fire(
                'Eliminado correctamente',
                '',
                'success'
            )
        } else if (result.isDismissed) {
            Swal.fire('Accion Cancelada', '', 'error')
        }
    })
}

function getFormValuesGestionProductos() {
    //Obtiene los valores mediantes sus ID, todos son recabados através del formato 
    numeroProducto = document.getElementById("txtNumUnico").value;
    nombreProducto = document.getElementById("txtNombre").value;
    nombreGenerico = document.getElementById("txtNombreGenerico").value;
    formaFarmaceutica = document.getElementById("txtformaFarmaceutica").value;
    unidadMedida = document.getElementById("txtUnidadMedida").value;
    concentracion = document.getElementById("txtConcentracion").value;
    presentacion = document.getElementById("txtPresentacion").value;
    principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;
    contraindicacion = document.getElementById("txtContradicciones").value;
    unidadesEnvase = document.getElementById("txtUnidadEnvase").value;
    precioUnitario = document.getElementById("txtPrecioUnitario").value;
    codigoBarras = document.getElementById("txtCodigoBarras").value;
    estatusProducto = document.getElementById("txtEstatus").value;


    // Regresando cada uno de los valores capturados

    return {
        numeroProducto,
        nombreProducto,
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        concentracion,
        presentacion,
        principalIndicacion,
        contraindicacion,
        unidadesEnvase,
        precioUnitario,
        codigoBarras,
        estatusProducto
    };
}


function filtrarProductos() {

    //Esta funcion filtra mediante un ciclo for los que contiene en el archivo JSON
    //Buscando cuelqquier incidencia que pueda encontrar mostrandola en la tabla de resultados
    //Utilizando el operador logíco OR para una pronta búsqueda

    let textoBusqueda = document.getElementById("txtBusquedaProducto").value.toLowerCase();
    let productosFiltrados = [];
    let producto = 0
    for (let i = 0; i < Gestionproductos.length; i++) {
        producto = Gestionproductos[i];
        if (
            producto.nombreGenerico.toLowerCase().includes(textoBusqueda) ||
            producto.estatusProducto.toLowerCase().includes(textoBusqueda)
        ) {
            productosFiltrados.push(producto);
        } else {
            let precioUnitario = parseFloat(producto.precioUnitario);
            if (precioUnitario === parseFloat(textoBusqueda)) {
                productosFiltrados.push(producto);
            }
        }
    }

    // Limpia la tabla antes de cargar los datos filtrados
    document.getElementById("tblGestionProductos").innerHTML = "";

    // Carga los clientes filtrados en la tabla

    productosFiltrados.forEach(function (producto) {
        let registro =
            '<tr onclick="selectProducto(' + Gestionproductos.indexOf(producto) + ');">' +
            '<td>' + producto.nombreGenerico + '</td>' +
            '<td>' + producto.precioUnitario + '</td>' +
            '<td>' + producto.concentracion + '</td>' +
            '<td>' + producto.unidadesEnvase + '</td>' +
            '<td>' + producto.estatusProducto + '</td></tr>';
        document.getElementById("tblGestionProductos").innerHTML += registro;
    });

}