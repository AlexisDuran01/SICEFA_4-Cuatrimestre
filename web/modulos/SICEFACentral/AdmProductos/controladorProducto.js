
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


function verProducto(event) {
    console.log("Hola desde ver productos");

    let id = recuperarId(event);

    obtenerProductoPorId(id).then(
            (producto) => {

                console.log(producto);
        let tablaVerProducto = document.getElementById('registroVerProducto');

        let estatus = '';

        if (producto.estatus === 1) {
            estatus = 'Activo';
        } else {
            estatus = 'Inactivo';
        }

             let registro=`<tr>
                                    <td class="fw-bold registro">Nombre:</td>
                                    <td class ="registro">${producto.nombre}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Nombre Genérico:</td>
                                    <td class ="registro">${producto.nombreGenerico}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Forma Farmacéutica:</td>
                                    <td class ="registro">${producto.formaFarmaceutica}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Unidad de Medida:</td>
                                    <td class ="registro">${producto.unidadMedida}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Presentación:</td>
                                    <td class ="registro">${producto.presentacion}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Indicación Principal:</td>
                                    <td class ="registro">${producto.principalIndicacion}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Contraindicaciones:</td>
                                    <td class ="registro">${producto.contraindicaciones}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Concentración:</td>
                                    <td class ="registro">${producto.concentracion}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Unidades por Envase:</td>
                                    <td  class ="registro">${producto.unidadesEnvase}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Precio de Compra:</td>
                                    <td  class ="registro">${producto.precioCompra}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Precio de Venta:</td>
                                    <td class ="registro">${producto.precioVenta}</td>
                                </tr>
                                 <tr>
                                    <td class="fw-bold registro">codigoBarras:</td>
                                    <td class ="registro">${producto.codigoBarras}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold registro">Estatus:</td>
                                    <td  class ="registro">${estatus}</td>
                                </tr>`;
        
        tablaVerProducto.innerHTML=registro;
                            
    });


}

function editarProducto() {
    console.log("Hola desde editar productos");
    let productoEditar=  recuperarDatosEditar();
        
    // Configurar las opciones para una solicitud HTTP
    const requestOptions = {
        method: 'POST', // Utilizar el método POST para enviar datos al servidor
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // Establecer el tipo de contenido como datos de formulario
        body: new URLSearchParams({datosProducto: JSON.stringify(productoEditar)}) // Enviar la cadena de consulta como el cuerpo de la solicitud
    };
  
  
    
     let url = 'http://localhost:8080/sicefa/api/producto/actualizarProducto';
     
      fetch(url, requestOptions).then(       // La función fetch siempre nos devuelve una promesa que hay que manejar
              
            function (respuesta) { 
                         
                         console.log("Estado de la respuesta del servicio editarRegistro:", respuesta.status); // Ejemplo: 201


               if (respuesta.status === 200) {
                    Swal.fire({
                        title: 'Guardando registro',
                        html: 'No cierre la venta porfavor',
                        timer: 1200,
                        timerProgressBar: true,
                        allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
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
                                title: 'Registro editado correctamente',
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                timer: 1500
                            });

                            mostrarRegistrosProductos();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                            // para cargar el nuevo registro sin necesidad de recargar la pagina
                        }
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal! Intentalo más tarde',
                        allowOutsideClick: false
                    });
                }

                return respuesta.json(); //  Accedemos al cuerpo de la respuesta como JSON y devolvemos la promesa                                    
                }
            ).then(
                  function (data){ // Aquí obtenemos la promesa devuelta por respuesta.json() y la almacenamos en la variable data
                // Aquí, data contendrá el cuerpo de la respuesta  como JSON
                console.log(data);
                    }
            );
}



let id;  //Es necesario ya que se da un click automatico despues de dar a la funcion ver y selecciona el primer registros, por eso se necesita una variable global ya que si no se cambia

