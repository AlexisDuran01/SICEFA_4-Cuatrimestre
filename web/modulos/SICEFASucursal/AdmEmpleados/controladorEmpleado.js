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
        body: new URLSearchParams({datosEmpleado:JSON.stringify(datosEmpleado)})
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

function generarTablaEmpleado(arreglo){
    
       let sucursalHTML = "";
       arreglo.forEach( function (empleado) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
       let estatus = "";
        if (empleado.activoEmpleado === 1) {
            estatus = "Activo";
        } else if (empleado.activoEmpleado === 0) {
            estatus = "Inactivo";
        }

        
        sucursalHTML+=
                 ` <tr>
                                <td class="registro alinearTexto" scope="row">${empleado.idEmpleado}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.nombrePersona}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.apellidoPaternoPersona}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.apellidoMaternoPersona}</td>
                                <td class=" registro alinearTexto">${estatus}</td>
                                <td class="registro"> ${cargarBotonesEmpleado()} </td>
                            </tr> `  ;
           
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
        .then(function(respuesta) {
            console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
            return respuesta.json();
        })
        .then(function(cuerpo) {
            console.log(cuerpo);
              generarTablaEmpleado(cuerpo);
        });
        
}


function cargarBotonesEmpleado(){
    
   let botones =     `<div class="d-flex justify-content-center flex-wrap align-content-center">
                                        <!-- Button trigger modal -->
                                        <button class="btn btn-icon btn-lg" onclick="verProducto()"
                                                data-bs-toggle="modal" data-bs-target="#verProducto"><i
                                                class="bi bi-eye"></i></button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="verProducto" tabindex="-1"
                                             aria-labelledby="tituloProductos" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5 fw-bold" id="tituloProductos">Detalles
                                                            Producto</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body p-lg-4">

                                                        <table class="table table-borderless   tablaRegistros">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="fw-bold" >Nombre:</td>
                                                                    <td class=" registroVerProducto"></td>
                                                                </tr>
                                                                  <tr>
                                                                    <td class="fw-bold">Nombre Generico:</td>
                                                                    <td class=" registroVerProducto"></td>
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
                                                                <label for="nombre" class="form-label">Nombre</label>
                                                                <input type="text" class="form-control" id="nombre">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="nombreGenerico" class="form-label">Nombre genérico</label>
                                                                <input type="text" class="form-control" id="nombreGenerico">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="formaFarmaceutica" class="form-label">Forma farmacéutica</label>
                                                                <input type="text" class="form-control" id="formaFarmaceutica">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="unidadMedida" class="form-label">Unidad de medida</label>
                                                                <input type="text" class="form-control" id="unidadMedida">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="presentacion" class="form-label">Presentación</label>
                                                                <input type="text" class="form-control" id="presentacion">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="indicacion" class="form-label">Principal indicación</label>
                                                                <input type="text" class="form-control" id="indicacion">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="contraIndicaciones" class="form-label">Contraindicaciones</label>
                                                                <input type="text" class="form-control" id="contraIndicaciones">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="concentracion" class="form-label">Concentración</label>
                                                                <input type="text" class="form-control" id="concentracion">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="unidadesEnvase" class="form-label">Unidades en envase</label>
                                                                <input type="number" class="form-control" id="unidadesEnvase">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="precioCompra" class="form-label">Precio Compra</label>
                                                                <input type="number" class="form-control" id="precioCompra">
                                                            </div>


                                                            <div class="mb-3">
                                                                <label for="precioCompra" class="form-label">Precio Venta</label>
                                                                <input type="number" class="form-control" id="precioCompra">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="formFile" class="form-label">Foto</label>
                                                                <input class="form-control" id="formFileSm" type="file">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="codigoBarras" class="form-label">Código de barras</label>
                                                                <input type="text" class="form-control" id="codigoBarras">
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
                                    </div>  ` ;
    return botones;
}