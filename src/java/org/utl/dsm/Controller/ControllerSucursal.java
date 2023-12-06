/*
    Artifact:    Controlador del modelo sucursal
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
*/

package org.utl.dsm.Controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.Model.Sucursal;
import org.utl.dsm.db.ConexionMysql;

public class ControllerSucursal 
{
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA INSERTAR UN EMPLEADO ~~~~~~~~~~~~~~~~~~~~~~~  //

    public Sucursal insertSucursal(Sucursal s) {
        String query = "{CALL sp_insertSucursal(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setString(1, s.getNombreSucursal());
            pstm.setString(2, s.getTitularSucursal());
            pstm.setString(3, s.getRfcSucursal());
            pstm.setString(4, s.getDomicilioSucursal());
            pstm.setString(5, s.getColoniaSucursal());
            pstm.setString(6, s.getCodigoPostalSucursal());
            pstm.setString(7, s.getCiudadSucursal());
            pstm.setString(8, s.getEstadoSucursal());
            pstm.setString(9, s.getTelefonoSucursal());
            pstm.setString(10, s.getLatitulSucursal());
            pstm.setString(11, s.getLongitudSucursal());
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
            return s;
        } catch (Exception ex) {
            ex.printStackTrace();
            return s;
        }
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO GETALL ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public List<Sucursal> getAll() throws SQLException{ 
        //La consulta SQL a ejecutar: 
        String sql = "SELECT * FROM viewSucursal";
        //Con este objeto nos vamos a conectar a la Base de Datos: 
        ConexionMysql connMySQL = new ConexionMysql(); 
        //Abrimos la conexión con la Base de Datos: 
        Connection conn = connMySQL.open(); 
        //Con este objeto ejecutaremos la consulta: 
        PreparedStatement pstmt = conn.prepareStatement(sql); 
        //Aquí guardaremos los resultados de la consulta: 
        ResultSet rs = pstmt.executeQuery(); 
        List<Sucursal> sucursales = new ArrayList<>(); 
        while (rs.next()) 
        { 
            sucursales.add(fill(rs)); 
        } 
        rs.close(); 
        pstmt.close(); 
        connMySQL.close(); 
        return sucursales; 
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA LLENAR UNA LISTA DE OBJETOS TIPO SUCURSAL ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Sucursal fill(ResultSet rs) throws SQLException {
        Sucursal s = new Sucursal();
        s.setIdSucursal(rs.getInt("idSucursal"));
        s.setNombreSucursal(rs.getString("nombre"));
        s.setTitularSucursal(rs.getString("titular"));
        s.setRfcSucursal(rs.getString("rfc"));
        s.setDomicilioSucursal(rs.getString("domicilio"));
        s.setColoniaSucursal(rs.getString("colonia"));
        s.setCodigoPostalSucursal(rs.getString("codigoPostal"));
        s.setCiudadSucursal(rs.getString("ciudad"));
        s.setEstadoSucursal(rs.getString("estado"));
        s.setTelefonoSucursal(rs.getString("telefono"));
        s.setLatitulSucursal(rs.getString("latitud"));
        s.setLongitudSucursal(rs.getString("longitud"));
        s.setEstatusSucursal(rs.getInt("estatus"));
        return s;
    }
    
    public Sucursal obtenerRegistroEspecifico(int idSucursal) {
        Sucursal registroEspecifico = new Sucursal();
        String query = "SELECT * FROM viewSucursal WHERE idSucursal = ?";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conexion = connMySQL.open();
            PreparedStatement ejecutorConsulta = conexion.prepareStatement(query);
        
            ejecutorConsulta.setInt(1, idSucursal);
            ResultSet resultadoConsulta = ejecutorConsulta.executeQuery();
            while (resultadoConsulta.next()) {
                registroEspecifico = fill(resultadoConsulta);
            }
            return registroEspecifico;
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return null; 
        }
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA ELIMINAR LOGICAMENTE UNA SUCURSAL ~~~~~~~~~~~~~~~~~~~~~~~  //
    public void deleteSucursal(int id) {
        String query = "{CALL sp_deleteSucursal(?)}";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, id);
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA MODIFICAR UNA SUCURSAL ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Sucursal updateSucursal(Sucursal s) {
        String query = "{CALL sp_updateSucursal(?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, s.getIdSucursal());
            pstm.setString(2, s.getNombreSucursal());
            pstm.setString(3, s.getTitularSucursal());
            pstm.setString(4, s.getRfcSucursal());
            pstm.setString(5, s.getDomicilioSucursal());
            pstm.setString(6, s.getColoniaSucursal());
            pstm.setString(7, s.getCodigoPostalSucursal());
            pstm.setString(8, s.getCiudadSucursal());
            pstm.setString(9, s.getEstadoSucursal());
            pstm.setString(10, s.getTelefonoSucursal());
            pstm.setString(11, s.getLatitulSucursal());
            pstm.setString(12, s.getLongitudSucursal());
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
            return s;
        } catch (Exception ex) {
            ex.printStackTrace();
            return s;
        }
    }
}