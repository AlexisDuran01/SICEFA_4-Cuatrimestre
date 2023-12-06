
function agregarProductoFocus() {

    let registroProductos = document.getElementById('registroProductos');
    let primerCampo = document.getElementById('txtNombreSucursal');

    registroProductos.addEventListener('shown.bs.modal', function () {
        primerCampo.focus();
    });

};



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



function verSucursal(event) {
    console.log("Hola desde ver sucursal");

    let idSucursal = recuperarIdSucursal(event);

    obtenerSucursalPorId(idSucursal).then(
            (sucursal) => {

                console.log(sucursal);
        let tablaVerSucursal = document.getElementById('registroVerSucursal');

        let estatus = '';

        if (sucursal.estatusSucursal === 1) {
            estatus = 'Activo';
        } else {
            estatus = 'Inactivo';
        }

             let registro=`<tr>
                                    <td class="fw-bold registro">Nombre:</td>
                                    <td class ="registro">${sucursal.nombreSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Nombre titular:</td>
                                    <td class ="registro">${sucursal.titularSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">RFC:</td>
                                    <td class ="registro">${sucursal.rfcSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Domicilio:</td>
                                    <td class ="registro">${sucursal.domicilioSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Colonia:</td>
                                    <td class ="registro">${sucursal.coloniaSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Codigo postal:</td>
                                    <td class ="registro">${sucursal.codigoPostalSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Ciudad:</td>
                                    <td class ="registro">${sucursal.ciudadSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Estado:</td>
                                    <td class ="registro">${sucursal.estadoSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Telefono:</td>
                                    <td  class ="registro">${sucursal.telefonoSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Latitud:</td>
                                    <td  class ="registro">${sucursal.latitulSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Longitud:</td>
                                    <td class ="registro">${sucursal.longitudSucursal}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Estatus:</td>
                                    <td  class ="registro">${estatus}</td>
                                </tr>`;
        
        tablaVerSucursal.innerHTML=registro;
                            
    });


}
let idSucursal;
function recuperarIdSucursal2(event){
    idSucursal = recuperarIdSucursal(event);
}

