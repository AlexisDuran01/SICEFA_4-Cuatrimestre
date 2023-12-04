/*
    Artifact:    Controlador del modelo usuario
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
*/

package org.utl.dsm.Controller;

import org.utl.dsm.db.ConexionMysql;
import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import org.utl.dsm.Model.Usuario;

public class ControllerUsuario {
    
    public Usuario iniciarSesion(Usuario u) {
        String query = "SELECT * FROM usuario WHERE nombreUsuario LIKE ?";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            // Abrimos la conexión con la Base de Datos:
            Connection conn = connMySQL.open();
            // Con este objeto invocaremos al asistente para llenar el query:
            CallableStatement cstmt = (CallableStatement) conn.prepareCall(query);
            /* Establecemos los parámetros de los dartos personales en el orden
            en que los pide el procedimiento almacenado, comenzado en 1: */
            
              // Pasar los parametros al query:
            cstmt.setString(1, u.getNombreUsuario());
            
         // Ejecutar la llamada al procedimiento almacenado:
             ResultSet resultado = cstmt.executeQuery();
            
            
        if (resultado.next()) {
            int idUsuario = resultado.getInt("idUsuario");
            String nombreUsuario = resultado.getString("nombreUsuario");
            String contrasenia = resultado.getString("contrasenia");
            String rol = resultado.getString("rol");
            
            Usuario us = new Usuario(idUsuario, nombreUsuario, contrasenia, rol);

            // Cerrar todas las instancias abiertas hacia la base de datos
            cstmt.close();
            conn.close();
            connMySQL.close();
            return us;
        } else {
            // No se encontraron resultados, devolver null o lanzar una excepción según sea necesario
            return null;
        }
        } catch (Exception e) {
            e.getMessage();
            System.out.println("NO GUARDÓ LOS DATOS EN LA BD");
            return u;
        }
    }
    
    
}