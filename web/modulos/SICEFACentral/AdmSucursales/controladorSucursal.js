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
                    timer: 2800,
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
                            
                            mostrarRegistrosSucursal();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                            // para cargar el nuevo registro sin necesidad de recargar la pagina
                        }
                    });
            }
    );
}

// Esta es una variable bandera que nos indica si la alerta ya se mostro, ya que se tardan en mostrar los registros cuando se inicia la pagina, 
// pero despues no, por eso no siempre se muestrara la alerta
let alertaMostradaSucursal = false;

function mostrarRegistrosSucursal() {
    
    if (!alertaMostradaSucursal) {
         Swal.fire({
                        title: 'Cargando Registros',
                        html: 'Un momento porfavor',
                        timer: 1600,
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
        alertaMostradaSucursal = true;
    }
             
                    
    let url = 'http://localhost:8080/sicefa/api/sucursal/getAll';

    fetch(url)
        .then(function(respuesta) {
            console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
            return respuesta.json();
        })
        .then(function(cuerpo) {
            console.log(cuerpo);
              generarTablaSucursal(cuerpo);
        });
        
}

function generarTablaSucursal(arreglo){
       let sucursalHTML = "";
       arreglo.forEach( function (sucursal) {  //Paciente es el objeto donde se almacena temporalmente el objeto en una iteracion
           
       let estatusSucursal = "";
       
        if (sucursal.estatusSucursal ===1) {
            estatusSucursal= "Activo";
        } else if (sucursal.estatusSucursal === 0) {
            estatusSucursal = "Inactivo";
        }        
        sucursalHTML+=
                 ` <tr>
                                <td class="registro alinearTexto" scope="row">${sucursal.idSucursal}</td>
                                <td class="registro alinearTexto">${sucursal.nombreSucursal}</td>
                                <td class="registro alinearTexto">${sucursal.titularSucursal}</td>
                                <td class="registro alinearTexto">${sucursal.telefonoSucursal}</td>
                                <td class=" registro alinearTexto">${estatusSucursal}</td>
                                <td class="registro">${cargarBotonesSucursal()}</td>
                            </tr>
         `  
           ;
           
           document.getElementById("registrosSucursal").innerHTML = sucursalHTML;  /*Seleccionamos un elemento  HTML para reemplazar 
             su contenido con el valor de la variable pacientesHTML.  */
    });
}

function cargarBotonesSucursal(){
    
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