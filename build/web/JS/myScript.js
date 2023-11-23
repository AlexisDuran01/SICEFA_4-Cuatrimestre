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
                });
            }
    );
}



function agregarSucursal() {
    let url = "http://localhost:8080/sicefa/api/sucursal/insertSucursal";
    let v_nombre = document.getElementById("txtNombreSucursal").value;
    let v_titular = document.getElementById("txtNombreTitular").value;
    let v_rfc = document.getElementById("txtRfcSucursal").value;
    let v_domicilio = document.getElementById("txtDomicilioSucursal").value;
    let v_colonia = document.getElementById("txtColoniaSucursal").value;
    let v_cp = document.getElementById("txtCodigoPostalSucursal").value;
    let v_ciudad = document.getElementById("txtCiudadSucursal").value;
    let v_estado = document.getElementById("txtEstadoSucursal").value;
    let v_telefono = document.getElementById("txtTelefonoSucursal").value;
    let v_latitud = document.getElementById("txtLatitud").value;
    let v_longitud = document.getElementById("txtLongitud").value;


    let datosSucursal =
            {
                "nombreSucursal": v_nombre,
                "titularSucursal": v_titular,
                "rfcSucursal": v_rfc,
                "domicilioSucursal": v_domicilio,
                "coloniaSucursal": v_colonia,
                "codigoPostalSucursal": v_cp,
                "ciudadSucursal": v_ciudad,
                "estadoSucursal": v_estado,
                "telefonoSucursal": v_telefono,
                "latitulSucursal": v_latitud,
                "longitudSucursal": v_longitud
            };
    console.log(datosSucursal);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({datosSucursal:JSON.stringify(datosSucursal)})
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
                });
                setTimeout(recargarPagina,3500) ;
            }
    );
}
 function recargarPagina() {
    location.reload(true); // El parámetro 'true' fuerza la recarga completa, evitando la caché.
  }



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
        body: new URLSearchParams({datosCliente:JSON.stringify(datosCliente)})
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
                });
            }
    );
}

function generarTabla(arreglo){
    
       let sucursalHTML = "";
       arreglo.forEach( function (sucursal) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
       let estatus = "";
        if (sucursal.estatusSucursal === true) {
            estatus = "Activo";
        } else if (sucursal.estatusSucursal === false) {
            estatus = "Inactivo";
        }

        
        sucursalHTML+=
                 ` <tr>
                                <td class="registro alinearTexto" scope="row">${sucursal.idSucursal}</td>
                                <td class="registro alinearTexto">${sucursal.nombreSucursal}</td>
                                <td class="registro alinearTexto">${sucursal.titularSucursal}</td>
                                <td class="registro alinearTexto">${sucursal.telefonoSucursal}</td>
                                <td class=" registro alinearTexto">${estatus}</td>
                                <td class="registro">
                                    <div class="d-flex justify-content-center flex-wrap align-content-center">

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
                                                                    <td class=" registroVerProducto">${sucursal.nombre}</td>
                                                                </tr>
                                                                  <tr>
                                                                    <td class="fw-bold">Nombre titular:</td>
                                                                    <td class=" registroVerProducto">${sucursal.titularSucursal}</td>
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

                                                            <div>
                                                                <label for="Estatus" class="form-label mb-2">Estatus</label>
                                                                <div class="form-check">
                                                                    <input type="radio" class="form-check-input" id="Activo" name="estatus"
                                                                           checked value="1">Activo
                                                                    <label class="form-check-label" for="Activo"></label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input type="radio" class="form-check-input" id="Inactivo" value="0" 
                                                                           name="estatus">Inactivo
                                                                    <label class="form-check-label" for="Inactivo"></label>
                                                                </div>

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


                                        <div>

                                        </div>


                                        <button class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
         `  
           ;
           
           document.getElementById("registrosSucursal").innerHTML = sucursalHTML;  /*Seleccionamos un elemento  HTML para reemplazar 
             su contenido con el valor de la variable pacientesHTML.  */
    });
}


