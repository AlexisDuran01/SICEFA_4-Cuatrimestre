function agregarEmpleado() {
    let url = "http://localhost:8080/sicefa/api/empleado/insertEmpleado";
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    let v_genero = document.getElementById("txtGenero").value;
    let v_rfc = document.getElementById("txtRfc").value;
    let v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    let v_curp = document.getElementById("txtCurp").value;
    let v_foto = document.getElementById("flFoto").value;
    let v_domicilio = document.getElementById("txtDomicilio").value;
    let v_codigoPostal = document.getElementById("txtCodigoPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_fechaIngreso = document.getElementById("txtFechaIngreso").value;
    let v_puesto = document.getElementById("txtPuesto").value;
    let v_salarioBruto = document.getElementById("txtSalarioBruto").value;
    let v_email = document.getElementById("txtEmail").value;
    let v_idSucursal = document.getElementById("txtSucursal").value;
    let v_rol = document.getElementById("txtRol").value;


    let datosEmpleado =
            {
                "puestoEmpleado": v_puesto,
                "salarioBrutoEmpleado": v_salarioBruto,
                "personaEmpleado": {
                    "nombrePersona": v_nombre,
                    "apellidoPaternoPersona": v_apellidoPaterno,
                    "apellidoMaternoPersona": v_apellidoMaterno,
                    "generoPersona": v_genero,
                    "fechaNacimientoPersona": "10/10/2010",
                    "rfcPersona": v_rfc,
                    "curpPersona": v_curp,
                    "domicilioPersona": v_domicilio,
                    "codigoPostalPersona": v_codigoPostal,
                    "ciudadPersona": v_ciudad,
                    "estadoPersona": v_estado,
                    "telefonoPersona": v_telefono,
                    "fotoPersona": v_foto
                },
                "usuarioEmpleado": {
                    "rolUsuario": v_rol
                },
                "sucursalEmpleado": {
                    "idSucursal": v_idSucursal
                }
            };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({datosEmpleado: JSON.stringify(datosEmpleado)})
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

                        mostrarRegistrosEmpleado();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                        // para cargar el nuevo registro sin necesidad de recargar la pagina
                    }
                });
            }
    );
}

function eliminarRegistroEspecifico(){
    
}

function recuperarIdEmpleadoSeleccionado(event) {
    let boton = event.currentTarget;
    let fila = boton.closest('tr');
    const primeraCelda = fila.querySelector(':first-child');
    const idEmpleado = primeraCelda.textContent;
    console.log(idEmpleado);
    return idEmpleado;
}

function recuperarIdEmpleado(idEmpleado) {
    let url = `http://localhost:8080/sicefa/api/empleado/obtenerEmpleadoPorId?idEmpleado=` + idEmpleado;
    console.log("Haciendo petición al servidor");
    // Realización de la solicitud al servidor utilizando fetch y devolución de una promesa
    return fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio ObtenerEmpleadoPorId:", respuesta.status);
                return respuesta.json();  /* Devuelve una promesa que contiene los datos del producto en formato JSON. 
                 * Debe manejarse al usar esta función para acceder a los datos del producto.*/
            })
            .catch(error => {
                console.log("Error al obtener datos " + error);
            });
}



function verEmpleadoSeleccionado(event) {
    console.log("Hola desde ver empleado");

    let id = recuperarIdEmpleadoSeleccionado(event);

    recuperarIdEmpleado(id).then(
            (empleado) => {

        let verEmpleado = document.getElementById('registroEmpleado');
        console.log(empleado);

        let estatus = '';

        if (empleado.activoEmpleado === 1) {
            estatus = 'Activo';
        } else {
            estatus = 'Inactivo';
        }

        let registro = `<tr>
                                <td class="fw-bold registro">Nombre:</td>
                                <td class ="registro">${empleado.personaEmpleado.nombrePersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Apellido Paterno:</td>
                                <td class ="registro">${empleado.personaEmpleado.apellidoPaternoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Apellido Materno:</td>
                                <td class ="registro">${empleado.personaEmpleado.apellidoMaternoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Género:</td>
                                <td class ="registro">${empleado.personaEmpleado.generoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Fecha de Nacimiento:</td>
                                <td class ="registro">${empleado.personaEmpleado.fechaNacimientoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">RFC:</td>
                                <td class ="registro">${empleado.personaEmpleado.rfcPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">CURP:</td>
                                <td class ="registro">${empleado.personaEmpleado.curpPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Domicilio:</td>
                                <td class ="registro">${empleado.personaEmpleado.domicilioPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Código Postal:</td>
                                <td class ="registro">${empleado.personaEmpleado.codigoPostalPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Ciudad:</td>
                                <td class ="registro">${empleado.personaEmpleado.ciudadPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Estado:</td>
                                <td class ="registro">${empleado.personaEmpleado.estadoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Teléfono:</td>
                                <td class ="registro">${empleado.personaEmpleado.telefonoPersona}</td>
                            </tr>
                            <tr>
                                <td class="fw-bold registro">Estatus:</td>
                                <td class ="registro">${estatus}</td>
                            </tr>`;

        verEmpleado.innerHTML = registro;

    });


}


