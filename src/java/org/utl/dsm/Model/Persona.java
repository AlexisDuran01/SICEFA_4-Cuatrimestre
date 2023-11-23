/*
    Artifact:    Modelo Cliente
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Persona 
{
    private Integer idPersona;
    private String nombrePersona;
    private String apellidoPaternoPersona;
    private String apellidoMaternoPersona;
    private String generoPersona;
    private String fechaNacimientoPersona;
    private String rfcPersona;
    private String curpPersona;
    private String domicilioPersona;
    private String codigoPostalPersona;
    private String ciudadPersona;
    private String estadoPersona;
    private String telefonoPersona;
    private String fotoPersona;

    public Persona(){}
    
    public Persona(Integer idPersona, String nombrePersona, String apellidoPaternoPersona, String apellidoMaternoPersona, String generoPersona, String fechaNacimientoPersona, String rfcPersona, String curpPersona, String domicilioPersona, String codigoPostalPersona, String ciudadPersona, String estadoPersona, String telefonoPersona, String fotoPersona) {
        this.idPersona = idPersona;
        this.nombrePersona = nombrePersona;
        this.apellidoPaternoPersona = apellidoPaternoPersona;
        this.apellidoMaternoPersona = apellidoMaternoPersona;
        this.generoPersona = generoPersona;
        this.fechaNacimientoPersona = fechaNacimientoPersona;
        this.rfcPersona = rfcPersona;
        this.curpPersona = curpPersona;
        this.domicilioPersona = domicilioPersona;
        this.codigoPostalPersona = codigoPostalPersona;
        this.ciudadPersona = ciudadPersona;
        this.estadoPersona = estadoPersona;
        this.telefonoPersona = telefonoPersona;
        this.fotoPersona = fotoPersona;
    }

    public String getFotoPersona() {
        return fotoPersona;
    }

    public void setFotoPersona(String fotoPersona) {
        this.fotoPersona = fotoPersona;
    }

    public Integer getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(Integer idPersona) {
        this.idPersona = idPersona;
    }

    public String getNombrePersona() {
        return nombrePersona;
    }

    public void setNombrePersona(String nombrePersona) {
        this.nombrePersona = nombrePersona;
    }

    public String getApellidoPaternoPersona() {
        return apellidoPaternoPersona;
    }

    public void setApellidoPaternoPersona(String apellidoPaternoPersona) {
        this.apellidoPaternoPersona = apellidoPaternoPersona;
    }

    public String getApellidoMaternoPersona() {
        return apellidoMaternoPersona;
    }

    public void setApellidoMaternoPersona(String apellidoMaternoPersona) {
        this.apellidoMaternoPersona = apellidoMaternoPersona;
    }

    public String getGeneroPersona() {
        return generoPersona;
    }

    public void setGeneroPersona(String generoPersona) {
        this.generoPersona = generoPersona;
    }

    public String getFechaNacimientoPersona() {
        return fechaNacimientoPersona;
    }

    public void setFechaNacimientoPersona(String fechaNacimientoPersona) {
        this.fechaNacimientoPersona = fechaNacimientoPersona;
    }

    public String getRfcPersona() {
        return rfcPersona;
    }

    public void setRfcPersona(String rfcPersona) {
        this.rfcPersona = rfcPersona;
    }

    public String getCurpPersona() {
        return curpPersona;
    }

    public void setCurpPersona(String curpPersona) {
        this.curpPersona = curpPersona;
    }

    public String getDomicilioPersona() {
        return domicilioPersona;
    }

    public void setDomicilioPersona(String domicilioPersona) {
        this.domicilioPersona = domicilioPersona;
    }

    public String getCodigoPostalPersona() {
        return codigoPostalPersona;
    }

    public void setCodigoPostalPersona(String codigoPostalPersona) {
        this.codigoPostalPersona = codigoPostalPersona;
    }

    public String getCiudadPersona() {
        return ciudadPersona;
    }

    public void setCiudadPersona(String ciudadPersona) {
        this.ciudadPersona = ciudadPersona;
    }

    public String getEstadoPersona() {
        return estadoPersona;
    }

    public void setEstadoPersona(String estadoPersona) {
        this.estadoPersona = estadoPersona;
    }

    public String getTelefonoPersona() {
        return telefonoPersona;
    }

    public void setTelefonoPersona(String telefonoPersona) {
        this.telefonoPersona = telefonoPersona;
    }
}