function editarSucursal(event){
    url = "http://localhost:8080/sicefa/api/sucursal/updateSucursal";
    console.log("Hola desde actualizar sucursal");
    console.log(idSucursal);
    let v_nombre = document.getElementById("nombre").value;
    let v_titular = document.getElementById("nombreTitular").value;
    let v_rfc = document.getElementById("rfc").value;
    let v_domicilio = document.getElementById("domicilio").value;
    let v_colonia = document.getElementById("colonia").value;
    let v_cp = document.getElementById("codigoPostal").value;
    let v_ciudad = document.getElementById("ciudad").value;
    let v_estado = document.getElementById("estado").value;
    let v_telefono = document.getElementById("telefono").value;
    let v_latitud = document.getElementById("latitud").value;
    let v_longitud = document.getElementById("longitud").value;
    let datosSucursal =
            {
                "idSucursal": idSucursal,
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
                                title: 'Registro modificado correctamente',
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


function eliminar(event){
    console.log("Hola desde eliminar sucursal");

    let idSucursal = recuperarIdSucursal(event);
    
    console.log(idSucursal);
    
    eliminarSucursal(idSucursal);
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

function recuperarIdSucursal(event) {
    // Obtener el botón que desencadenó el evento
    let boton = event.currentTarget; //es una propiedad que se utiliza en eventos de JavaScript para referirse al elemento al que se le ha asignado un event listener.

    // Obtener la fila más cercana (padre) al botón clickeado
    let fila = boton.closest('tr');

    // Usar querySelector para seleccionar el primer hijo de la fila (primera celda)
    const primeraCelda = fila.querySelector(':first-child');/*querySelector es un método en JavaScript que se usa para seleccionar un elemento html
     *  utilizando selectores CSS. Este método busca y devuelve el primer elemento que coincida con el selector CSS especificado.*/

    // Obtener el contenido de texto de la primera celda
    const idSucursal = primeraCelda.textContent;

    // Mostrar en la consola el contenido de la primera celda (idSucursal)
    console.log(idSucursal);

    // Devolver el contenido de la primera celda (idSucursal)
    return idSucursal;
}




function obtenerSucursalPorId(idSucursal) {
    let url = 'http://localhost:8080/sicefa/api/sucursal/obtenerSucursalPorId?idSucursal=' + idSucursal;
    console.log("Haciendo petición al servidor");
    return fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio ObtenerSucursalPorId:", respuesta.status);
                return respuesta.json();
            })
            .catch(error => {
                console.log("Error al obtener datos " + error);
            });
}

function eliminarSucursal(idSucursal) {
    let url = "http://localhost:8080/sicefa/api/sucursal/deleteSucursal";
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({idSucursal:JSON.parse(idSucursal)})
    };
    fetch(url, requestOptions).then(
            function (json) {
                console.log(json);
                Swal.fire({
                    title: 'Guardando registros',
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
                                title: 'Sucursal eliminada exitosamente',
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

function cargarBotonesSucursal(){
    
   let botones =     `<div class="d-flex justify-content-center flex-wrap align-content-center">
                                        <!-- Button trigger modal -->
                                        <button class="btn btn-icon btn-lg" onclick="verSucursal(event)"
                                                data-bs-toggle="modal" data-bs-target="#verSucursal"><i
                                                class="bi bi-eye"></i></button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="verSucursal" tabindex="-1"
                                             aria-labelledby="tituloSucursales" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5 fw-bold" id="tituloSucursales">Detalles
                                                            Sucursal</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body p-lg-4">

                                                        <table class="table table-borderless   tablaRegistros">
                                                            <tbody id="registroVerSucursal">
                                                                
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
                                            <button  class="btn btn-icon btn-lg" 
                                                     data-bs-toggle="modal" data-bs-target="#EditarSucursal" onclick="recuperarIdSucursal2(event)"><i class="bi bi-pencil-square"></i></button>

                                            <div class="modal fade" id="EditarSucursal" tabindex="-1" aria-labelledby="tituloSucursales"
                                                 aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-scrollable">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5 fw-bold" id="tituloSucursales">Editar Sucursal</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                    aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body fondoModal p-lg-4">
                                                            <div class="mb-3">
                                                                <label for="nombre" class="form-label">Nombre</label>
                                                                <input type="text" class="form-control" id="nombre">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="nombreTitular" class="form-label">Nombre titular</label>
                                                                <input type="text" class="form-control" id="nombreTitular">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="rfc" class="form-label">RFC</label>
                                                                <input type="text" class="form-control" id="rfc">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="domicilio" class="form-label">Domicilio</label>
                                                                <input type="text" class="form-control" id="domicilio">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="colonia" class="form-label">Colonia</label>
                                                                <input type="text" class="form-control" id="colonia">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="codigoPostal" class="form-label">Codigo postal</label>
                                                                <input type="number" class="form-control" id="codigoPostal">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="ciudad" class="form-label">Ciudad</label>
                                                                <input type="text" class="form-control" id="ciudad">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="estado" class="form-label">Estado</label>
                                                                <input type="text" class="form-control" id="estado">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="telefono" class="form-label">Telefono</label>
                                                                <input type="text" class="form-control" id="telefono">
                                                            </div>

                                                            <div class="mb-3">
                                                                <label for="latitud" class="form-label">Latitud</label>
                                                                <input type="text" class="form-control" id="latitud">
                                                            </div>


                                                            <div class="mb-3">
                                                                <label for="longitud" class="form-label">Longitud</label>
                                                                <input type="text" class="form-control" id="longitud">
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                    data-bs-dismiss="modal">Cerrar</button>
                                                            <button type="button" class="btn btn-primary" onclick="editarSucursal(event)" data-bs-dismiss="modal">Guardar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <button onclick="eliminar(event)" class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>  ` ;
    return botones;
}