function establecerValoresInput(event) {
         id = recuperarId(event);
       return obtenerProductoPorId(id).then((producto) => {
        console.log(producto);
        // Establecer los valores de los campos de entrada con los valores del producto
        document.getElementById('editarNombre').value = producto.nombre;
        document.getElementById('editarNombreGenerico').value = producto.nombreGenerico;
        document.getElementById('editarFormaFarmaceutica').value = producto.formaFarmaceutica;
        document.getElementById('editarUnidadMedida').value = producto.unidadMedida;
        document.getElementById('editarPresentacion').value = producto.presentacion;
        document.getElementById('editarIndicacion').value = producto.principalIndicacion;
        document.getElementById('editarContraIndicaciones').value = producto.contraindicaciones;
        document.getElementById('editarConcentracion').value = producto.concentracion;
        document.getElementById('editarUnidadesEnvase').value = producto.unidadesEnvase;
        document.getElementById('editarPrecioCompra').value = producto.precioCompra;
        document.getElementById('editarPrecioVenta').value = producto.precioVenta;
        document.getElementById('editarCodigoBarras').value = producto.codigoBarras;
    });
}

 function recuperarDatosEditar() {   
     
    let v_nombre = document.getElementById('editarNombre').value;
    let v_nombreGenerico =  document.getElementById('editarNombreGenerico').value;
    let v_formaFarmaceutica =document.getElementById('editarFormaFarmaceutica').value;
    let v_unidadMedida =  document.getElementById('editarUnidadMedida').value;
    let v_presentacion =  document.getElementById('editarPresentacion').value ;
    let v_principalIndicacion =  document.getElementById('editarIndicacion').value;
    let v_contraindicaciones = document.getElementById('editarContraIndicaciones').value;
    let v_concentracion = document.getElementById('editarConcentracion').value;
    let v_unidadesEnvase = parseInt(document.getElementById('editarUnidadesEnvase').value);
    let v_precioCompra = parseFloat(document.getElementById('editarPrecioCompra').value);
    let v_precioVenta = parseFloat(document.getElementById('editarPrecioVenta').value);
    let v_codigoBarras = document.getElementById('editarCodigoBarras').value;

     
         
    let productoEditar = {
        idProducto: id,
        nombre: v_nombre,
        nombreGenerico: v_nombreGenerico,
        formaFarmaceutica: v_formaFarmaceutica,
        unidadMedida: v_unidadMedida,
        presentacion: v_presentacion,
        principalIndicacion: v_principalIndicacion,
        contraindicaciones: v_contraindicaciones,
        concentracion: v_concentracion,
        unidadesEnvase: v_unidadesEnvase,
        precioCompra: v_precioCompra,
        foto: "null",
        rutaFoto: "null",
        precioVenta: v_precioVenta,
        codigoBarras: v_codigoBarras,
        estatus:1
    };    
    return productoEditar;
}



function eliminarProducto(event) {
    console.log("Hola desde eliminar productos");
    
        let idProducto = recuperarId(event);
        const requestOptions = {
        method: 'POST', // Utilizar el método POST para enviar datos al servidor
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // Establecer el tipo de contenido como datos de formulario
        body: new URLSearchParams({idProducto: idProducto}) // Enviar la cadena de consulta como el cuerpo de la solicitud
    };
  
    Swal.fire({
        title: '¿Estas seguro de eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
         let url = 'http://localhost:8080/sicefa/api/producto/eliminarProducto';
     
      fetch(url, requestOptions).then(       // La función fetch siempre nos devuelve una promesa que hay que manejar
              
            function (respuesta) { 
                         
                         console.log("Estado de la respuesta del servicio editarRegistro:", respuesta.status); // Ejemplo: 201


               if (respuesta.status === 200) {
                    Swal.fire({
                        title: 'Eliminado registro',
                        html: 'No cierre la venta porfavor',
                        timer: 1200,
                        timerProgressBar: true,
                        allowOutsideClick: true, // Evita que la alerta se cierre al hacer clic fuera de ella
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
                                title: 'Registro eliminado correctamente',
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                timer: 1500
                            });

                            mostrarRegistrosProductos();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                            // para cargar el nuevo registro sin necesidad de recargar la pagina
                        }
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal! Intentalo más tarde',
                        allowOutsideClick: false
                    });
                }

                return respuesta.json(); //  Accedemos al cuerpo de la respuesta como JSON y devolvemos la promesa                                    
                }
            ).then(
                  function (data){ // Aquí obtenemos la promesa devuelta por respuesta.json() y la almacenamos en la variable data
                // Aquí, data contendrá el cuerpo de la respuesta  como JSON
                console.log(data);
                    }
            );
       
        } else if (result.isDismissed) {
            Swal.fire('Acción Cancelada', '', 'error')
          }
      })
}

