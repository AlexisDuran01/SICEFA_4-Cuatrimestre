/*
    Artifact:    Modelo Usuario
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Usuario 
{
    private Integer idUsuario;
    private String nombreUsuario;
    private String contraseniaUsuario;
    private String rolUsuario;

    public Usuario() {}

    public Usuario(String rolUsuario) {
        this.rolUsuario = rolUsuario;
    }
    

    public Usuario(Integer idUsuario, String nombreUsuario, String contraseniaUsuario, String rolUsuario) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.contraseniaUsuario = contraseniaUsuario;
        this.rolUsuario = rolUsuario;
    }
    
    public Usuario(String nombreUsuario, String contraseniaUsuario, String rolUsuario) {
        this.nombreUsuario = nombreUsuario;
        this.contraseniaUsuario = contraseniaUsuario;
        this.rolUsuario = rolUsuario;
    }

    public String getRolUsuario() {
        return rolUsuario;
    }

    public void setRolUsuario(String rolUsuario) {
        this.rolUsuario = rolUsuario;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContraseniaUsuario() {
        return contraseniaUsuario;
    }

    public void setContraseniaUsuario(String contraseniaUsuario) {
        this.contraseniaUsuario = contraseniaUsuario;
    }
    
}