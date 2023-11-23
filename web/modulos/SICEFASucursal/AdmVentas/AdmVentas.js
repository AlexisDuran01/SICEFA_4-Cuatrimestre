// Guardar el JSON con el primer objeto del arreglo de productos (primera producto).
let arregloProductos = [];
guardarArregloProductos();
function guardarArregloProductos() {
    fetch("modulos/SICEFACentral/AdmProductos/Productos.json").then(
            function (response) {
                return response.json();
            }
    ).then(
            function (jsonData) {
                arregloProductos = jsonData;
                console.log(arregloProductos[0]);

            }
    );
}
// Guardar el JSON con el primer objeto del arreglo de ventas (la primera venta).
let arregloVenta = [];
guardarArregloVenta();
function guardarArregloVenta() {
    fetch("modulos/SICEFASucursal/AdmVentas/Ventas.json").then(
            function (response) {
                return response.json();
            }
    ).then(
            function (jsonData) {
                arregloVenta = jsonData;
            }
    );
}

// Guardar el JSON con el primer objeto del arreglo de detalle de venta (la primera venta).
let arregloDetalleVenta = [];
guardarArregloDetalleVenta();
function guardarArregloDetalleVenta() {
    fetch("modulos/SICEFASucursal/AdmVentas/DetalleVenta.json").then(
            function (response) {
                return response.json();
            }
    ).then(
            function (jsonData) {
                arregloDetalleVenta = jsonData;
            }
    );
}

// Guardar el JSON con el primer objeto del arreglo cliente (primer cliente).
let arregloCliente = [];
guardarArregloCliente();
function guardarArregloCliente() {
    fetch("modulos/SICEFASucursal/AdmClientes/Clientes.json").then(
            function (response) {
                return response.json();
            }
    ).then(
            function (jsonData) {
                arregloCliente = jsonData;
            }
    );
}

// Guardar el JSON con el primer objeto del arreglo empleado (primer empleado).
let arregloEmpleado = [];
guardarArregloEmpleado();
function guardarArregloEmpleado() {
    fetch("modulos/SICEFASucursal/AdmEmpleados/Empleados.json").then(
            function (response) {
                return response.json();
            }
    ).then(
            function (jsonData) {
                arregloEmpleado = jsonData;
            }
    );
}


/* function inputFechaBuscarVenta() {
 document.getElementById("inputBuscarVenta").innerHTML =
 `<div>
 <div> <input type="date" id="txtFechaInicio"> </div>
 <div> <input type="date" id="txtFechaFin"> </div>    
 </div>`; */

// FunciÃ³n para buscar elementos segÃºn su nombre,apellidos,RFC, CURP, email
//  o id y devuelve id, nombre, apellidos, RFC y email.
function buscarVentas(arregloV, terminoBusqueda, filtro) {
    let resultado = 0;
    switch (filtro) {
        case "1":
            resultado = arregloV.filter(elemento =>
                elemento.idVenta === (terminoBusqueda)
            ).map(elemento => ({
                    identificador: elemento.idVenta,
                    empleado: elemento.empleado,
                    cliente: elemento.cliente,
                    fecha: elemento.fecha,
                    estatus: elemento.estatus
                }));
            break;
            console.log('Caso 1');

        case "2":
            let idEmpleado = arregloEmpleado.filter(elemento =>
                elemento.nombreEmpleado.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                        elemento.apellidoPaterno.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                        elemento.idEmpleado === (terminoBusqueda)
            ).map(elemento => (
                        elemento.idEmpleado
                        ));
            console.log(idEmpleado);
            resultado = arregloV.filter(elemento =>
                elemento.empleado === (idEmpleado[0])
            ).map(elemento => ({
                    identificador: elemento.idVenta,
                    cliente: elemento.cliente,
                    empleado: elemento.empleado,
                    fecha: elemento.fecha,
                    estatus: elemento.estatus
                }));
            console.log('Caso2');
            break;

        case "3":
            let idCliente = arregloCliente.filter(elemento =>
                elemento.nombreCliente.includes(terminoBusqueda) ||
                        elemento.apellidoPaterno.toLowerCase().includes(terminoBusqueda) ||
                        elemento.id === (terminoBusqueda)
            ).map(elemento => ({
                    idCli: elemento.idCliente
                }));

            resultado = arregloV.filter(elemento =>
                elemento.cliente === (idCliente)
            ).map(elemento => ({
                    identificador: elemento.idVenta,
                    cliente: elemento.cliente,
                    empleado: elemento.empleado,
                    fecha: elemento.fecha,
                    estatus: elemento.estatus
                }));
            break;
        default :
            console.log('No jala');
    }
    return resultado;

}