function activarProducto (event) {
       console.log("Hola desde activar productos");
    
        let idProducto = recuperarId(event);
        const requestOptions = {
        method: 'POST', // Utilizar el método POST para enviar datos al servidor
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // Establecer el tipo de contenido como datos de formulario
        body: new URLSearchParams({idProducto: idProducto}) // Enviar la cadena de consulta como el cuerpo de la solicitud
    };
  
    Swal.fire({
        title: '¿Estas seguro de restaurar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
         let url = 'http://localhost:8080/sicefa/api/producto/activarProducto';
     
      fetch(url, requestOptions).then(       // La función fetch siempre nos devuelve una promesa que hay que manejar
              
            function (respuesta) { 
                         
                         console.log("Estado de la respuesta del servicio editarRegistro:", respuesta.status); // Ejemplo: 201


               if (respuesta.status === 200) {
                    Swal.fire({
                        title: 'Restaurando registro',
                        html: 'No cierre la venta porfavor',
                        timer: 1200,
                        timerProgressBar: true,
                        allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
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
                                title: 'Registro restaurado correctamente',
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                timer: 1500
                            });

                                            mostrarRegistrosProductosInactivos();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                            // para cargar el nuevo registro sin necesidad de recargar la pagina
                        }
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal! Intentalo más tarde',
                        allowOutsideClick: false
                    });
                }

                return respuesta.json(); //  Accedemos al cuerpo de la respuesta como JSON y devolvemos la promesa                                    
                }
            ).then(
                  function (data){ // Aquí obtenemos la promesa devuelta por respuesta.json() y la almacenamos en la variable data
                // Aquí, data contendrá el cuerpo de la respuesta  como JSON
                console.log(data);
                    }
            );
       
        } else if (result.isDismissed) {
            Swal.fire('Acción Cancelada', '', 'error')
          }
      })
}






function recuperarId(event) {
    // Obtener el botón que desencadenó el evento
    let boton = event.currentTarget; //es una propiedad que se utiliza en eventos de JavaScript para referirse al elemento al que se le ha asignado un event listener.

    // Obtener la fila más cercana (padre) al botón clickeado
    let fila = boton.closest('tr');

    // Usar querySelector para seleccionar el primer hijo de la fila (primera celda)
    const primeraCelda = fila.querySelector(':first-child');/*querySelector es un método en JavaScript que se usa para seleccionar un elemento html
     *  utilizando selectores CSS. Este método busca y devuelve el primer elemento que coincida con el selector CSS especificado.*/

    // Obtener el contenido de texto de la primera celda
    const idProducto = primeraCelda.textContent;

    // Mostrar en la consola el contenido de la primera celda (idProducto)
    console.log(idProducto);

    // Devolver el contenido de la primera celda (idProducto)
    return idProducto;
}



function recuperarDatos() {
    
    let v_nombre = document.getElementById('agregarNombre').value;
    let v_nombreGenerico = document.getElementById('agregarNombreGenerico').value;
    let v_formaFarmaceutica = document.getElementById('agregarFormaFarmaceutica').value;
    let v_unidadMedida = document.getElementById('agregarUnidadMedida').value;
    let v_presentacion = document.getElementById('agregarPresentacion').value;
    let v_principalIndicacion = document.getElementById('agregarIndicacion').value;
    let v_contraindicaciones = document.getElementById('agregarContraIndicaciones').value;
    let v_concentracion = document.getElementById('agregarConcentracion').value;
    let v_unidadesEnvase = parseInt(document.getElementById('agregarUnidadesEnvase').value);
    let v_precioCompra = parseFloat(document.getElementById('agregarPrecioCompra').value);
    let v_precioVenta = parseFloat(document.getElementById('agregarPrecioVenta').value);
    let v_codigoBarras = document.getElementById('agregarCodigoBarras').value;

    let producto = {
        nombre: v_nombre,
        nombreGenerico: v_nombreGenerico,
        formaFarmaceutica: v_formaFarmaceutica,
        unidadMedida: v_unidadMedida,
        presentacion: v_presentacion,
        principalIndicacion: v_principalIndicacion,
        contraindicaciones: v_contraindicaciones,
        concentracion: v_concentracion,
        unidadesEnvase: v_unidadesEnvase,
        precioCompra: v_precioCompra,
        foto: "null",
        rutaFoto: "null",
        precioVenta: v_precioVenta,
        codigoBarras: v_codigoBarras
    };
    return producto;
}