function mostrarRegistros() {
    

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
                    
    let url = 'http://localhost:8080/sicefa/api/sucursal/getAll';

    fetch(url)
        .then(function(respuesta) {
            console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
            return respuesta.json();
        })
        .then(function(cuerpo) {
            console.log(cuerpo);
              generarTabla(cuerpo);
        });
        
}


function generarTablaEmpleado(arreglo){
    
       let sucursalHTML = "";
       arreglo.forEach( function (empleado) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
       let estatus = "";
        if (empleado.activoEmpleado === true) {
            estatus = "Activo";
        } else if (empleado.activoEmpleado === false) {
            estatus = "Inactivo";
        }

        
        sucursalHTML+=
                 ` <tr>
                                <td class="registro alinearTexto" scope="row">${empleado.idEmpleado}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.nombrePersona}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.apellidoPaternoPersona}</td>
                                <td class="registro alinearTexto">${empleado.personaEmpleado.apellidoMaternoPersona}</td>
                                <td class=" registro alinearTexto">${estatus}</td>
                                <td class="registro">
                                    <div class="d-flex justify-content-center flex-wrap align-content-center">

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
                                                                    <td class=" registroVerProducto">${empleado.personaEmpleado.nombrePersona}</td>
                                                                </tr>
                                                                  <tr>
                                                                    <td class="fw-bold">Nombre titular:</td>
                                                                    <td class=" registroVerProducto">${empleado.personaEmpleado.nombrePersona}</td>
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

                                                            <div>
                                                                <label for="Estatus" class="form-label mb-2">Estatus</label>
                                                                <div class="form-check">
                                                                    <input type="radio" class="form-check-input" id="Activo" name="estatus"
                                                                           checked value="1">Activo
                                                                    <label class="form-check-label" for="Activo"></label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input type="radio" class="form-check-input" id="Inactivo" value="0" 
                                                                           name="estatus">Inactivo
                                                                    <label class="form-check-label" for="Inactivo"></label>
                                                                </div>

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


                                        <div>

                                        </div>


                                        <button class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
         `  
           ;
           
           document.getElementById("registrosEmpleado").innerHTML = sucursalHTML;  /*Seleccionamos un elemento  HTML para reemplazar 
             su contenido con el valor de la variable pacientesHTML.  */
    });
}


function mostrarRegistrosEmpleado() {
    

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

function generarTablaCliente(arreglo){
    
       let sucursalHTML = "";
       arreglo.forEach( function (cliente) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
       let estatus = "";
        if (cliente.estatusCliente === true) {
            estatus = "Activo";
        } else if (cliente.estatusCliente === false) {
            estatus = "Inactivo";
        }

        
        sucursalHTML+=
                 ` <tr>
                                <td class="registro alinearTexto" scope="row">${cliente.idCliente}</td>
                                <td class="registro alinearTexto">${cliente.personaCliente.nombrePersona}</td>
                                <td class="registro alinearTexto">${cliente.personaCliente.apellidoPaternoPersona}</td>
                                <td class="registro alinearTexto">${cliente.personaCliente.apellidoMaternoPersona}</td>
                                <td class=" registro alinearTexto">${estatus}</td>
                                <td class="registro">
                                    <div class="d-flex justify-content-center flex-wrap align-content-center">

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
                                                                    <td class=" registroVerProducto">${cliente.personaCliente.nombrePersona}</td>
                                                                </tr>
                                                                  <tr>
                                                                    <td class="fw-bold">Nombre titular:</td>
                                                                    <td class=" registroVerProducto">${cliente.personaCliente.nombrePersona}</td>
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

                                                            <div>
                                                                <label for="Estatus" class="form-label mb-2">Estatus</label>
                                                                <div class="form-check">
                                                                    <input type="radio" class="form-check-input" id="Activo" name="estatus"
                                                                           checked value="1">Activo
                                                                    <label class="form-check-label" for="Activo"></label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input type="radio" class="form-check-input" id="Inactivo" value="0" 
                                                                           name="estatus">Inactivo
                                                                    <label class="form-check-label" for="Inactivo"></label>
                                                                </div>

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


                                        <div>

                                        </div>


                                        <button class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
         `  
           ;
           
           document.getElementById("registrosCliente").innerHTML = sucursalHTML;  /*Seleccionamos un elemento  HTML para reemplazar 
             su contenido con el valor de la variable pacientesHTML.  */
    });
}


