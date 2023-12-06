/*
    Artifact:    Rest del modelo cliente
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
import java.util.List;
import org.utl.dsm.Controller.ControllerCliente;
import org.utl.dsm.Controller.ControllerProducto;
import org.utl.dsm.Model.Cliente;
import org.utl.dsm.Model.Producto;

@Path("cliente")
public class RestCliente extends Application {

    @Path("insertCliente")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(@FormParam("datosCliente") @DefaultValue("{}") String datosCliente) {
        String out;
        ControllerCliente ce = new ControllerCliente();
        Gson gson = new Gson();
        try {
            Cliente cliente = gson.fromJson(datosCliente, Cliente.class);
            ce.insertCliente(cliente);
            out = """
                    {"result":"Cliente insertado exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }

    @Path("searchClienteId")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchId(@QueryParam("idCliente") @DefaultValue("0") int idCliente) {
        String out;
        ControllerCliente cc = new ControllerCliente();
        Gson gson = new Gson();
        try {
            Cliente clienteEncontrado = cc.searchClienteId(idCliente);
            out = new Gson().toJson(clienteEncontrado);
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }

    @Path("searchClienteNombre")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchNombre(@QueryParam("nombreCliente") @DefaultValue("") String nombreCliente) {
        String out;
        ControllerCliente ce = new ControllerCliente();
        Gson gson = new Gson();
        try {
            List<Cliente> productoEncontrado = ce.searchClienteNombre(nombreCliente);
            out = new Gson().toJson(productoEncontrado);
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
    
    @Path("obtenerClientePorId")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @GET
    public Response obtenerRegistroEspecifco(@QueryParam("idCliente")@DefaultValue("0") int idCliente) {
        
    try {
        ControllerCliente controlador = new ControllerCliente();
        Cliente registro = controlador.obtenerRegistroEspecifico(idCliente);
        
        Gson gson = new Gson();
        String salida="";

        
        if (registro.getIdCliente()==0) {
            salida="""
                    {"result":"Cliente no encontrado"}
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
    
    @Path("eliminarCliente")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @POST
    public Response RegistroEspecifco(@FormParam("idCliente")@DefaultValue("0") int idCliente) {
        System.out.println(idCliente);
    try {
        ControllerCliente controlador = new ControllerCliente();
        Cliente registro = controlador.eliminarRegistroEspecifico(idCliente);
        
        Gson gson = new Gson();
        String salida="";

        
        if (registro.getIdCliente()==0) {
            salida="""
                    {"result":"Cliente eliminado"}
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

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll(){
        String out = null;
        List<Cliente> clientes = null;
        ControllerCliente cc = new ControllerCliente();
        try {
            clientes = cc.getAll();
            out = new Gson().toJson(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            out = """ 
                    {"error":"Ocurrio un error. Intente mas tarde."} 
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
/*
    ~~~~~~~~~~~~ JSON para un cliente ~~~~~~~~~~~~
{
    "idCliente" : "0",
    "emailCliente" : "gabriel@gmail.com",
    "fechaRegistroCliente" : "2023-11-12",
    "estatusCliente" : "1",
    "personaCliente" : {
        "idPersona" : "0",
        "nombrePersona" : "Gabriel",
        "apellidoPaternoPersona" : "Mendiola",
        "apellidoMaternoPersona" : "Garcia",
        "generoPersona" : "H",
        "fechaNacimientoPersona" : "2002-05-15",
        "rfcPersona" : "GFKLDHFJD51",
        "curpPersona" : "GFKLDHFJD515D5F",
        "domicilioPersona" : "Domicilio1",
        "codigoPostalPersona" : "37965",
        "ciudadPersona" : "León",
        "estadoPersona" : "Guanajuato",
        "telefonoPersona" : "4778965423",
        "fotoPersona" : ""
    }
}
*/