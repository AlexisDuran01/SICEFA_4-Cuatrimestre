/*
    Artifact:    Modelo Sucursal
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Sucursal 
{
    private Integer idSucursal;
    private String nombreSucursal;
    private String titularSucursal;
    private String rfcSucursal;
    private String domicilioSucursal;
    private String coloniaSucursal;
    private String codigoPostalSucursal;
    private String ciudadSucursal;
    private String estadoSucursal;
    private String telefonoSucursal;
    private String latitulSucursal;
    private String longitudSucursal;
    private Boolean estatusSucursal;

    public Sucursal() {}

    public Sucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }

    public Sucursal(Integer idSucursal, String nombreSucursal, String titularSucursal, String rfcSucursal, String domicilioSucursal, String coloniaSucursal, String codigoPostalSucursal, String ciudadSucursal, String estadoSucursal, String telefonoSucursal, String latitulSucursal, String longitudSucursal, Boolean estatusSucursal) {
        this.idSucursal = idSucursal;
        this.nombreSucursal = nombreSucursal;
        this.titularSucursal = titularSucursal;
        this.rfcSucursal = rfcSucursal;
        this.domicilioSucursal = domicilioSucursal;
        this.coloniaSucursal = coloniaSucursal;
        this.codigoPostalSucursal = codigoPostalSucursal;
        this.ciudadSucursal = ciudadSucursal;
        this.estadoSucursal = estadoSucursal;
        this.telefonoSucursal = telefonoSucursal;
        this.latitulSucursal = latitulSucursal;
        this.longitudSucursal = longitudSucursal;
        this.estatusSucursal = estatusSucursal;
    }

    public Sucursal(String nombreSucursal, String titularSucursal, String rfcSucursal, String domicilioSucursal, String coloniaSucursal, String codigoPostalSucursal, String ciudadSucursal, String estadoSucursal, String telefonoSucursal, String latitulSucursal, String longitudSucursal) {
        this.nombreSucursal = nombreSucursal;
        this.titularSucursal = titularSucursal;
        this.rfcSucursal = rfcSucursal;
        this.domicilioSucursal = domicilioSucursal;
        this.coloniaSucursal = coloniaSucursal;
        this.codigoPostalSucursal = codigoPostalSucursal;
        this.ciudadSucursal = ciudadSucursal;
        this.estadoSucursal = estadoSucursal;
        this.telefonoSucursal = telefonoSucursal;
        this.latitulSucursal = latitulSucursal;
        this.longitudSucursal = longitudSucursal;
    }
    

    public Boolean getEstatusSucursal() {
        return estatusSucursal;
    }

    public void setEstatusSucursal(Boolean estatusSucursal) {
        this.estatusSucursal = estatusSucursal;
    }

    public Integer getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }

    public String getNombreSucursal() {
        return nombreSucursal;
    }

    public void setNombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
    }

    public String getTitularSucursal() {
        return titularSucursal;
    }

    public void setTitularSucursal(String titularSucursal) {
        this.titularSucursal = titularSucursal;
    }

    public String getRfcSucursal() {
        return rfcSucursal;
    }

    public void setRfcSucursal(String rfcSucursal) {
        this.rfcSucursal = rfcSucursal;
    }

    public String getDomicilioSucursal() {
        return domicilioSucursal;
    }

    public void setDomicilioSucursal(String domicilioSucursal) {
        this.domicilioSucursal = domicilioSucursal;
    }

    public String getColoniaSucursal() {
        return coloniaSucursal;
    }

    public void setColoniaSucursal(String coloniaSucursal) {
        this.coloniaSucursal = coloniaSucursal;
    }

    public String getCodigoPostalSucursal() {
        return codigoPostalSucursal;
    }

    public void setCodigoPostalSucursal(String codigoPostalSucursal) {
        this.codigoPostalSucursal = codigoPostalSucursal;
    }

    public String getCiudadSucursal() {
        return ciudadSucursal;
    }

    public void setCiudadSucursal(String ciudadSucursal) {
        this.ciudadSucursal = ciudadSucursal;
    }

    public String getEstadoSucursal() {
        return estadoSucursal;
    }

    public void setEstadoSucursal(String estadoSucursal) {
        this.estadoSucursal = estadoSucursal;
    }

    public String getTelefonoSucursal() {
        return telefonoSucursal;
    }

    public void setTelefonoSucursal(String telefonoSucursal) {
        this.telefonoSucursal = telefonoSucursal;
    }

    public String getLatitulSucursal() {
        return latitulSucursal;
    }

    public void setLatitulSucursal(String latitulSucursal) {
        this.latitulSucursal = latitulSucursal;
    }

    public String getLongitudSucursal() {
        return longitudSucursal;
    }

    public void setLongitudSucursal(String longitudSucursal) {
        this.longitudSucursal = longitudSucursal;
    }
    
}