// Esta es una variable bandera que nos indica si la alerta ya se mostro, ya que se tardan en mostrar los registros cuando se inicia la pagina, 
// pero despues no, por eso no siempre se muestrara la alerta
let alertaMostradaProducto = false;

function mostrarRegistrosProductos() {

    if (!alertaMostradaProducto) {
        Swal.fire({
            title: 'Cargando Registros',
            html: 'Un momento por favor',
            timer: 2800,
            timerProgressBar: true,
            allowOutsideClick: true,
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
        alertaMostradaProducto = true;
    }

    // Resto del código para obtener los registros y generar la tabla
    let url = 'http://localhost:8080/sicefa/api/producto/registros';
    console.log("Haciendo peticion al servidor");
    fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
                return respuesta.json();
            })
            .then(function (cuerpo) {
                console.log(cuerpo);
                generarTabla(cuerpo);
            })
            .catch(error => {
                console.log("Error al obtener datos " + error);
            });
}


function mostrarRegistrosProductosInactivos() {

    if (!alertaMostradaProducto) {
        Swal.fire({
            title: 'Cargando Registros',
            html: 'Un momento por favor',
            timer: 2800,
            timerProgressBar: true,
            allowOutsideClick: true,
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
        alertaMostradaProducto = true;
    }

    // Resto del código para obtener los registros y generar la tabla
    let url = 'http://localhost:8080/sicefa/api/producto/registros';
    console.log("Haciendo peticion al servidor");
    fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
                return respuesta.json();
            })
            .then(function (cuerpo) {
                console.log(cuerpo);
                generarTablaInactivos(cuerpo);
            })
            .catch(error => {
                console.log("Error al obtener datos " + error);
            });
}

function obtenerProductoPorId(idProducto) {
    let url = 'http://localhost:8080/sicefa/api/producto/obtenerProductoPorId?idProducto=' + idProducto;
    console.log("Haciendo petición al servidor");

    // Realización de la solicitud al servidor utilizando fetch y devolución de una promesa
    return fetch(url)
            .then(function (respuesta) {
                console.log("Estado de la respuesta del servicio ObtenerProductoPorId:", respuesta.status);
                return respuesta.json();  /* Devuelve una promesa que contiene los datos del producto en formato JSON. 
                 * Debe manejarse al usar esta función para acceder a los datos del producto.*/
            })
            .catch(error => {
                console.log("Error al obtener datos " + error);
            });
}



function generarTabla(arreglo) {
    let tablaProductosBody = document.getElementById('registrosProductos');
    let html = ''; // Crea una cadena HTML

    console.log("Generando tabla");
    arreglo.forEach(function (producto) {
        let estatus = '';

        if (producto.estatus === 1) {
            estatus = 'Activo';
             html += `<tr>
            <td class='registro alinearTexto'>${producto.idProducto}</td>
            <td class='registro alinearTexto'>${producto.nombreGenerico}</td>
            <td class='registro alinearTexto'>${producto.precioVenta}</td>
            <td class='registro alinearTexto'>${producto.formaFarmaceutica}</td>
            <td class='registro alinearTexto'>${estatus}</td>
            <td class='registro'>${cargarBotones()}</td>
        </tr>`;
        }
       
    });

    tablaProductosBody.innerHTML = html; // Inserta el HTML en la tabla
}

function generarTablaInactivos(arreglo) {
    let tablaProductosBody = document.getElementById('registrosProductos');
    let html = ''; // Crea una cadena HTML

    console.log("Generando tabla");
    arreglo.forEach(function (producto) {
        let estatus = '';

        if (producto.estatus === 0) {
            estatus = 'Inactivos';
             html += `<tr>
            <td class='registro alinearTexto'>${producto.idProducto}</td>
            <td class='registro alinearTexto'>${producto.nombreGenerico}</td>
            <td class='registro alinearTexto'>${producto.precioVenta}</td>
            <td class='registro alinearTexto'>${producto.formaFarmaceutica}</td>
            <td class='registro alinearTexto'>${estatus}</td>
            <td class='registro'>${cargarBotonRegresar()}</td>
        </tr>`;
        }
       
    });

    tablaProductosBody.innerHTML = html; // Inserta el HTML en la tabla
}


