/*
    Artifact:    Controlador del modelo producto
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
*/

package org.utl.dsm.Controller;

import com.mysql.cj.jdbc.CallableStatement;
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
    String query = "CALL sp_insertarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";      
try{
            ConexionMysql connMySQL = new ConexionMysql();

            //Abrimos la conexion con la base de datos
            Connection conn = connMySQL.open();

            //Con este objeto invocaremos al asistente para llenar el query
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);  // El objeto de tipo CallableStatement: se utiliza para ejecutar procedimientos almacenados

            // Pasar los parametros al query
            cstmt.setString(1, p.getNombre());
            cstmt.setString(2, p.getNombreGenerico());
            cstmt.setString(3, p.getFormaFarmaceutica());
            cstmt.setString(4, p.getUnidadMedida());
            cstmt.setString(5, p.getPresentacion());
            cstmt.setString(6, p.getPrincipalIndicacion());
            cstmt.setString(7, p.getContraindicaciones());
            cstmt.setString(8, p.getConcentracion());
            cstmt.setInt(9, p.getUnidadesEnvase());
            cstmt.setFloat(10, p.getPrecioCompra());
            cstmt.setFloat(11, p.getPrecioVenta());
            cstmt.setString(12, p.getCodigoBarras());
            cstmt.execute();
               
            
            // Cerrar todas las instancias abiertas hacia la base de datos (bd)
            cstmt.close();
            conn.close(); // Cerrar la conexion (despues de alguna accion, es recomendable cerrar la conexion)
            connMySQL.close();
            return p;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
    
        //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA  OBTENER TODOS LOS REGISTROS ~~~~~~~~~~~~~~~~~~~~~~~  //

        public ArrayList<Producto> obtenerRegistros() {

        //Consulta que le pasaremos al metodo executeQuery
        String query = "SELECT*FROM (SELECT *FROM producto ORDER BY idProducto DESC  LIMIT 7) AS subConsulta ORDER BY idProducto ASC; ";
        ArrayList<Producto> registrosBaseDeDatos = new ArrayList<>();

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            //Abrimos la conexion con la base de datos
            Connection conexion = connMySQL.open();

            //  Para ejecutar consultas  SQL debemos crear un objeto tipo Statment o PreparedStatment 
        PreparedStatement ejecutorConsulta =conexion.prepareStatement(query);
        
            //Para las intrucciones de tipo SELECT empleamos el método Resulset  executeQuery(String sql).
            ResultSet resultadoConsulta = ejecutorConsulta.executeQuery(query); // Se puede escribir directamente la consulta, pero nosotros lo hacemos con una variable

                  //El metodo next() desplaza el cursor del Resulset una posición hacia delante cada vez que se invoca
            while (resultadoConsulta.next()) {   //Regresa un valor booleano verdadero cuando hay un registro en la siguiente posicion 
                
                //Accedemos a los registros mediante los  metodos "get" Indicando el nombre de la columna, para despues meter el objeto a la lista
                registrosBaseDeDatos.add(fillProducto(resultadoConsulta));
          
            }
            
                // Cerrar todas las instancias abiertas hacia la base de datos (bd)
            ejecutorConsulta.close();
            resultadoConsulta.close();
            conexion.close(); // Cerrar la conexion (despues de alguna accion, es recomendable cerrar la conexion)
            connMySQL.close();
            return registrosBaseDeDatos;
            
        } catch (Exception error) {
            System.out.println(error.getMessage());
             return  null;
        }

    }
        
        
            //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA  OBTENER UN REGISTRO ESPECIFICO ~~~~~~~~~~~~~~~~~~~~~~~  //
   public Producto obtenerRegistroEspecifico(int idProducto) {
    Producto registroEspecifico = new Producto(); // Objeto para almacenar el registro específico
    
    String query = "SELECT * FROM producto WHERE idProducto=?"; // Consulta SQL con un parámetro
    
    try {
        ConexionMysql connMySQL = new ConexionMysql(); // Objeto para manejar la conexión a MySQL
        Connection conexion = connMySQL.open(); // Establecer conexión con la base de datos
        
        // Preparar la consulta SQL con un parámetro utilizando PreparedStatement
        // La interfaz PreparedStatement se utiliza para ejecutar consultas SQL parametrizadas dinámicas.
        // Creamos un objeto PreparedStatement llamado "ejecutorConsulta" para manejar la consulta SQL
        // En esta línea, le indica a MySQL que compile, optimice y prepare la consulta SQL para su ejecución.
        PreparedStatement ejecutorConsulta = conexion.prepareStatement(query);
        
        ejecutorConsulta.setInt(1, idProducto); // Establece el valor del parámetro en la consulta
        
        // Ejecutar la consulta SQL para obtener resultados
        ResultSet resultadoConsulta = ejecutorConsulta.executeQuery(); /* ResulSet es una interfaz en Java que proporciona métodos para recuperar y manipular 
        datos obtenidos como resultado de una consulta SQL.  Esta linea en especifico se utiliza para ejecutar la consulta SQL preparada
        y almacenar los resultados obtenidos en un objeto ResultSet*/
        
        // Iterar a través de los resultados obtenidos
        while (resultadoConsulta.next()) {
            // Llenar el objeto Producto con los datos obtenidos de la consulta
            registroEspecifico = fillProducto(resultadoConsulta);
        }
        return registroEspecifico; // Devolver el registro específico obtenido
        
    } catch (Exception error) {
        System.out.println(error.getMessage()); // Mostrar un mensaje en caso de error
        return null; // Devolver nulo si hay una excepción
    }
}
        
        
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA EDITAR UN PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    
public Producto updateProducto(Producto p) {
    String query = "CALL sp_updateProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    try {
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);

        cstmt.setInt(1, p.getIdProducto());
        cstmt.setString(2, p.getNombre());
        cstmt.setString(3, p.getNombreGenerico());
        cstmt.setString(4, p.getFormaFarmaceutica());
        cstmt.setString(5, p.getUnidadMedida());
        cstmt.setString(6, p.getPresentacion());
        cstmt.setString(7, p.getPrincipalIndicacion());
        cstmt.setString(8, p.getContraindicaciones());
        cstmt.setString(9, p.getConcentracion());
        cstmt.setInt(10, p.getUnidadesEnvase());
        cstmt.setFloat(11, p.getPrecioCompra());
        cstmt.setFloat(12, p.getPrecioVenta());
        cstmt.setString(13, p.getFoto()); // Asegúrate de usar el método correcto para obtener la foto
        cstmt.setString(14, p.getRutaFoto());
        cstmt.setString(15, p.getCodigoBarras());
        cstmt.setInt(16, p.getEstatus());

        cstmt.execute();

        cstmt.close();
        conn.close();
        connMySQL.close();
        return p;
    } catch (Exception e) {
        System.out.println(e.getMessage()); 
        return null;
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
    
        //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA ACTIVAR LOGICAMENTE UN PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public void activarProducto(int idProducto){
        String query = "{CALL sp_activarProducto(?)}";
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
                int v_estatusProducto = rs.getInt(16);
                
                p.setIdProducto(v_idProducto);
                p.setNombre(v_nombreProducto);
                p.setNombreGenerico(v_nombreGenericoProducto);
                p.setFormaFarmaceutica(v_formaFarmaceuticaProducto);
                p.setUnidadMedida(v_unidadMedidaProducto);
                p.setPresentacion(v_presentacionProducto);
                p.setPrincipalIndicacion(v_principalIndicacionProducto);
                p.setContraindicaciones(v_contraindicacionesProducto);
                p.setConcentracion(v_concentracionProducto);
                p.setUnidadesEnvase(v_unidadEnvaseProducto);
                p.setPrecioCompra(v_precioCompraProducto);
                p.setPrecioVenta(v_precioVentaProducto);
                p.setFoto(v_fotoProducto);
                p.setRutaFoto(v_rutaFotoProducto);
                p.setCodigoBarras(v_codigoBarrasProducto);
                p.setEstatus(v_estatusProducto);
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
    p.setNombre(rs.getString("nombre"));
    p.setNombreGenerico(rs.getString("nombreGenerico"));
    p.setFormaFarmaceutica(rs.getString("formaFarmaceutica"));
    p.setUnidadMedida(rs.getString("unidadMedida"));
    p.setPresentacion(rs.getString("presentacion"));
    p.setPrincipalIndicacion(rs.getString("principalIndicacion"));
    p.setContraindicaciones(rs.getString("contraindicaciones"));
    p.setConcentracion(rs.getString("concentracion"));
    p.setUnidadesEnvase(rs.getInt("unidadesEnvase"));
    p.setPrecioCompra(rs.getFloat("precioCompra"));
    p.setPrecioVenta(rs.getFloat("precioVenta"));
    p.setFoto(rs.getString("foto"));
    p.setRutaFoto(rs.getString("rutaFoto"));
    p.setCodigoBarras(rs.getString("codigoBarras"));
    p.setEstatus(rs.getInt("estatus"));
        return p;
    }
   
}