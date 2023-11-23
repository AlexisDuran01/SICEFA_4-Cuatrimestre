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
import java.util.List;
import org.utl.dsm.Controller.ControllerProducto;
import org.utl.dsm.Model.Producto;


@Path("producto")
public class RestProducto extends Application
{
    @Path("insertProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(@FormParam("datosProducto") @DefaultValue("{}") String datosProducto)
    {
        String out;
        ControllerProducto ce = new ControllerProducto();
        Gson gson = new Gson();
        try {
            Producto producto = gson.fromJson(datosProducto, Producto.class);
            ce.insertProducto(producto);
            out = """
                    {"result":"Producto insertado exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
    }
    
    @Path("updateProducto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@FormParam("datosProducto") @DefaultValue("{}") String datosProducto)
    {
        String out;
        ControllerProducto ce = new ControllerProducto();
        Gson gson = new Gson();
        try {
            Producto producto = gson.fromJson(datosProducto, Producto.class);
            ce.updateProducto(producto);
            out = """
                    {"result":"Producto modificado exitosamente"}
                  """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                    {"result":"Error en el servidor, favor de intentarlo de nuevo mas tarde"}
                  """;
        }
        return Response.ok(out).build();
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

/*
    ~~~~~~~~~~~~ JSON para un producto ~~~~~~~~~~~~
{
    "idProducto" : "0",
    "nombreProducto" : "Lenalidomida",
    "nombreGenericoProducto" : "Lenalidomida",
    "formaFarmaceuticaProducto" : "cápsula",
    "unidadMedidaProducto" : "Cápsula",
    "presentacionProducto" : "Envase con 21 cápsulas.",
    "principalIndicacionProducto" : "1. Mieloma múltiple refractario.",
    "contraindicacionesProducto" : "Hipersensibilidad al fármaco. Embarazo, mujeres con capacidad de gestación que no cumplan con métodos anticonceptivos de un programa para prevención del embarazo, lactación.",
    "concentracionProducto" : "20 mg",
    "unidadEnvaseProducto" : "21",
    "precioCompraProducto" : "635.81",
    "precioVentaProducto" : "1057",
    "fotoProducto" : " ",
    "rutaFotoProducto" : " ",
    "codigoBarrasProducto" : " ",
    "estatusProducto" : "1"
}
*/