function generarTablaEmpleado(arreglo) {

    let sucursalHTML = "";
    arreglo.forEach(function (empleado) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
        let estatus = "";
        if (empleado.activoEmpleado === 1) {
            estatus = "Activo";
        } else if (empleado.activoEmpleado === 0) {
            estatus = "Inactivo";
        }


        sucursalHTML +=
                ` <tr>
                                <td class="registro alinearTexto" scope="row">${empleado.idEmpleado}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.nombrePersona}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.apellidoPaternoPersona}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.apellidoMaternoPersona}</td>
                                <td class=" registro alinearTexto">${estatus}</td>
                                <td class="registro"> ${cargarBotonesEmpleado()} </td>
                            </tr> `;

        document.getElementById("registrosEmpleado").innerHTML = sucursalHTML;  /*Seleccionamos un elemento  HTML para reemplazar 
         su contenido con el valor de la variable pacientesHTML.  */
    });
}

// Esta es una variable bandera que nos indica si la alerta ya se mostro, ya que se tardan en mostrar los registros cuando se inicia la pagina, 
// pero despues no, por eso no siempre se muestrara la alerta
let alertaMostradaEmpleado = false;


function mostrarRegistrosEmpleado() {

    if (!alertaMostradaEmpleado) {
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
        alertaMostradaEmpleado = true;
    }


    let url = 'http://localhost:8080/sicefa/api/empleado/getAll';

    fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
                return respuesta.json();
            })
            .then(function (cuerpo) {
                console.log(cuerpo);
                generarTablaEmpleado(cuerpo);
            });

}


function cargarBotonesEmpleado() {
    let botones = `<div class="d-flex justify-content-center flex-wrap align-content-center">
                                        <!-- Button trigger modal -->
                                        <button class="btn btn-icon btn-lg" onclick="verEmpleadoSeleccionado(event)"
                                                data-bs-toggle="modal" data-bs-target="#verEmpleado"><i
                                                class="bi bi-eye"></i></button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="verEmpleado" tabindex="-1"
                                             aria-labelledby="tituloProductos" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5 fw-bold" id="tituloProductos">Detalles Empleado</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body p-lg-4">

                                                        <table class="table table-borderless   tablaRegistros">
                                                            <tbody id="registroEmpleado">
                                                                <tr>
                                                                   
                                                                </tr>
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
                                            <button  class="btn btn-icon btn-lg" onclick="editarEmpleado()"
                                                     data-bs-toggle="modal" data-bs-target="#editarEmpleado"><i class="bi bi-pencil-square"></i></button>

                                            <div class="modal fade" id="editarEmpleado" tabindex="-1" aria-labelledby="tituloEmpleados"
                                                 aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5 fw-bold" id="tituloEmpleados">Editar Empleado</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                    aria-label="Close"></button>
                                                        </div>
                                                            <div class="modal-body fondoModal p-lg-4">
                                                                <div class="mb-3">
                                                                <label for="txtNombre" class="form-label">Nombre</label>
                                                                <input type="text" class="form-control" id="txtNombre">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtApellidoPaterno" class="form-label">Apellido Paterno</label>
                                                                <input type="text" class="form-control" id="txtApellidoPaterno">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtApellidoMaterno" class="form-label">Apellido Materno</label>
                                                                <input type="text" class="form-control" id="txtApellidoMaterno">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="mt-2">Género:</label>
                                                                <select class="form-select form-select-sm col-md-6 p-2" id="txtGenero" name="txtGenero">
                                                                    <option value="H">Masculino</option>
                                                                    <option value="M">Femenino</option>
                                                                    <option value="O">Otro</option>
                                                                </select>
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtRfc" class="form-label">RFC</label>
                                                                <input type="text" class="form-control" id="txtRfc">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtFechaNacimiento" class="form-label">Fecha de nacimiento</label>
                                                                <input type="date" class="form-control" id="txtFechaNacimiento">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtCurp" class="form-label">CURP</label>
                                                                <input type="text" class="form-control" id="txtCurp">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="flFoto" class="form-label">Foto</label>
                                                                <input class="form-control" id="flFoto" type="file">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtDomicilio" class="form-label">Domicilio</label>
                                                                <input type="text" class="form-control" id="txtDomicilio">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtCodigoPostal" class="form-label">C.P</label>
                                                                <input type="number" class="form-control" id="txtCodigoPostal">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtCiudad" class="form-label">Ciudad</label>
                                                                <input type="text" class="form-control" id="txtCiudad">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtEstado" class="form-label">Estado</label>
                                                                <input type="text" class="form-control" id="txtEstado">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtTelefono" class="form-label">Telefono</label>
                                                                <input type="text" class="form-control" id="txtTelefono">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtPuesto" class="form-label">Puesto</label>
                                                                <input type="text" class="form-control" id="txtPuesto">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtSalarioBruto" class="form-label">Salario bruto mensual</label>
                                                                <input type="number" class="form-control" id="txtSalarioBruto">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtEmail" class="form-label">Email</label>
                                                                <input type="text" class="form-control" id="txtEmail">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtRol" class="form-label">Rol del empleado</label>
                                                                <input type="text" class="form-control" id="txtRol">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="txtSucursal" class="form-label">Id Sucursal</label>
                                                                <input type="text" class="form-control" id="txtSucursal">
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
                                        <button class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>  `;
    return botones;
}