let idVentaSeleccionada;
// FunciÃ³n que muestra los resultados de la bÃºsqueda.
function realizarBusquedaVenta() {
    let terminoBusqueda = ((document.getElementById("txtBusquedaVenta").value).toLowerCase());
    let filtro = ((document.getElementById("txtFiltroBusquedaV").value));
    let resultados = buscarVentas(arregloVenta, terminoBusqueda, filtro);
    console.log(resultados);
    // Limpiamos la tablas
    document.getElementById("tblVentaResultado").innerHTML = "";

    let ventasMostradas = document.getElementById("ventasMostradas").value;
    if (ventasMostradas === "2") {
        resultados.forEach(resultado => {
            const resultadoHTML =
                    `<tr onclick="ventaSeleccionada(${resultado.identificador})"> 
                <td>${resultado.identificador}</td> 
                <td>${resultado.cliente}</td> 
                <td>${resultado.empleado}</td>
                <td>${resultado.fecha}</td>
                <td>${resultado.estatus}</td>
            </tr>`;
            document.getElementById("tblVentaResultado").insertAdjacentHTML("beforeend", resultadoHTML);
        });
    } else {
        resultados.forEach(resultado => {
            if (resultado.estatusProducto === "Activo") {
            const resultadoHTML =
                    `<tr onclick="ventaSeleccionada(${resultado.identificador})"> 
                <td>${resultado.identificador}</td> 
                <td>${resultado.cliente}</td> 
                <td>${resultado.empleado}</td>
                <td>${resultado.fecha}</td>
                <td>${resultado.estatus}</td>
            </tr>`;
            document.getElementById("tblVentaResultado").insertAdjacentHTML("beforeend", resultadoHTML);
            }
    });
    }
}

//FunciÃ³n para mostrar el cliente seleccionado.
function ventaSeleccionada(id) {

    // AÃ±adir resultados a tabla empleado
    let infoEmpleado =
            `<tr style="height: 1em">
                    <td style="width: 4em">${arregloVenta[id - 1].empleado}</th>
                    <td>${arregloEmpleado[arregloVenta[id - 1].empleado - 1].nombre} 
                        ${arregloEmpleado[arregloVenta[id - 1].empleado - 1].apellido_paterno}</th>
                    <td>${arregloEmpleado[arregloVenta[id - 1].empleado - 1].puesto}</th>
            </tr>`;
    document.getElementById("txtEmpleadoResultado").innerHTML = infoEmpleado;
    document.getElementById("txtEmpleado").value = arregloEmpleado[arregloVenta[id - 1].empleado - 1].nombre + " "
            + arregloEmpleado[arregloVenta[id - 1].empleado - 1].apellido_paterno + " " +
            arregloEmpleado[arregloVenta[id - 1].empleado - 1].apellido_materno;

    // AÃ±adir resultados a tabla clientes
    let infoCliente =
            `<tr>
                    <td>${arregloCliente[arregloVenta[id - 1].cliente - 1].codigo_postal}</td>
                    <td>${arregloCliente[arregloVenta[id - 1].cliente - 1].telefono}</td>
                    <td>${arregloCliente[arregloVenta[id - 1].cliente - 1].rfc}</td>
            </tr>`;
    document.getElementById("txtClienteResultado").innerHTML = infoCliente;

    document.getElementById("txtCliente").value = arregloCliente[arregloVenta[id - 1].cliente - 1].nombre + " "
            + arregloCliente[arregloVenta[id - 1].cliente - 1].apellido_paterno + " " +
            arregloCliente[arregloVenta[id - 1].cliente - 1].apellido_materno;


    // AÃ±adir resultados a tabla de venta
    document.getElementById("tblVentaResultado").innerHTML =
            `<tr class="productos"> 
                <td>${arregloVenta[id - 1].idVenta}</td> 
                <td>${arregloVenta[id - 1].cliente}</td> 
                <td>${arregloVenta[id - 1].empleado}</td>
                <td>${arregloVenta[id - 1].fecha}</td>
                <td>${arregloVenta[id - 1].estatus}</td>
            </tr>`;

    // AÃ±adir resultado a tabla de productos.
    productoDetalleVenta = consultarProductosVenta(arregloDetalleVenta, id);

    productoDetalleVenta.forEach(resultado => {
        const infoProductos =
                `<tr class="productos">
                <td>${arregloProductos[resultado.numeroProducto - 1].estatusProducto}</td>
                <td>${arregloProductos[resultado.numeroProducto - 1].nombreProducto}</td>
                <td>${arregloProductos[resultado.numeroProducto - 1].nombreGenerico}</td>
                <td>${arregloProductos[resultado.numeroProducto - 1].presentacion}</td>
                <td>${arregloProductos[resultado.numeroProducto - 1].unidadesEnvase}</td>
                <td>${resultado.precioUnitario}</td> 
                <td>${resultado.existencia}</td> 
            </tr>`;
        document.getElementById("txtProductoResultado").insertAdjacentHTML("beforeend", infoProductos);

    });
}

