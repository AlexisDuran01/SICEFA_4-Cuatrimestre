/*
    Artifact:    Controlador del modelo cliente
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
import org.utl.dsm.Model.Cliente;
import org.utl.dsm.Model.Persona;
import org.utl.dsm.db.ConexionMysql;

public class ControllerCliente {
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA INSERTAR UN CLIENTE ~~~~~~~~~~~~~~~~~~~~~~~  //

    public Cliente insertCliente(Cliente c) {
        String query = "{CALL sp_insertCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setString(1, c.getPersonaCliente().getNombrePersona());
            pstm.setString(2, c.getPersonaCliente().getApellidoPaternoPersona());
            pstm.setString(3, c.getPersonaCliente().getApellidoMaternoPersona());
            pstm.setString(4, c.getPersonaCliente().getGeneroPersona());
            pstm.setString(5, c.getPersonaCliente().getFechaNacimientoPersona());
            pstm.setString(6, c.getPersonaCliente().getRfcPersona());
            pstm.setString(7, c.getPersonaCliente().getCurpPersona());
            pstm.setString(8, c.getPersonaCliente().getDomicilioPersona());
            pstm.setString(9, c.getPersonaCliente().getCodigoPostalPersona());
            pstm.setString(10, c.getPersonaCliente().getCiudadPersona());
            pstm.setString(11, c.getPersonaCliente().getEstadoPersona());
            pstm.setString(12, c.getPersonaCliente().getTelefonoPersona());
            pstm.setString(13, c.getPersonaCliente().getFotoPersona());
            pstm.setString(14, c.getEmailCliente());
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
            return c;
        } catch (Exception e) {
            e.printStackTrace();
            return c;
        }
    }
    
    // Metodo para obtener un registro unico 
    
    public Cliente obtenerRegistroEspecifico(int idCliente){
        Cliente registroEspecifico = new Cliente();
    String query = "SELECT * FROM viewClientes WHERE idCliente = ?";    
    try {
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conexion = connMySQL.open();
        PreparedStatement ejecutorConsulta = conexion.prepareStatement(query);
        ejecutorConsulta.setInt(1, idCliente);

        ResultSet resultadoConsulta = ejecutorConsulta.executeQuery();
            System.out.println(resultadoConsulta);
            
        while (resultadoConsulta.next()) 
        {
            registroEspecifico = fillCliente(resultadoConsulta);
        }
        return registroEspecifico;
    } catch (Exception error) {
        System.out.println(error.getMessage());
        return null;
    }
    }
    
    public Cliente eliminarRegistroEspecifico(int idCliente){
        Cliente registroEspecifico = new Cliente();
    String query = "{CALL sp_eliminarCliente(?)}";    
    try {
        ConexionMysql connMySQL = new ConexionMysql();
        Connection conexion = connMySQL.open();
        PreparedStatement ejecutorConsulta = conexion.prepareStatement(query);
        ejecutorConsulta.setInt(1, idCliente);

        ResultSet resultadoConsulta = ejecutorConsulta.executeQuery();
            System.out.println(resultadoConsulta);
            
        while (resultadoConsulta.next()) 
        {
            registroEspecifico = fillCliente(resultadoConsulta);
        }
        return registroEspecifico;
    } catch (Exception error) {
        System.out.println(error.getMessage());
        return null;
    }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA BUSCAR UN PRODUCTO POR ID ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Cliente searchClienteId(int idCliente){
        String query = "SELECT * FROM viewClientes WHERE idCliente = ?";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setInt(1, idCliente);
            ResultSet rs = pstm.executeQuery();
            Cliente c = new Cliente();
            while (rs.next()) {
                String v_nombre = rs.getString("nombre");
                String v_apellidoP = rs.getString("apellidoPaterno");
                String v_apellidoM = rs.getString("apellidoMaterno");
                String v_genero = rs.getString("genero");
                String v_fechaNac = rs.getString("fechaNacimiento");
                String v_rfc = rs.getString("rfc");
                String v_curp = rs.getString("curp");
                String v_domicilio = rs.getString("domicilio");
                String v_codigoPostal = rs.getString("codigoPostal");
                String v_ciudad = rs.getString("ciudad");
                String v_estado = rs.getString("estado");
                String v_telefono = rs.getString("telefono");
                String v_foto = rs.getString("foto");
                Persona p = new Persona(0, v_nombre, v_apellidoP, v_apellidoM, v_genero, v_fechaNac, v_rfc, v_curp, v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto);
                c.setIdCliente(rs.getInt("idCliente"));
                c.setPersonaCliente(p);
                c.setEmailCliente(rs.getString("email"));
                c.setFechaRegistroCliente(rs.getString("fechaRegistro"));
                c.setEstatusCliente(rs.getInt("estatus"));
            }
            pstm.close();
            conn.close();
            connMySQL.close();
            return c;
        } catch (Exception e) {
            e.printStackTrace();
            Cliente co = new Cliente();
            return co;
        }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA BUSCAR UN CLIENTE POR NOMBRE ~~~~~~~~~~~~~~~~~~~~~~~  //
    public List<Cliente> searchClienteNombre(String nombreCliente) {
        String query = "SELECT * FROM viewClientes WHERE nombre LIKE ?";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setString(1, nombreCliente);
            ResultSet rs = pstm.executeQuery();
            List<Cliente> clientes = new ArrayList<>();
            while (rs.next()) {
                clientes.add(fillCliente(rs));
            }
            pstm.close();
            conn.close();
            connMySQL.close();
            return clientes;
        } catch (Exception e) {
            e.printStackTrace();
            List<Cliente> co = new ArrayList<>();
            return co;
        }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA LLENAR UNA LISTA DE OBJETOS TIPO PRODUCTO ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Cliente fillCliente(ResultSet rs) throws SQLException {
        Cliente c = new Cliente();
        System.out.println(rs.getString("nombre"));
        String v_nombre = rs.getString("nombre");
        String v_apellidoP = rs.getString("apellidoPaterno");
        String v_apellidoM = rs.getString("apellidoMaterno");
        String v_genero = rs.getString("genero");
        String v_fechaNac = rs.getString("fechaNacimiento");
        String v_rfc = rs.getString("rfc");
        String v_curp = rs.getString("curp");
        String v_domicilio = rs.getString("domicilio");
        String v_codigoPostal = rs.getString("codigoPostal");
        String v_ciudad = rs.getString("ciudad");
        String v_estado = rs.getString("estado");
        String v_telefono = rs.getString("telefono");
        String v_foto = rs.getString("foto");
        Persona p = new Persona(0, v_nombre, v_apellidoP, v_apellidoM, v_genero, v_fechaNac, v_rfc, v_curp, v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto);
        c.setIdCliente(rs.getInt("idCliente"));
        c.setPersonaCliente(p);
        c.setEmailCliente(rs.getString("email"));
        c.setFechaRegistroCliente(rs.getString("fechaRegistro"));
        c.setEstatusCliente(rs.getInt("estatus"));
        return c;
    }
    
    
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO GETALL ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public List<Cliente> getAll() throws SQLException{ 
        //La consulta SQL a ejecutar: 
        String sql = "SELECT * FROM viewClientes";
        //Con este objeto nos vamos a conectar a la Base de Datos: 
        ConexionMysql connMySQL = new ConexionMysql(); 
        //Abrimos la conexión con la Base de Datos: 
        Connection conn = connMySQL.open(); 
        //Con este objeto ejecutaremos la consulta: 
        PreparedStatement pstmt = conn.prepareStatement(sql); 
        //Aquí guardaremos los resultados de la consulta: 
        ResultSet rs = pstmt.executeQuery(); 
        List<Cliente> clientes = new ArrayList<>(); 
        while (rs.next()) 
        { 
            clientes.add(fillCliente(rs)); 
        } 
        rs.close(); 
        pstmt.close(); 
        connMySQL.close(); 
        return clientes; 
    }
}