function opcionesSolicitudHTTP() {

    let producto = recuperarDatos();

// Configurar las opciones para una solicitud HTTP
    const requestOptions = {
        method: 'POST', // Utilizar el método POST para enviar datos al servidor
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // Establecer el tipo de contenido como datos de formulario
        body: new URLSearchParams({Producto: JSON.stringify(producto)}) // Enviar la cadena de consulta como el cuerpo de la solicitud
    };

    return requestOptions;
}

function consumirServicioRegistrar() {


    const requestOptions = opcionesSolicitudHTTP();

    let url = 'http://localhost:8080/sicefa/api/producto/insertarProducto';

    fetch(url, requestOptions) //    // La función fetch siempre nos devuelve una promesa que hay que manejar

            .then(function (respuesta) {    // Aquí, obtenemos  la promesa devuelta por la funcion fetch  y la almacenamos en la variable "respuesta" que contiene información sobre la respuesta del servidor

                /*
                 Una respuesta consta de tres partes clave:
                 
                 Línea de estado (Status Line): Esto incluye el código de estado HTTP (como 200 OK, 404 Not Found, 500 Internal Server Error) 
                 Encabezados de respuesta (Response Headers): Son metadatos que proporcionan información sobre la respuesta, como el tipo de contenido, fecha de respuesta, etc
                 Cuerpo de la respuesta (Response Body): Esta es la parte de la respuesta que contiene los datos reales que el servidor envía al cliente o proporciona como respuesta a la solicitud. Puede ser HTML, XML, JSON etc.
                 
                 */
                console.log("Estado de la respuesta del servicio insertarRegistro:", respuesta.status); // Ejemplo: 201


                //Borrar para entender mejor el funcionamiento de fetch
                if (respuesta.status === 201) {
                    Swal.fire({
                        title: 'Guardando registro',
                        html: 'No cierre la venta porfavor',
                        timer: 1200,
                        timerProgressBar: true,
                        allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
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

                            mostrarRegistrosProductos();   //Despues de mostrar el mensaje de que se inserto correctamente el registro, volvemos a llamar a la funcion
                            // para cargar el nuevo registro sin necesidad de recargar la pagina
                        }
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal! Intentalo más tarde',
                        allowOutsideClick: false
                    });
                }

                return respuesta.json(); //  Accedemos al cuerpo de la respuesta como JSON y devolvemos la promesa 
            })
            .then(function (data) {     // Aquí obtenemos la promesa devuelta por respuesta.json() y la almacenamos en la variable data

                // Aquí, data contendrá el cuerpo de la respuesta  como JSON
                console.log(data);
            }
            );


};

function agregarProducto() {
    consumirServicioRegistrar();
    limpiarFormulario();
}





function recargarPagina() {
    location.reload(true); // El parámetro 'true' fuerza la recarga completa, evitando la caché.
}

function limpiarFormulario() {
    document.getElementById('agregarNombre').value = '';
    document.getElementById('agregarNombreGenerico').value = '';
    document.getElementById('agregarFormaFarmaceutica').value = '';
    document.getElementById('agregarUnidadMedida').value = '';
    document.getElementById('agregarPresentacion').value = '';
    document.getElementById('agregarIndicacion').value = '';
    document.getElementById('agregarContraIndicaciones').value = '';
    document.getElementById('agregarConcentracion').value = '';
    document.getElementById('agregarUnidadesEnvase').value = '';
    document.getElementById('agregarPrecioCompra').value = '';
    document.getElementById('agregarPrecioVenta').value = '';
    document.getElementById('agregarCodigoBarras').value = '';
}

