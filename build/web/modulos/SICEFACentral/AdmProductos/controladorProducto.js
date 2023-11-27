
function agregarProductoFocus() {

    let registroProductos = document.getElementById('registroProductos');
    let  primerCampo = document.getElementById('agregarNombre');

    registroProductos.addEventListener('shown.bs.modal', function () {
        primerCampo.focus();
    });

};

function cerrarModal() {
    let modal = document.getElementById('registroProductos');
    modal.classList.remove('show');
    modal.style.display = 'none';
    let backdrop = document.getElementsByClassName('modal-backdrop');
    document.body.removeChild(backdrop[0]);
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
        foto:"null",
        rutaFoto:"null",
        precioVenta: v_precioVenta,
        codigoBarras: v_codigoBarras
    };
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

        // Marcamos la alerta como mostrada 
        alertaMostradaProducto = true;
    }
  
    // Resto del código para obtener los registros y generar la tabla
    let url = 'http://localhost:8080/sicefa/api/producto/registros';
    console.log("Haciendo peticion al servidor");
    fetch(url)
        .then(function(respuesta) {
            console.log("Estado de la respuesta del servicio obtenerRegistros:", respuesta.status);
            return respuesta.json();
        })
        .then(function(cuerpo) {
            console.log(cuerpo);
            generarTabla (cuerpo);
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
        let estado = '';

        if (producto.estatus === 1) {
            estatus = 'Activo';
        } else {
            estatus = 'Inactivo';
        }

        html += `<tr>
            <td class='registro alinearTexto'>${producto.idProducto}</td>
            <td class='registro alinearTexto'>${producto.nombreGenerico}</td>
            <td class='registro alinearTexto'>${producto.precioVenta}</td>
            <td class='registro alinearTexto'>${producto.formaFarmaceutica}</td>
            <td class='registro alinearTexto'>${estatus}</td>
            <td class='registro'>${cargarBotones()}</td>
        </tr>`;
    });

    tablaProductosBody.innerHTML = html; // Inserta el HTML en la tabla
}



function opcionesSolicitudHTTP() {

    let producto = recuperarDatos();
  
// Configurar las opciones para una solicitud HTTP
    const requestOptions = {
        method: 'POST', // Utilizar el método POST para enviar datos al servidor
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // Establecer el tipo de contenido como datos de formulario
       body: new URLSearchParams({ Producto: JSON.stringify(producto) }) // Enviar la cadena de consulta como el cuerpo de la solicitud
    };

    return requestOptions;
}

function consumirServicioRegistrar() {
    

    const requestOptions = opcionesSolicitudHTTP();

    let url = 'http://localhost:8080/sicefa/api/producto/insertarProducto';

fetch(url, requestOptions) //    // La función fetch siempre nos devuelve una promesa que hay que manejar

    .then(  function (respuesta) {    // Aquí, obtenemos  la promesa devuelta por la funcion fetch  y la almacenamos en la variable "respuesta" que contiene información sobre la respuesta del servidor
     
     /*
      Una respuesta consta de tres partes clave:
        
        Línea de estado (Status Line): Esto incluye el código de estado HTTP (como 200 OK, 404 Not Found, 500 Internal Server Error) 
        Encabezados de respuesta (Response Headers): Son metadatos que proporcionan información sobre la respuesta, como el tipo de contenido, fecha de respuesta, etc
        Cuerpo de la respuesta (Response Body): Esta es la parte de la respuesta que contiene los datos reales que el servidor envía al cliente o proporciona como respuesta a la solicitud. Puede ser HTML, XML, JSON etc.
        
      */
                console.log("Estado de la respuesta del servicio insertarRegistro:", respuesta.status); // Ejemplo: 201


                //Borrar para entender mejor el funcionamiento de fetch
                if (respuesta.status===201 ) {
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
    .then(function(data) {     // Aquí obtenemos la promesa devuelta por respuesta.json() y la almacenamos en la variable data

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
    document.getElementById('agregarNombre').value= '';
    document.getElementById('agregarNombreGenerico').value= '';
    document.getElementById('agregarFormaFarmaceutica').value= '';
    document.getElementById('agregarUnidadMedida').value= '';
    document.getElementById('agregarPresentacion').value= '';
    document.getElementById('agregarIndicacion').value= '';
    document.getElementById('agregarContraIndicaciones').value= '';
    document.getElementById('agregarConcentracion').value= '';
    document.getElementById('agregarUnidadesEnvase').value= '';
    document.getElementById('agregarPrecioCompra').value= '';
    document.getElementById('agregarPrecioVenta').value= '';
    document.getElementById('agregarCodigoBarras').value= '';
}

function switchEstatus(){
    
const switchEstatus= document.getElementById('flexSwitchCheckChecked');

 if (switchEstatus.checked) {
        console.log('Registros activos');
    } else {
        console.log('Registros Inactivos');
    }
    
}


function cargarBotones(){
    
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

