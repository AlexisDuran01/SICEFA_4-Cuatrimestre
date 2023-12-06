function agregarCliente() {
    let url = "http://localhost:8080/sicefa/api/cliente/insertCliente";
    let v_nombre = document.getElementById("txtAgregarNombrePersona").value;
    let v_apellidoPaterno = document.getElementById("agregarApellidoPaternoPersona").value;
    let v_apellidoMaterno = document.getElementById("agregarApellidoMaternoPersona").value;
    let v_genero = document.getElementById("txtAgregarGeneroPersona").value;
    let v_rfc = document.getElementById("txtAgregarRFCPersona").value;
    let v_fechaNacimiento = document.getElementById("txtAgregarFechaNacimientoPersona").value;
    let v_curp = document.getElementById("txtAgregarCURPPersona").value;
    let v_foto = document.getElementById("txtAgregarFotoPersona").value;
    let v_domicilio = document.getElementById("txtAgregarDomicilioPersona").value;
    let v_codigoPostal = document.getElementById("txtAgregarCodigoPostalPersona").value;
    let v_ciudad = document.getElementById("txtAgregarCiudadPersona").value;
    let v_estado = document.getElementById("txtAgregarEstadoPersona").value;
    let v_telefono = document.getElementById("txtAgregarTelefonoPersona").value;
    let v_email = document.getElementById("txtAgregarEmailPersona").value;
    let v_fechaRegistro = document.getElementById("txtAgregarFechaRegistroPersona").value;


    let datosCliente =
            {
                "emailCliente": v_email,
                "fechaRegistroCliente": "06/02/2023",
                "estatusCliente": "1",
                "personaCliente": {
                    "nombrePersona": v_nombre,
                    "apellidoPaternoPersona": v_apellidoPaterno,
                    "apellidoMaternoPersona": v_apellidoMaterno,
                    "generoPersona": v_genero,
                    "fechaNacimientoPersona": "2002-12-10",
                    "rfcPersona": v_rfc,
                    "curpPersona": v_curp,
                    "domicilioPersona": v_domicilio,
                    "codigoPostalPersona": v_codigoPostal,
                    "ciudadPersona": v_ciudad,
                    "estadoPersona": v_estado,
                    "telefonoPersona": v_telefono,
                    "fotoPersona": v_foto
                }
            };
    console.log(datosCliente);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({datosCliente: JSON.stringify(datosCliente)})
    };
    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            }
    ).then(
            function (json) {
                console.log(json);
                Swal.fire({
                    title: 'Guardando registro',
                    html: 'No cierre la venta porfavor',
                    timer: 1500,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                        const b = Swal.getHtmlContainer().querySelector('b');
                        timerInterval = setInterval(() => {
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {   /* Esta condición se cumple solo cuando el mensaje emergente se cierra 
                     automáticamente debido al temporizador */

                        console.log('I was closed by the timer');
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registro agregado correctamente',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            timer: 1500
                        });

                        mostrarRegistrosCliente();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                        // para cargar el nuevo registro sin necesidad de recargar la pagina
                    }
                });
            }
    );
}

function recuperarIdClienteSeleccionado(event) {
    // Obtener el botón que desencadenó el evento
    let boton = event.currentTarget; //es una propiedad que se utiliza en eventos de JavaScript para referirse al elemento al que se le ha asignado un event listener.

    // Obtener la fila más cercana (padre) al botón clickeado
    let fila = boton.closest('tr');

    // Usar querySelector para seleccionar el primer hijo de la fila (primera celda)
    const primeraCelda = fila.querySelector(':first-child');/*querySelector es un método en JavaScript que se usa para seleccionar un elemento html
     *  utilizando selectores CSS. Este método busca y devuelve el primer elemento que coincida con el selector CSS especificado.*/

    // Obtener el contenido de texto de la primera celda
    const idCliente = primeraCelda.textContent;

    // Mostrar en la consola el contenido de la primera celda (idProducto)
    console.log(idCliente);

    // Devolver el contenido de la primera celda (idProducto)
    return idCliente;
}

    function recuperarIdCliente(idCliente) {
    let url = `http://localhost:8080/sicefa/api/cliente/obtenerClientePorId?idCliente=`+idCliente;
    console.log("Haciendo petición al servidor");
    // Realización de la solicitud al servidor utilizando fetch y devolución de una promesa
    return fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio ObtenerClientePorId:", respuesta.status);
                return respuesta.json();  /* Devuelve una promesa que contiene los datos del producto en formato JSON. 
                 * Debe manejarse al usar esta función para acceder a los datos del producto.*/
            })
            .catch(error => {
                console.log("Error al obtener datos " + error);
            });
}