function consultarProductosVenta(arreglo, terminoBusqueda) {
    return arreglo.filter(elemento =>
        elemento.idVenta.includes(terminoBusqueda)
    ).map(elemento => ({
            cantidad: elemento.cantidadProducto,
            precio: elemento.precioVigente,
            idProducto: elemento.idProducto
        }));
}

// FunciÃ³n para buscar elementos segÃºn su nombre,apellidos,RFC, CURP, email
//  o id y devuelve id, nombre, apellidos, RFC y email.
function buscarEmpleados(arreglo, terminoBusqueda) {
    return arreglo.filter(elemento =>
        elemento.nombre.toLowerCase().includes(terminoBusqueda) ||
                elemento.apellido_paterno.toLowerCase().includes(terminoBusqueda) ||
                elemento.apellido_materno.toLowerCase().includes(terminoBusqueda) ||
                elemento.rfc.toLowerCase().includes(terminoBusqueda) ||
                elemento.idEmpleado === (terminoBusqueda)
    ).map(elemento => ({
            identificador: elemento.id,
            nombre: elemento.nombre,
            apellidoPaterno: elemento.apellido_paterno,
            apellidoMaterno: elemento.apellido_materno,
            RFC: elemento.rfc,
            puesto: elemento.puesto
        }));
}

let idEmpleadoSeleccionado;
// FunciÃ³n que muestra los resultados de la bÃºsqueda.
function realizarBusquedaEmpleado() {
    let terminoBusqueda = (document.getElementById("txtEmpleado").value).toLowerCase();
    let resultados = buscarEmpleados(arregloEmpleado, terminoBusqueda);

    // Limpiar resultados anteriores
    document.getElementById("txtEmpleadoResultado").innerHTML = "";

    resultados.forEach(resultado => {
        const resultadoHTML =
                `<tr onclick="empleadoSeleccionado(${resultado.identificador})">
                <td> ${resultado.nombre} ${resultado.apellidoPaterno}</td>
                <td>${resultado.RFC}</td> 
                <td>${resultado.puesto}</td> 
            </tr>`;
        document.getElementById("txtEmpleadoResultado").insertAdjacentHTML("beforeend", resultadoHTML);
        console.log(resultado.HTML);

    });
}

//FunciÃ³n para mostrar el cliente seleccionado.
function empleadoSeleccionado(id) {
    idEmpleadoSeleccionado = id;
    document.getElementById("txtEmpleadoResultado").innerHTML = "";
    let empleadoSeleccionado =
            `<tr style="height: 1em" class="productos">
                            <td>${arregloEmpleado[idEmpleadoSeleccionado - 1].nombre} 
                                    ${arregloEmpleado[idEmpleadoSeleccionado - 1].apellido_paterno}</th>
                            <td>${arregloEmpleado[idEmpleadoSeleccionado - 1].rfc}</th>
                            <td>${arregloEmpleado[idEmpleadoSeleccionado - 1].puesto}</th>
                        </tr>`;

    document.getElementById("txtEmpleado").value = arregloEmpleado[idEmpleadoSeleccionado - 1].id;
    document.getElementById("txtEmpleadoResultado").innerHTML = empleadoSeleccionado;
}

// FunciÃ³n para buscar elementos segÃºn su nombre,apellidos,RFC, CURP, email
//  o id y devuelve id, nombre, apellidos, RFC y email.
function buscarClientes(arreglo, terminoBusqueda) {
    return arreglo.filter(elemento =>
        elemento.nombre.toLowerCase().includes(terminoBusqueda) ||
                elemento.apellido_paterno.toLowerCase().includes(terminoBusqueda) ||
                elemento.apellido_materno.toLowerCase().includes(terminoBusqueda) ||
                elemento.rfc.toLowerCase().includes(terminoBusqueda) ||
                elemento.id === (terminoBusqueda)
    ).map(elemento => ({
            identificador: elemento.id,
            nombre: elemento.nombre,
            apellidoPaterno: elemento.apellido_paterno,
            apellidoMaterno: elemento.apellido_materno,
            RFC: elemento.rfc,
            email: elemento.correo_electronico,
            codigoPostal: elemento.codigo_postal
        }));
}

