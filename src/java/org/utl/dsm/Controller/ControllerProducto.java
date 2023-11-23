/*
    Artifact:    Controlador del modelo producto
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
*/

package org.utl.dsm.Controller;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.db.ConexionMysql;
import org.utl.dsm.Model.Producto;

public class ControllerProducto 
{
//  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA INSERTAR UN PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public Producto insertProducto(Producto p){
        String query = "{CALL sp_insertProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try{
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setString(1, p.getNombreProducto());
            pstm.setString(2, p.getNombreGenericoProducto());
            pstm.setString(3, p.getFormaFarmaceuticaProducto());
            pstm.setString(4, p.getUnidadMedidaProducto());
            pstm.setString(5, p.getPresentacionProducto());
            pstm.setString(6, p.getPrincipalIndicacionProducto());
            pstm.setString(7, p.getContraindicacionesProducto());
            pstm.setString(8, p.getConcentracionProducto());
            pstm.setInt(9, p.getUnidadEnvaseProducto());
            pstm.setFloat(10, p.getPrecioCompraProducto());
            pstm.setFloat(11, p.getPrecioVentaProducto());
            pstm.setString(12, p.getFotoProducto());
            pstm.setString(13, p.getRutaFotoProducto());
            pstm.setString(14, p.getCodigoBarrasProducto());
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
            return p;
        }catch(Exception e){
            e.printStackTrace();
            return p;
        }
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA EDITAR UN PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public Producto updateProducto(Producto p){
        String query = "{CALL sp_updateProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try{
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, p.getIdProducto());
            pstm.setString(2, p.getNombreProducto());
            pstm.setString(3, p.getNombreGenericoProducto());
            pstm.setString(4, p.getFormaFarmaceuticaProducto());
            pstm.setString(5, p.getUnidadMedidaProducto());
            pstm.setString(6, p.getPresentacionProducto());
            pstm.setString(7, p.getPrincipalIndicacionProducto());
            pstm.setString(8, p.getContraindicacionesProducto());
            pstm.setString(9, p.getConcentracionProducto());
            pstm.setInt(10, p.getUnidadEnvaseProducto());
            pstm.setFloat(11, p.getPrecioCompraProducto());
            pstm.setFloat(12, p.getPrecioVentaProducto());
            pstm.setString(13, p.getFotoProducto());
            pstm.setString(14, p.getRutaFotoProducto());
            pstm.setString(15, p.getCodigoBarrasProducto());
            pstm.setBoolean(16, p.getEstatusProducto());
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
            return p;
        }catch(Exception e){
            e.printStackTrace();
            return p;
        }
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA ELIMINAR LOGICAMENTE UN PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public void deleteProducto(int idProducto){
        String query = "{CALL sp_deleteProducto(?)}";
        try{
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, idProducto);
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA BUSCAR UN PRODUCTO POR ID ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public Producto searchProducto(int idProducto){
        String query = "SELECT * FROM producto WHERE idProducto = ?";
        try{
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, idProducto);
            ResultSet rs = pstm.executeQuery();
            Producto p = new Producto();
            while(rs.next()){
                int v_idProducto = rs.getInt(1);
                String v_nombreProducto = rs.getString(2);
                String v_nombreGenericoProducto = rs.getString(3);
                String v_formaFarmaceuticaProducto = rs.getString(4);
                String v_unidadMedidaProducto = rs.getString(5);
                String v_presentacionProducto = rs.getString(6);
                String v_principalIndicacionProducto = rs.getString(7);
                String v_contraindicacionesProducto = rs.getString(8);
                String v_concentracionProducto = rs.getString(9);
                int v_unidadEnvaseProducto = rs.getInt(10);
                float v_precioCompraProducto = rs.getFloat(11);
                float v_precioVentaProducto = rs.getFloat(12);
                String v_fotoProducto = rs.getString(13);
                String v_rutaFotoProducto = rs.getString(14);
                String v_codigoBarrasProducto = rs.getString(15);
                boolean v_estatusProducto = rs.getBoolean(16);
                
                p.setIdProducto(v_idProducto);
                p.setNombreProducto(v_nombreProducto);
                p.setNombreGenericoProducto(v_nombreGenericoProducto);
                p.setFormaFarmaceuticaProducto(v_formaFarmaceuticaProducto);
                p.setUnidadMedidaProducto(v_unidadMedidaProducto);
                p.setPresentacionProducto(v_presentacionProducto);
                p.setPrincipalIndicacionProducto(v_principalIndicacionProducto);
                p.setContraindicacionesProducto(v_contraindicacionesProducto);
                p.setConcentracionProducto(v_concentracionProducto);
                p.setUnidadEnvaseProducto(v_unidadEnvaseProducto);
                p.setPrecioCompraProducto(v_precioCompraProducto);
                p.setPrecioVentaProducto(v_precioVentaProducto);
                p.setFotoProducto(v_fotoProducto);
                p.setRutaFotoProducto(v_rutaFotoProducto);
                p.setCodigoBarrasProducto(v_codigoBarrasProducto);
                p.setEstatusProducto(v_estatusProducto);
            }
            pstm.close();
            conn.close();
            connMySQL.close();
            return p;
        }catch(Exception e){
            e.printStackTrace();
            Producto po = new Producto();
            return po;
        }
    }
    
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA BUSCAR UN PRODUCTO POR NOMBRE ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public List<Producto> searchProductoNombre(String nombreProducto){
        String query = "SELECT * FROM producto WHERE nombre = ?";
        try{
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setString(1, nombreProducto);
            ResultSet rs = pstm.executeQuery();
            List<Producto> productos = new ArrayList<>();
            while(rs.next()){
                productos.add(fillProducto(rs)); 
            }
            pstm.close();
            conn.close();
            connMySQL.close();
            return productos;
        }catch(Exception e){
            e.printStackTrace();
            List<Producto> po = new ArrayList<>();
            return po;
        }
    }
    
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA LLENAR UNA LISTA DE OBJETOS TIPO PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public Producto fillProducto(ResultSet rs) throws SQLException{
        Producto p = new Producto();
        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombreProducto(rs.getString("nombre"));
        p.setNombreGenericoProducto(rs.getString("nombreGenerico"));
        p.setFormaFarmaceuticaProducto(rs.getString("formaFarmaceutica"));
        p.setUnidadMedidaProducto(rs.getString("unidadMedida"));
        p.setPresentacionProducto(rs.getString("presentacion"));
        p.setPrincipalIndicacionProducto(rs.getString("principalIndicacion"));
        p.setContraindicacionesProducto(rs.getString("contraindicaciones"));
        p.setConcentracionProducto(rs.getString("concentracion"));
        p.setUnidadEnvaseProducto(rs.getInt("unidadesEnvase"));
        p.setPrecioCompraProducto(rs.getFloat("precioCompra"));
        p.setPrecioVentaProducto(rs.getFloat("precioVenta"));
        p.setFotoProducto(rs.getString("foto"));
        p.setRutaFotoProducto(rs.getString("rutaFoto"));
        p.setCodigoBarrasProducto(rs.getString("codigoBarras"));
        p.setEstatusProducto(rs.getBoolean("estatus"));
        return p;
    }
   
}