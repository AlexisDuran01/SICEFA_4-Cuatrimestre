/*
    Artifact:    Rest del modulo sucursal
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
import org.utl.dsm.Controller.ControllerSucursal;
import org.utl.dsm.Model.Sucursal;

@Path("sucursal")
public class RestSucursal extends Application {

    @Path("insertSucursal")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(@FormParam("datosSucursal") @DefaultValue("{}") String datosSucursal) {
        String out;
        ControllerSucursal cs = new ControllerSucursal();
        Gson gson = new Gson();
        try {
            Sucursal sucursal = gson.fromJson(datosSucursal, Sucursal.class);
            cs.insertSucursal(sucursal);
            out = """
                    {"result":"Sucursal ingresada exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        String out = null;
        List<Sucursal> sucursales = null;
        ControllerSucursal cs = new ControllerSucursal();
        try {
            sucursales = cs.getAll();
            out = new Gson().toJson(sucursales);
        } catch (Exception e) {
            e.printStackTrace();
            out = """ 
                    {"error":"Ocurrio un error. Intente mas tarde."} 
                  """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("insertSucursalDiap")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertDiap(@FormParam("nombreSucursal") @DefaultValue("") String nombre,
            @FormParam("titularSucursal") @DefaultValue("") String titular,
            @FormParam("rfcSucursal") @DefaultValue("") String rfc,
            @FormParam("domicilioSucursal") @DefaultValue("") String domicilio,
            @FormParam("coloniaSucursal") @DefaultValue("") String colonia,
            @FormParam("codigoPostalSucursal") @DefaultValue("") String codigoPostal,
            @FormParam("ciudadSucursal") @DefaultValue("") String ciudad,
            @FormParam("estadoSucursal") @DefaultValue("") String estado,
            @FormParam("telefonoSucursal") @DefaultValue("") String telefono,
            @FormParam("latitudSucursal") @DefaultValue("") String latitud,
            @FormParam("longitudSucursal") @DefaultValue("") String longitud) {
        String out;
        ControllerSucursal cs = new ControllerSucursal();
        Gson gson = new Gson();
        try {
            Sucursal sucursal = new Sucursal(nombre, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud);
            cs.insertSucursal(sucursal);
            out = """
                    {"result":"Sucursal ingresada exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }

    @Path("obtenerSucursalPorId")
    @Produces(MediaType.APPLICATION_JSON)   // Para definir el tipo de dato que va a regresar
    @GET
    public Response obtenerRegistroEspecifco(@QueryParam("idSucursal") @DefaultValue("0") int idSucursal) {

        try {
            ControllerSucursal controlador = new ControllerSucursal();
            Sucursal registro = controlador.obtenerRegistroEspecifico(idSucursal);

            Gson gson = new Gson();
            String salida = "";

            if (registro.getIdSucursal() == 0) {
                salida = """
                    {"result":"Sucursal no encontrado"}
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

    @Path("deleteSucursal")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteSucursal(@FormParam("idSucursal") @DefaultValue("0") int idSucursal) {
        String out;
        ControllerSucursal cs = new ControllerSucursal();
        try {
            cs.deleteSucursal(idSucursal);
            out = """
                    {"result":"Sucursal eliminada exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
    
    
    @Path("updateSucursal")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@FormParam("datosSucursal") @DefaultValue("{}") String datosSucursal) {
        String out;
        ControllerSucursal cs = new ControllerSucursal();
        Gson gson = new Gson();
        try {
            Sucursal sucursal = gson.fromJson(datosSucursal, Sucursal.class);
            cs.updateSucursal(sucursal);
            out = """
                    {"result":"Sucursal modificada exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
}

/*
    ~~~~~~~~~~~~ JSON para una sucursal ~~~~~~~~~~~~
{
    "idSucursal" : "0",
    "nombreSucursal" : "Sucursal Plaza mayor",
    "titularSucursal" : "Medicamos tu vida",
    "rfcSucursal" : "G54D6F6FGS",
    "domicilioSucursal" : "Blvd. Insurgentes #1462",
    "coloniaSucursal" : "Insurgentes",
    "codigoPostalSucursal" : "37589",
    "ciudadSucursal" : "Leon",
    "estadoSucursal" : "Guanajuato",
    "telefonoSucursal" : "4771289567",
    "latitulSucursal" : "-78.923482169",
    "longitudSucursal" : "105.654525546"
}
*/