let idClienteSeleccionado;
// FunciÃ³n que muestra los resultados de la bÃºsqueda.
function realizarBusquedaCliente() {
    let terminoBusqueda = ((document.getElementById("txtCliente").value).toLowerCase());
    let resultados = buscarClientes(arregloCliente, terminoBusqueda);

    // Limpiamos la tablas
    document.getElementById("txtClienteResultado").innerHTML = "";

    resultados.forEach(resultado => {
        const resultadoHTML =
                `<tr onclick="clienteSeleccionado(${resultado.identificador})"> 
                <td>${resultado.nombre} ${resultado.apellidoPaterno}</td> 
                <td>${resultado.codigoPostal}</td> 
                <td>${resultado.RFC}</td>
            </tr>`;
        document.getElementById("txtClienteResultado").insertAdjacentHTML("beforeend", resultadoHTML);
    });
}

//FunciÃ³n para mostrar el cliente seleccionado.
function clienteSeleccionado(id) {
    idClienteSeleccionado = id;
    document.getElementById("txtClienteResultado").innerHTML = "";
    let clienteSeleccionado =
            `<tr class="productos">
                    <td>${arregloCliente[idClienteSeleccionado - 1].nombre} ${arregloCliente[idClienteSeleccionado - 1].apellido_paterno}</td>
                    <td>${arregloCliente[idClienteSeleccionado - 1].codigo_postal}</td>
                    <td>${arregloCliente[idClienteSeleccionado - 1].rfc}</td>
            </tr>`;
    document.getElementById("txtCliente").value = arregloCliente[idClienteSeleccionado - 1].id;
    document.getElementById("txtClienteResultado").innerHTML = clienteSeleccionado;
    ;
}

// FunciÃ³n para buscar elementos segÃºn su nombre, 
// nombre genÃ©rico o cÃ³digo de barras y devuelve id, nombre, nombreGenÃ©rico, precioUnitario y concentraciÃ³n.
function buscarProductos(arreglo, terminoBusqueda) {
    return arreglo.filter(elemento =>
        elemento.nombreProducto.toLowerCase().includes(terminoBusqueda) ||
                elemento.nombreGenerico.toLowerCase().includes(terminoBusqueda) ||
                elemento.codigoBarras.toLowerCase().includes(terminoBusqueda)
    ).map(elemento => ({
            identificador: elemento.numeroProducto,
            estatus: elemento.estatusProducto,
            nombre: elemento.nombreProducto,
            nombreGenerico: elemento.nombreGenerico,
            precioUnitario: elemento.precioUnitario,
            concentracion: elemento.concentracion,
            existencia: elemento.existencia,
            unidadesEnvase: elemento.unidadesEnvase
        }));
}

// FunciÃ³n que muestra los resultados de la bÃºsqueda.
function realizarBusquedaProducto() {
    let terminoBusqueda = document.getElementById("txtProducto").value;
    let resultados = buscarProductos(arregloProductos, terminoBusqueda);
    
    const dropdownContainer = document.getElementById("searchDropdownP");
    dropdownContainer.classList.toggle("active");
    // Limpiar resultados anteriores
    document.getElementById("txtProductoResultado").innerHTML = "";
    resultados.forEach(resultado => {
        const resultadoHTML = 
           `<tr onclick="productoSeleccionado(${resultado.identificador})">
                <td>${resultado.estatus}</td>
                <td>${resultado.nombre}</td>
                <td>${resultado.nombreGenerico}</td>    
                <td>${resultado.concentracion}</td>
                <td>${resultado.unidadesEnvase}</td> 
                <td>$${resultado.precioUnitario}</td>
                <td></td>
            </tr>`;
        document.getElementById("txtProductoResultado").insertAdjacentHTML("beforeend",  resultadoHTML );
    });
}    

//FunciÃ³n para agregar la el producto seleccionado de la bÃºsqueda para agregarlo a la lista de productos a comprar.
let productosSeleccionados = [{id: "", cantidad: 0, nombre: "", precio: 0}];
let cantProductosSeleccionados = 1;
function productoSeleccionado(id) {
    let productoCompra;
    document.getElementById("txtProductoResultado").innerHTML = "";
    productoCompra = 
        `<tr class="productos" style="background-color: gris">
            <td>${arregloProductos[id - 1].estatusProducto}</td> 
            <td>${arregloProductos[id - 1].nombreProducto}</td> 
            <td>${arregloProductos[id - 1].nombreGenerico}</td>
            <td>${arregloProductos[id - 1].concentracion}</td>   
            <td>${arregloProductos[id - 1].unidadesEnvase}</td> 
            <td>${arregloProductos[id - 1].precioUnitario}</td> 
            <td style="width: 8em;"><input type='number' id='cantidadProducto${cantProductosSeleccionados}' min="1" max="${arregloProductos[id - 1].existencia}"></td> 
        </tr>`;
    document.getElementById("productosCompra").insertAdjacentHTML("beforeend", productoCompra);
    productosSeleccionados[productosSeleccionados.length - 1].id = id;
    cantProductosSeleccionados++;
}

