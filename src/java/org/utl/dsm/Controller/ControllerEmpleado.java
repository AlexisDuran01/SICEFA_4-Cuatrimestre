/*
    Artifact:    Controlador del modelo empleado
    Date:        07/11/2023
    Author:      "Nombre del diseñador del modulo"
    Email:       "email del diseñador del modulo"
 */
package org.utl.dsm.Controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.Model.Empleado;
import org.utl.dsm.Model.Persona;
import org.utl.dsm.Model.Usuario;
import org.utl.dsm.db.ConexionMysql;

public class ControllerEmpleado {
    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA INSERTAR UN EMPLEADO ~~~~~~~~~~~~~~~~~~~~~~~  //

    public Empleado insertEmpleado(Empleado e) {
        String query = "{CALL sp_insertEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            pstm.setString(1, e.getPersonaEmpleado().getNombrePersona());
            pstm.setString(2, e.getPersonaEmpleado().getApellidoPaternoPersona());
            pstm.setString(3, e.getPersonaEmpleado().getApellidoMaternoPersona());
            pstm.setString(4, e.getPersonaEmpleado().getGeneroPersona());
            pstm.setString(5, e.getPersonaEmpleado().getFechaNacimientoPersona());
            pstm.setString(6, e.getPersonaEmpleado().getRfcPersona());
            pstm.setString(7, e.getPersonaEmpleado().getCurpPersona());
            pstm.setString(8, e.getPersonaEmpleado().getDomicilioPersona());
            pstm.setString(9, e.getPersonaEmpleado().getCodigoPostalPersona());
            pstm.setString(10, e.getPersonaEmpleado().getCiudadPersona());
            pstm.setString(11, e.getPersonaEmpleado().getEstadoPersona());
            pstm.setString(12, e.getPersonaEmpleado().getTelefonoPersona());
            pstm.setString(13, e.getPersonaEmpleado().getFotoPersona());
            pstm.setInt(14, e.getSucursalEmpleado().getIdSucursal());
            pstm.setString(15, e.getUsuarioEmpleado().getRolUsuario());
            pstm.setString(16, e.getPuestoEmpleado());
            pstm.setFloat(17, e.getSalarioBrutoEmpleado());
            pstm.execute();
            pstm.close();
            conn.close();
            connMySQL.close();
            return e;
        } catch (Exception ex) {
            ex.printStackTrace();
            return e;
        }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO UPDATE ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Empleado updateEmpleado(Empleado e) {
        String query = "{CALL sp_updateEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conn = connMySQL.open();
            PreparedStatement pstm = conn.prepareStatement(query);

            pstm.setString(1, e.getPersonaEmpleado().getNombrePersona());
            pstm.setString(2, e.getPersonaEmpleado().getApellidoPaternoPersona());
            pstm.setString(3, e.getPersonaEmpleado().getApellidoMaternoPersona());
            pstm.setString(4, e.getPersonaEmpleado().getGeneroPersona());
            pstm.setString(5, e.getPersonaEmpleado().getFechaNacimientoPersona());
            pstm.setString(6, e.getPersonaEmpleado().getRfcPersona());
            pstm.setString(7, e.getPersonaEmpleado().getCurpPersona());
            pstm.setString(8, e.getPersonaEmpleado().getDomicilioPersona());
            pstm.setString(9, e.getPersonaEmpleado().getCodigoPostalPersona());
            pstm.setString(10, e.getPersonaEmpleado().getCiudadPersona());
            pstm.setString(11, e.getPersonaEmpleado().getEstadoPersona());
            pstm.setString(12, e.getPersonaEmpleado().getTelefonoPersona());
            pstm.setString(13, e.getPersonaEmpleado().getFotoPersona());
            pstm.setInt(14, e.getSucursalEmpleado().getIdSucursal());
            pstm.setString(15, e.getUsuarioEmpleado().getRolUsuario());
            pstm.setString(16, e.getPuestoEmpleado());
            pstm.setFloat(17, e.getSalarioBrutoEmpleado());

            pstm.executeUpdate();
            pstm.close();
            conn.close();
            connMySQL.close();
            return e;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO DELETE ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Empleado eliminarRegistroEspecifico(int idEmpleado) {
        Empleado registroEspecifico = new Empleado();
        String query = "{CALL sp_desactivarEmpleado(?)}";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conexion = connMySQL.open();
            PreparedStatement ejecutorConsulta = conexion.prepareStatement(query);
            ejecutorConsulta.setInt(1, idEmpleado);

            ResultSet resultadoConsulta = ejecutorConsulta.executeQuery();
            System.out.println(resultadoConsulta);

            while (resultadoConsulta.next()) {
                registroEspecifico = fill(resultadoConsulta);
            }
            return registroEspecifico;
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return null;
        }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO VER ~~~~~~~~~~~~~~~~~~~~~~~  //
    
    public Empleado obtenerRegistroEspecifico(int idEmpleado) {
        Empleado registroEspecifico = new Empleado();
        String query = "SELECT * FROM viewEmpleado WHERE idEmpleado = ?";
        try {
            ConexionMysql connMySQL = new ConexionMysql();
            Connection conexion = connMySQL.open();
            PreparedStatement ejecutorConsulta = conexion.prepareStatement(query);
            ejecutorConsulta.setInt(1, idEmpleado);

            ResultSet resultadoConsulta = ejecutorConsulta.executeQuery();
            System.out.println(resultadoConsulta);

            while (resultadoConsulta.next()) {
                registroEspecifico = fill(resultadoConsulta);
            }
            return registroEspecifico;
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return null;
        }
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO GETALL ~~~~~~~~~~~~~~~~~~~~~~~  //
    public List<Empleado> getAll() throws SQLException {
        //La consulta SQL a ejecutar: 
        String sql = "SELECT * FROM viewEmpleado";
        //Con este objeto nos vamos a conectar a la Base de Datos: 
        ConexionMysql connMySQL = new ConexionMysql();
        //Abrimos la conexión con la Base de Datos: 
        Connection conn = connMySQL.open();
        //Con este objeto ejecutaremos la consulta: 
        PreparedStatement pstmt = conn.prepareStatement(sql);
        //Aquí guardaremos los resultados de la consulta: 
        ResultSet rs = pstmt.executeQuery();
        List<Empleado> empleados = new ArrayList<>();
        while (rs.next()) {
            empleados.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return empleados;
    }

    //  ~~~~~~~~~~~~~~~~~~~~~~~ METODO PARA LLENAR UNA LISTA DE OBJETOS TIPO EMPLEADO ~~~~~~~~~~~~~~~~~~~~~~~  //
    public Empleado fill(ResultSet rs) throws SQLException {
        Empleado e = new Empleado();
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

        String v_nombreUsuario = rs.getString("nombreUsuario");
        String v_contraseniaUsuario = rs.getString("contrasenia");
        String v_rolUsuario = rs.getString("rol");
        Usuario u = new Usuario(v_nombreUsuario, v_contraseniaUsuario, v_rolUsuario);

        e.setIdEmpleado(rs.getInt("idEmpleado"));
        e.setCodigoEmpleado(rs.getString("codigo"));
        e.setFechaIngresoEmpleado(rs.getString("fechaIngreso"));
        e.setPuestoEmpleado(rs.getString("puesto"));
        e.setSalarioBrutoEmpleado(rs.getFloat("salarioBruto"));
        e.setActivoEmpleado(rs.getInt("activo"));
        e.setPersonaEmpleado(p);
        e.setUsuarioEmpleado(u);
        return e;
    }
}