function switchEstatus() {
    const switchEstatus = document.getElementById('flexSwitchCheckChecked');
    
    if (switchEstatus.checked) {
        console.log('Registros activos');
         mostrarRegistrosProductos() ;
        
    } else {
        console.log('Registros inactivos');
         mostrarRegistrosProductosInactivos(); 
    }
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

function cargarBotonRegresar() {

    let botones = `
    <div class="d-flex justify-content-center flex-wrap align-content-center mx-4">
        <button onclick="activarProducto(event)" class="btn btn-icon btn-lg "><i class="bi bi-arrow-90deg-left"></i></button>
    </div>
`;
    return botones;
}


function cargarBotones() {

    let botones = `<div class="d-flex justify-content-center flex-wrap align-content-center">
                                        <!-- Button trigger modal -->
                                        <button class="btn btn-icon btn-lg" onclick="verProducto(event)"
                                                data-bs-toggle="modal" data-bs-target="#verProducto"><i
                                                class="bi bi-eye"></i></button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="verProducto" tabindex="-1"
                                             aria-labelledby="tituloProductos" aria-hidden="true">
                                            <div class="modal-dialog  modal-lg modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5 fw-bold" id="tituloProductos">Detalles
                                                            Producto</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body p-lg-4">

                                            <table class="table table-borderless tablaRegistros">
                                            <tbody  id="registroVerProducto">
                                      
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
                                            <button  class="btn btn-icon btn-lg" onclick="establecerValoresInput(event)"
                                                     data-bs-toggle="modal" data-bs-target="#EditarProducto"><i class="bi bi-pencil-square"></i>
                                            </button>

                                            <div class="modal fade" id="EditarProducto" tabindex="-1" aria-labelledby="tituloProductos"
                                                 aria-hidden="true">
                                                <div class="modal-dialog modal-lg modal-dialog-scrollable">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5 fw-bold" id="tituloProductos">Editar Producto</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                    aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body fondoModal p-lg-4">
                                                                 <div class="container">
                                                        <div class="row">
                                                            <!-- Primera Columna -->
                                                            <div  class= "col-6" >  

                                                                <div class="mb-3">
                                                                    <label for="agregarNombre" class="form-label">Nombre</label>
                                                                    <input type="text" class="form-control" id="editarNombre"
                                                                           placeholder="Ejemplo: Paracetamol">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarFormaFarmaceutica" class="form-label">Forma farmacéutica</label>
                                                                    <input type="text" class="form-control" id="editarFormaFarmaceutica"
                                                                           placeholder="Ejemplo: Tableta">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarPresentacion" class="form-label">Presentación</label>
                                                                    <input type="text" class="form-control" id="editarPresentacion"
                                                                           placeholder="Ejemplo: Caja de 20 tabletas">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarContraIndicaciones" class="form-label">Contraindicaciones</label>
                                                                    <input type="text" class="form-control" id="editarContraIndicaciones"
                                                                           placeholder="Ejemplo: Para mayores de 3 años">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarUnidadesEnvase" class="form-label">Unidades en envase</label>
                                                                    <input type="number" class="form-control" id="editarUnidadesEnvase"
                                                                           placeholder="Ejemplo: 30">
                                                                </div> 

                                                                <div class="mb-3">
                                                                    <label for="agregarPrecioVenta" class="form-label">Precio Venta</label>
                                                                    <input type="number" class="form-control" id="editarPrecioVenta"
                                                                           placeholder="Ejemplo: 5.99">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarCodigoBarras" class="form-label">Código de barras</label>
                                                                    <input type="text" class="form-control" id="editarCodigoBarras"
                                                                           placeholder="Ejemplo: 7508203003178">
                                                                </div>
                                                            </div> 

                                                            <!-- Segunda Columna -->
                                                            <div  class= "col-6" > 

                                                                <div class="mb-3">
                                                                    <label for="agregarNombreGenerico" class="form-label">Nombre genérico</label>
                                                                    <input type="text" class="form-control" id="editarNombreGenerico"
                                                                           placeholder="Ejemplo: Acetaminofén">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarUnidadMedida" class="form-label">Unidad de medida</label>
                                                                    <input type="text" class="form-control" id="editarUnidadMedida"
                                                                           placeholder="Ejemplo: Miligramos">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarIndicacion" class="form-label">Principal indicación</label>
                                                                    <input type="text" class="form-control" id="editarIndicacion"
                                                                           placeholder="Ejemplo: Alivio del dolor">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarConcentracion" class="form-label">Concentración</label>
                                                                    <input type="text" class="form-control" id="editarConcentracion"
                                                                           placeholder="Ejemplo: 500 mg">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarPrecioCompra" class="form-label">Precio Compra</label>
                                                                    <input type="number" class="form-control" id="editarPrecioCompra"
                                                                           placeholder="Ejemplo: 2.99">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="agregarFoto" class="form-label">Foto</label>
                                                                    <input class="form-control" id="editarFoto" type="file">
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </div>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                    data-bs-dismiss="modal">Cerrar</button>
                                                            <button  class="btn btn-primary"  onclick="editarProducto()" data-bs-dismiss="modal">Guardar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <button onclick="eliminarProducto(event)" class="btn btn-icon btn-lg"><i class="bi bi bi-trash"></i></button>
                                    </div>  `;
    return botones;
}