function mostrarRegistrosCliente() {
    

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
                    
    let url = 'http://localhost:8080/sicefa/api/cliente/getAll';

    fetch(url)
        .then(function(respuesta) {
            console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
            return respuesta.json();
        })
        .then(function(cuerpo) {
            console.log(cuerpo);
              generarTablaCliente(cuerpo);
        });
        
}







function agregarProductoFocus() {

    let registroProductos = document.getElementById('registroProductos');
    let  primerCampo = document.getElementById('agregarNombre');

    registroProductos.addEventListener('shown.bs.modal', function () {
        primerCampo.focus();
    });

}
;

function cerrarModal() {
    let modal = document.getElementById('registroProductos');
    modal.classList.remove('show');
    modal.style.display = 'none';
    let backdrop = document.getElementsByClassName('modal-backdrop');
    document.body.removeChild(backdrop[0]);
}

function agregarProducto() {
    console.log("Hola desde agregar productos");
    recuperarDatos();


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
    });

}



function verProducto() {
    console.log("Hola desde ver productos");

}

function editarProducto() {
    console.log("Hola desde editar productos");

}

function eliminarProducto() {
    console.log("Hola desde eliminar productos");

}



function recuperarDatos() {
    let v_nombre = document.getElementById('agregarNombre').value;
    let v_nombreGenerico = document.getElementById('agregarNombreGenerico').value;
    let v_formaFarmaceutica = document.getElementById('agregarFormaFarmaceutica').value;
    let v_unidadMedida = document.getElementById('agregarUnidadMedida').value;
    let v_presentacion = document.getElementById('agregarPresentacion').value;
    let v_indicacion = document.getElementById('agregarIndicacion').value;
    let v_contraIndicaciones = document.getElementById('agregarContraIndicaciones').value;
    let v_concentracion = document.getElementById('agregarConcentracion').value;
    let v_unidadesEnvase = parseInt(document.getElementById('agregarUnidadesEnvase').value);
    let v_precioCompra = parseFloat(document.getElementById('agregarPrecioCompra').value);
    let v_precioVenta = parseFloat(document.getElementById('agregarPrecioVenta').value);
    let v_codigoBarras = document.getElementById('agregarCodigoBarras').value;
    let v_estatus = parseInt(obtenerValorRadio());

    let producto = {
        nombre: v_nombre,
        nombreGenerico: v_nombreGenerico,
        formaFarmaceutica: v_formaFarmaceutica,
        unidadMedida: v_unidadMedida,
        presentacion: v_presentacion,
        indicacion: v_indicacion,
        contraIndicaciones: v_contraIndicaciones,
        concentracion: v_concentracion,
        unidadesEnvase: v_unidadesEnvase,
        precioCompra: v_precioCompra,
        precioVenta: v_precioVenta,
        codigoBarras: v_codigoBarras,
        estatus: v_estatus
    };

    console.log(producto);

    return producto;
}

function obtenerValorRadio() {
    // Obtener todos los elementos de radio con el nombre "estatus" y  almacenar en la variable radios. 
    let  radios = document.getElementsByName('agregarEstatus');
    /*  La colección de elementos de radio se almacena en un (NodeList) devuelto por el método getElementsByName.
     Esta variable es de tipo NodeList, que es una colección de nodos DOM. Puedes acceder a los elementos individuales de esta colección utilizando índices, 
     similar a un arreglo.
     */


    // Variable para almacenar el valor seleccionado
    let valorSeleccionado = null;

    // Iterar sobre los radios
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // Si el radio está marcado, almacenar el valor y salir del bucle
            valorSeleccionado = radios[i].value;
            break;
        }
    }
    console.log(valorSeleccionado);
    return valorSeleccionado;
}