function verClienteSeleccionado(event) {
    console.log("Hola desde ver clientes");
    
    let id = recuperarIdClienteSeleccionado(event);
    
    recuperarIdCliente(id).then(
            (cliente) => {

        let verCliente = document.getElementById('registroVerCliente');
console.log(cliente);

        let estatus = '';

        if (cliente.estatus === 1) {
            estatus = 'Activo';
        } else {
            estatus = 'Inactivo';
        }

             let registro=`<tr>
                                <td class="fw-bold registro">Nombre:</td>
                                <td class ="registro">${cliente.personaCliente.nombrePersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Apellido Paterno:</td>
                                <td class ="registro">${cliente.personaCliente.apellidoPaternoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Apellido Materno:</td>
                                <td class ="registro">${cliente.personaCliente.apellidoMaternoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Género:</td>
                                <td class ="registro">${cliente.personaCliente.generoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Fecha de Nacimiento:</td>
                                <td class ="registro">${cliente.personaCliente.fechaNacimientoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">RFC:</td>
                                <td class ="registro">${cliente.personaCliente.rfcPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">CURP:</td>
                                <td class ="registro">${cliente.personaCliente.curpPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Domicilio:</td>
                                <td class ="registro">${cliente.personaCliente.domicilioPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Código Postal:</td>
                                <td class ="registro">${cliente.personaCliente.codigoPostalPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Ciudad:</td>
                                <td class ="registro">${cliente.personaCliente.ciudadPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Estado:</td>
                                <td class ="registro">${cliente.personaCliente.estadoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Teléfono:</td>
                                <td class ="registro">${cliente.personaCliente.telefonoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Email:</td>
                                <td class ="registro">${cliente.emailCliente}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Estatus:</td>
                                <td class ="registro">${cliente.estatusCliente}</td>
                            </tr>`;
        
        verCliente.innerHTML=registro;
                            
    });


}

function eliminarCliente(event){
    console.log("Hola desde eliminar cliente");
    let idCliente = recuperarIdClienteSeleccionado(event);
    console.log(idCliente);
    eliminarClienteLogicamente(idCliente);
}

function eliminarClienteLogicamente(idCliente) {
    let url = "http://localhost:8080/sicefa/api/cliente/eliminarCliente?idCliente=";
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({idCliente:JSON.parse(idCliente)})
    };
    fetch(url, requestOptions).then(
            function (json) {
                console.log(json);
                }).then((result) => {
                        
                            mostrarRegistrosCliente();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                            // para cargar el nuevo registro sin necesidad de recargar la pagina
                });
    }
    
    




function generarTablaCliente(arreglo) {

    let sucursalHTML = "";
    arreglo.forEach(function (cliente) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
        let estatus = "";
        if (cliente.estatusCliente === 1) {
            estatus = "Activo";
        } else if (cliente.estatusCliente === 0) {
            estatus = "Inactivo";
        }


        sucursalHTML +=
                ` <tr>
                                <td class="registro alinearTexto" scope="row">${cliente.idCliente}</td>
                                <td class="registro alinearTexto">${cliente.personaCliente.nombrePersona}</td>
                                <td class="registro alinearTexto">${cliente.personaCliente.apellidoPaternoPersona}</td>
                                <td class="registro alinearTexto">${cliente.personaCliente.apellidoMaternoPersona}</td>
                                <td class=" registro alinearTexto">${estatus}</td>
                                <td class="registro">${cargarBotonesCliente()}</td>
                     </tr> `;

        document.getElementById("registrosCliente").innerHTML = sucursalHTML;  /*Seleccionamos un elemento  HTML para reemplazar 
         su contenido con el valor de la variable pacientesHTML.  */
    });
}

// Esta es una variable bandera que nos indica si la alerta ya se mostro, ya que se tardan en mostrar los registros cuando se inicia la pagina, 
// pero despues no, por eso no siempre se muestrara la alerta
let alertaMostradaCliente = false;

