/*
    Artifact:    Rest del modulo empleado
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
import org.utl.dsm.Controller.ControllerEmpleado;
import org.utl.dsm.Model.Cliente;
import org.utl.dsm.Model.Empleado;

@Path("empleado")
public class RestEmpleado extends Application {

    @Path("insertEmpleado")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(@FormParam("datosEmpleado") @DefaultValue("{}") String datosEmpleado) {
        System.out.println("empleado: " + datosEmpleado);
        String out;
        ControllerEmpleado ce = new ControllerEmpleado();
        Gson gson = new Gson();
        try {
            Empleado empleado = gson.fromJson(datosEmpleado, Empleado.class);
            ce.insertEmpleado(empleado);
            out = """
                    {"result":"Empleado insertado exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }

    @Path("updateEmpleado")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEmpleado(@FormParam("datosEmpleado") @DefaultValue("{}") String datosPersona) {
        String out = null;
        ControllerEmpleado ce = null;
        Gson gson = new Gson();

        try {
            //Convertir el json de string a objeto de tipo Persona.
            Empleado empleado = gson.fromJson(datosPersona, Empleado.class);
            ce = new ControllerEmpleado();
            ce.updateEmpleado(empleado);
            out = gson.toJson(empleado);
        } catch (Exception e) {
            out = """
                  {"error" : "Error interno del servidor, intente mas tarde."}
                  """;
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("deleteEmpleado")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarEmpleado(@FormParam("idEmpleado") int idEmpleado) {
        String out = null;
        ControllerEmpleado ce = null;
        Gson gson = new Gson();

        try {
            ce = new ControllerEmpleado();

            // Call the logical deletion method with the employee ID
            ce.eliminarRegistroEspecifico(idEmpleado);

            out = """
              {"message" : "Empleado eliminado de forma lógica correctamente."}
              """;
        } catch (Exception e) {
            out = """
              {"error" : "Error interno del servidor, intente mas tarde."}
              """;
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        String out = null;
        List<Empleado> empleados = null;
        ControllerEmpleado ce = new ControllerEmpleado();
        try {
            empleados = ce.getAll();
            out = new Gson().toJson(empleados);
        } catch (Exception e) {
            e.printStackTrace();
            out = """ 
                    {"error":"Ocurrio un error. Intente mas tarde."} 
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("obtenerEmpleadoPorId")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @GET
    public Response obtenerRegistroEspecifco(@QueryParam("idEmpleado")
            @DefaultValue("0") int idEmpleado) {

        try {
            ControllerEmpleado controlador = new ControllerEmpleado();
            Empleado registro = controlador.obtenerRegistroEspecifico(idEmpleado);

            Gson gson = new Gson();
            String salida = "";

            if (registro.getIdEmpleado() == 0) {
                salida = """
                    {"result":"Empleado no encontrado"}
                  """;
            } else {
                salida = gson.toJson(registro);
            }

            return Response.status(Response.Status.OK).entity(salida).build();

        } catch (Exception e) {
            // Manejo de la excepción
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }

    }
}

/*
    ~~~~~~~~~~~~ JSON para un empleado ~~~~~~~~~~~~
{
    "idEmpleado" : "0",
    "puestoEmpleado" : "Tester",
    "salarioBrutoEmpleado" : "15000.00",
    "personaEmpleado" : {
        "idPersona" : "0",
        "nombrePersona" : "Alexis",
        "apellidoPaternoPersona" : "Duran",
        "apellidoMaternoPersona" : "Alberto",
        "generoPersona" : "H",
        "fechaNacimientoPersona" : "20/06/2004",
        "rfcPersona" : "GFKLDHFJD51",
        "curpPersona" : "GFKLDHFJD515D5F",
        "domicilioPersona" : "Domicilio6",
        "codigoPostalPersona" : "37965",
        "ciudadPersona" : "León",
        "estadoPersona" : "Guanajuato",
        "telefonoPersona" : "4778965423",
        "fotoPersona" : ""
    },
    "usuarioEmpleado" : {
        "rolUsuario":"ADMC"
    },
    "sucursalEmpleado":{
        "idSucursal":"1"
    }
}
 */