// FunciÃ³n para limpiar campos.
function limpiarCampos() {
    document.getElementById("tblVentaResultado").innerHTML = "";
    document.getElementById("txtEmpleadoResultado").innerHTML = "";
    document.getElementById("txtEmpleado").innerHTML = "";
    document.getElementById("txtClienteResultado").innerHTML = "";
    document.getElementById("txtCliente").innerHTML = "";
    document.getElementById("txtProductoResultado").innerHTML = "";
    document.getElementById("productosCompra").innerHTML = "";
}

function eliminarVenta() {
    let idVenta = document.getElementById("txtBusquedaVenta").value;
    Swal.fire({
        title: 'Â¿Seguro que desea eliminar la venta?',
        text: "Los venta serÃ¡ eliminada lÃ³gicamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
           arregloVenta[idVenta-1].estatus = 0;
            Swal.fire(
                    'Guardado!',
                    'La venta ha sido guardada correctamente',
                    'success'
                    );
        }
    });
}

//FunciÃ³n que pregunta para confirmar el guardado de los datos
function guardarVenta() {
    Swal.fire({
        title: 'Â¿Desea guardar la venta?',
        text: "Los productos serÃ¡n descontados del inventario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si, guardar!'
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarGuardarVenta();
            Swal.fire(
                    'Guardado!',
                    'La venta ha sido guardada correctamente',
                    'success'
                    );
        }
    });
}

// FunciÃ³n que guarda la venta obteniendo los productos seleccionados y la cantidad de estos para guardarlo en el arregloVenta. 
let idVenta = 1;
let idDetalleVenta = 2;
let fechaFormateada;
let horaFormateada;
function confirmarGuardarVenta() {

    let id = idVenta++;
    let estatus = 1;
    let cliente = document.getElementById("txtCliente").value;
    fechaActual();
    let fecha = fechaFormateada;
    let hora = horaFormateada;
    let empleado = document.getElementById("txtEmpleado").value;

    agregarVenta(id, estatus, cliente, fecha, hora, empleado);

    for (let i = 0; i < productosSeleccionados.length; i++) {
        productosSeleccionados[i].cantidad = document.getElementById(`cantidadProducto${i + 1}`).value;
        productosSeleccionados[i].nombre = arregloProductos[productosSeleccionados[i].id - 1].nombre;
        productosSeleccionados[i].precio = arregloProductos[productosSeleccionados[i].id - 1].precioUnitario;

        agregarDetalleVenta(idDetalleVenta, productosSeleccionados[i].cantidad, productosSeleccionados[i].precio,
                idVenta, productosSeleccionados[i].id);

        idDetalleVenta++;
    }
    ;
    console.log(arregloDetalleVenta[idDetalleVenta - 1]);
    console.log(arregloVenta[idVenta - 1]);
}

function agregarDetalleVenta(idDetalleVenta, cantidad, precio, idVenta, idProducto) {
    let producto = {
        "idDetalleVenta": idDetalleVenta,
        "cantidadProducto": cantidad,
        "precioVigente": precio,
        "idVenta": idVenta,
        "idProducto": idProducto
    };
    arregloDetalleVenta.push(producto);
    arregloProductos[idProducto - 1].existencia = arregloProductos[idProducto - 1].existencia - cantidad;
}

function agregarVenta(id, estatus, cliente, fecha, hora, empleado) {
    let venta = {
        "id": id,
        "estatus": estatus,
        "cliente": cliente,
        "fecha": fecha,
        "hora": hora,
        "empleado": empleado
    };
    arregloVenta.push(venta);
}

// FunciÃ³n para obtener la fecha y hora actual con el formato deseado (YYYY-MM-DD  HH-MM-SS). 
function fechaActual() {

    let anio = new Date().getFullYear();
    let mes = String((new Date().getMonth()) + 1).padStart(2, '0'); // Se suma 1 al mes porque en JavaScript los meses van de 0 a 11
    let dia = new Date().getDate();
    let hora = new Date().getHours();
    let minutos = new Date().getMinutes();
    let segundos = new Date().getSeconds();
    fechaHoraFormateada = `${anio}-${mes}-${dia}`;
    horaFormateada = `${hora}:${minutos}:${segundos}`;
}