function mostrarRegistrosCliente() {

    if (!alertaMostradaCliente) {

        Swal.fire({
            title: 'Cargando Registros',
            html: 'Un momento porfavor',
            timer: 1200,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(() => {
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        });
        // Marcamos la alerta como mostrada 
        alertaMostradaCliente = true;
    }
    

    let url = 'http://localhost:8080/sicefa/api/cliente/getAll';

    fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
                return respuesta.json();
            })
            .then(function (cuerpo) {
                console.log(cuerpo);
                generarTablaCliente(cuerpo);
            });

}

function cargarBotonesCliente() {

    let botones = `<div class="d-flex justify-content-center flex-wrap align-content-center">
                                        <!-- Button trigger modal -->
                                        <button class="btn btn-icon btn-lg" onclick="verClienteSeleccionado(event)"
                                                data-bs-toggle="modal" data-bs-target="#verProducto"><i
                                                class="bi bi-eye"></i></button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="verProducto" tabindex="-1"
                                             aria-labelledby="tituloProductos" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5 fw-bold" id="tituloProductos">Detalles Cliente</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body p-lg-4">
                                                        
                                                        <table class="table table-borderless tablaRegistros">
                                                           <tbody id="registroVerCliente">
                                                                
                                                           </tbody>
                                                        </table>

                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">Cerrar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <button  class="btn btn-icon btn-lg" onclick="editarProducto()"
                                                     data-bs-toggle="modal" data-bs-target="#EditarProducto"><i class="bi bi-pencil-square"></i></button>

                                            <div class="modal fade" id="EditarProducto" tabindex="-1" aria-labelledby="tituloProductos"
                                                 aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5 fw-bold" id="tituloProductos">Editar Producto</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                    aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body fondoModal p-lg-4">
                                                            <div class="mb-3">
                                                                <label for="txtAgregarNombrePersona" class="form-label">Nombre</label>
                                                                <input type="text" class="form-control" id="txtAgregarNombrePersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="agregarApellidoPaternoPersona" class="form-label">Apellido Paterno:</label>
                                                                <input type="text" class="form-control" id="agregarApellidoPaternoPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="agregarApellidoMaternoPersona" class="form-label">Apellido Materno:</label>
                                                                <input type="text" class="form-control" id="agregarApellidoMaternoPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarGeneroPersona" class="form-label">Genero:</label>
                                                                <input type="text" class="form-control" id="txtAgregarGeneroPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarFechaNacimientoPersona" class="form-label">Fecha de Nacimiento:</label>
                                                                <input type="date" class="form-control" id="txtAgregarFechaNacimientoPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarRFCPersona" class="form-label">RFC</label>
                                                                <input type="text" class="form-control" id="txtAgregarRFCPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarCURPPersona" class="form-label">CURP</label>
                                                                <input type="text" class="form-control" id="txtAgregarCURPPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarDomicilioPersona" class="form-label">Domicilio</label>
                                                                <input type="text" class="form-control" id="txtAgregarDomicilioPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarCodigoPostalPersona" class="form-label">Código Postal</label>
                                                                <input type="text" class="form-control" id="txtAgregarCodigoPostalPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarCiudadPersona" class="form-label">Ciudad</label>
                                                                <input type="text" class="form-control" id="txtAgregarCiudadPersona">
                                                            </div>


                                                            <div class="mb-3">
                                                                <label for="txtAgregarEstadoPersona" class="form-label">Estado</label>
                                                                <input type="text" class="form-control" id="txtAgregarEstadoPersona">
                                                            </div>
                                                            
                                                            <div class="mb-3">
                                                                <label for="txtAgregarTelefonoPersona" class="form-label">Teléfono</label>
                                                                <input type="text" class="form-control" id="txtAgregarTelefonoPersona">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarFotoPersona" class="form-label">Foto</label>
                                                                <input class="form-control" id="txtAgregarFotoPersona" type="file">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtAgregarEmailPersona" class="form-label">Email</label>
                                                                <input type="text" class="form-control" id="txtAgregarEmailPersona">
                                                            </div>
                                                            
                                                            <div class="mb-3">
                                                                <label for="txtAgregarFechaRegistroPersona" class="form-label">Fecha de Registro</label>
                                                                <input type="date" class="form-control" id="txtAgregarFechaRegistroPersona">
                                                            </div> 
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                    data-bs-dismiss="modal">Cerrar</button>
                                                            <button type="button" class="btn btn-primary">Guardar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <button onclick="eliminarCliente(event)" class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>  `;
    return botones;
}