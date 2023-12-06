/*
    Artifact:    Rest del modulo producto
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
*/

package org.utl.dsm.Rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.Controller.ControllerProducto;
import org.utl.dsm.Model.Producto;


@Path("producto")
public class RestProducto extends Application
{
    
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @GET
    public Response Saludar() {

        String mensaje = """
		{"result":"Hola desde el servicio de gestión de productos - Medicamos tu Vida"}
		""";

        return Response.status(Response.Status.OK).entity(mensaje).build();

    }
    
    @Path("insertarProducto")
    @POST         //Para metodos POST usar "FormParam"
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEmpleado(
            @FormParam("Producto") @DefaultValue("") String p) {
        System.out.println("Producto:" +p );

        String out = null;
        ControllerProducto controlador = new ControllerProducto();
        Gson gson = new Gson(); // Para convertir de objetos a Json
        
        try {
             Producto prod=gson.fromJson(p,   Producto.class);  //Transformamos en Json en un objeto de  java de tipo Producto
            controlador.insertProducto(prod);
            out = """
                                    {"result":"Objeto insertado"}
                        """;
           return Response.status(Response.Status.CREATED).entity(out).build();   //CREATED: Es el estatus de la peticion (codigo: 201), para insercion en base de datos     

        } catch (Exception e) {

            System.out.println(e.getMessage());
         out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
         
                    return Response.status(Response.Status.BAD_REQUEST).entity(out).build();  
        }
        
    }
    
    @Path("registros")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @GET
    public Response obtenerTodo() {

        ControllerProducto controlador = new ControllerProducto();
         ArrayList<Producto> registros= new ArrayList<>();
         
          registros= controlador.obtenerRegistros();
              
        Gson gson = new Gson();
        String salida = gson.toJson(registros);

        return Response.status(Response.Status.OK).entity(salida).build();

    }
    
    
    @Path("obtenerProductoPorId")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @GET
    public Response obtenerRegistroEspecifco(@QueryParam ("idProducto")@DefaultValue("0") int idProducto) {
        
    try {
        ControllerProducto controlador = new ControllerProducto();
        Producto registro = controlador.obtenerRegistroEspecifico(idProducto);

        Gson gson = new Gson();
        String salida="";

        
        if (registro.getIdProducto()==0) {
            salida="""
                    {"result":"Producto no encontrado"}
                  """;
        }else{
            salida= gson.toJson(registro);
        }
       
        return Response.status(Response.Status.OK).entity(salida).build();
        
    } catch (Exception e) {
        // Manejo de la excepción
        return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
    }

    }  
    
   
    @Path("actualizarProducto")
  
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@FormParam("datosProducto") @DefaultValue("{}") String datosProducto)
    {
        String out;
        ControllerProducto controlador = new ControllerProducto();
        Gson gson = new Gson();
        try {
            Producto productoSinActualizar = gson.fromJson(datosProducto, Producto.class);
            System.out.println(productoSinActualizar);
           Producto productoActualizado= controlador.updateProducto(productoSinActualizar);
            System.out.println(productoActualizado);
            out = """
                    {"result":"Producto modificado exitosamente"}
                  """;
                    return Response.status(Response.Status.OK).entity(out).build();

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
                out = """
                    {"result":"Error , favor de intentarlo de nuevo mas tarde"}
                  """;
                   // Manejo de la excepción
                  return Response.status(Response.Status.BAD_REQUEST).entity(ex.getMessage()).build();
        }
    
    }
    
    @Path("deleteProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("datosProducto") @DefaultValue("{}") String datosProducto)
    {
        String out;
        ControllerProducto ce = new ControllerProducto();
        Gson gson = new Gson();
        try {
            Producto producto = gson.fromJson(datosProducto, Producto.class);
            ce.deleteProducto(producto.getIdProducto());
            out = """
                    {"result":"Producto eliminado exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
    
    @Path("searchProducto")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchId(@QueryParam("idProducto") @DefaultValue("0") int idProducto)
    {
        String out;
        ControllerProducto ce = new ControllerProducto();
        Gson gson = new Gson();
        try {
            Producto productoEncontrado = ce.searchProducto(idProducto);
            out = new Gson().toJson(productoEncontrado);
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
    
    @Path("searchProductoNombre")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchNombre(@QueryParam("nombreProducto") @DefaultValue("") String nombreProducto)
    {
        String out;
        ControllerProducto ce = new ControllerProducto();
        Gson gson = new Gson();
        try {
            List<Producto> productoEncontrado = ce.searchProductoNombre(nombreProducto);
            out = new Gson().toJson(productoEncontrado);
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
}

