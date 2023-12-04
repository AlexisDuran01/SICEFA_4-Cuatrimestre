/*
    Artifact:    Rest del modulo usuario
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
*/

package org.utl.dsm.Rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.Controller.ControllerUsuario;
import org.utl.dsm.Model.Usuario;

@Path("inicioSesion")
public class RestUsuario extends Application {
    
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response login(@QueryParam("nombreUsuario") @DefaultValue("") String usuario,
            @QueryParam("contrasenia") @DefaultValue("") String contrasenia) {
        String out = "{}";
        Usuario us = new Usuario();
        ControllerUsuario cis = new ControllerUsuario();
        Usuario u = new Usuario();

        u.setNombreUsuario(usuario);

        try {
            us = cis.iniciarSesion(u);
            Gson gson = new Gson();

            if (us == null) {
                out = """
                      {"Mensaje": "usuario inexistente"}
                      """;
                return Response.status(Response.Status.CONFLICT).entity(out).build();
            } else if (!contrasenia.equals(us.getContraseniaUsuario())) {
                System.out.println(us.getContraseniaUsuario());
                System.out.println(contrasenia);
                out = """
                      {"Mensaje": "Contraseña incorrecta"}
                      """;
                return Response.status(Response.Status.BAD_GATEWAY).entity(out).build();
            } else {
                out = gson.toJson(us);
                return Response.status(Response.Status.OK).entity(out).build();
            }

        } catch (Exception e) {
            System.out.println("NO SE INSERTÓ EN LA BD");
            e.printStackTrace();
            return Response.status(Response.Status.BAD_REQUEST).entity(out).build();
        }
    }

    
}