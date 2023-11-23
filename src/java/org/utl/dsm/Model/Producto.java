/*
    Artifact:    Modelo Producto
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Producto 
{
    private Integer idProducto;
    private String nombreProducto;
    private String nombreGenericoProducto;
    private String formaFarmaceuticaProducto;
    private String unidadMedidaProducto;
    private String presentacionProducto;
    private String principalIndicacionProducto;
    private String contraindicacionesProducto;
    private String concentracionProducto;
    private Integer unidadEnvaseProducto;
    private Float precioCompraProducto;
    private Float precioVentaProducto;
    private String fotoProducto;
    private String rutaFotoProducto;
    private String codigoBarrasProducto;
    private Boolean estatusProducto;

    public Producto() {}

    public Producto(Integer idProducto, String nombreProducto, String nombreGenericoProducto, String formaFarmaceuticaProducto, String unidadMedidaProducto, String presentacionProducto, String principalIndicacionProducto, String contraindicacionesProducto, String concentracionProducto, Integer unidadEnvaseProducto, Float precioCompraProducto, Float precioVentaProducto, String fotoProducto, String rutaFotoProducto, String codigoBarrasProducto, Boolean estatusProducto) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.nombreGenericoProducto = nombreGenericoProducto;
        this.formaFarmaceuticaProducto = formaFarmaceuticaProducto;
        this.unidadMedidaProducto = unidadMedidaProducto;
        this.presentacionProducto = presentacionProducto;
        this.principalIndicacionProducto = principalIndicacionProducto;
        this.contraindicacionesProducto = contraindicacionesProducto;
        this.concentracionProducto = concentracionProducto;
        this.unidadEnvaseProducto = unidadEnvaseProducto;
        this.precioCompraProducto = precioCompraProducto;
        this.precioVentaProducto = precioVentaProducto;
        this.fotoProducto = fotoProducto;
        this.rutaFotoProducto = rutaFotoProducto;
        this.codigoBarrasProducto = codigoBarrasProducto;
        this.estatusProducto = estatusProducto;
    }

    public Boolean getEstatusProducto() {
        return estatusProducto;
    }

    public void setEstatusProducto(Boolean estatusProducto) {
        this.estatusProducto = estatusProducto;
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getNombreGenericoProducto() {
        return nombreGenericoProducto;
    }

    public void setNombreGenericoProducto(String nombreGenericoProducto) {
        this.nombreGenericoProducto = nombreGenericoProducto;
    }

    public String getFormaFarmaceuticaProducto() {
        return formaFarmaceuticaProducto;
    }

    public void setFormaFarmaceuticaProducto(String formaFarmaceuticaProducto) {
        this.formaFarmaceuticaProducto = formaFarmaceuticaProducto;
    }

    public String getUnidadMedidaProducto() {
        return unidadMedidaProducto;
    }

    public void setUnidadMedidaProducto(String unidadMedidaProducto) {
        this.unidadMedidaProducto = unidadMedidaProducto;
    }

    public String getPresentacionProducto() {
        return presentacionProducto;
    }

    public void setPresentacionProducto(String presentacionProducto) {
        this.presentacionProducto = presentacionProducto;
    }

    public String getPrincipalIndicacionProducto() {
        return principalIndicacionProducto;
    }

    public void setPrincipalIndicacionProducto(String principalIndicacionProducto) {
        this.principalIndicacionProducto = principalIndicacionProducto;
    }

    public String getContraindicacionesProducto() {
        return contraindicacionesProducto;
    }

    public void setContraindicacionesProducto(String contraindicacionesProducto) {
        this.contraindicacionesProducto = contraindicacionesProducto;
    }

    public String getConcentracionProducto() {
        return concentracionProducto;
    }

    public void setConcentracionProducto(String concentracionProducto) {
        this.concentracionProducto = concentracionProducto;
    }

    public Integer getUnidadEnvaseProducto() {
        return unidadEnvaseProducto;
    }

    public void setUnidadEnvaseProducto(Integer unidadEnvaseProducto) {
        this.unidadEnvaseProducto = unidadEnvaseProducto;
    }

    public Float getPrecioCompraProducto() {
        return precioCompraProducto;
    }

    public void setPrecioCompraProducto(Float precioCompraProducto) {
        this.precioCompraProducto = precioCompraProducto;
    }

    public Float getPrecioVentaProducto() {
        return precioVentaProducto;
    }

    public void setPrecioVentaProducto(Float precioVentaProducto) {
        this.precioVentaProducto = precioVentaProducto;
    }

    public String getFotoProducto() {
        return fotoProducto;
    }

    public void setFotoProducto(String fotoProducto) {
        this.fotoProducto = fotoProducto;
    }

    public String getRutaFotoProducto() {
        return rutaFotoProducto;
    }

    public void setRutaFotoProducto(String rutaFotoProducto) {
        this.rutaFotoProducto = rutaFotoProducto;
    }

    public String getCodigoBarrasProducto() {
        return codigoBarrasProducto;
    }

    public void setCodigoBarrasProducto(String codigoBarrasProducto) {
        this.codigoBarrasProducto = codigoBarrasProducto;
    }
    
}