/*
    Artifact:    Modelo Inventario
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Inventario 
{
    private Integer idInventario;
    private Integer existenciasInventario;
    private Producto productoInventario;
    private Sucursal sucursalInventario;

    public Inventario() {}

    public Inventario(Integer idInventario, Integer existenciasInventario, Producto productoInventario, Sucursal sucursalInventario) {
        this.idInventario = idInventario;
        this.existenciasInventario = existenciasInventario;
        this.productoInventario = productoInventario;
        this.sucursalInventario = sucursalInventario;
    }

    public Sucursal getSucursalInventario() {
        return sucursalInventario;
    }

    public void setSucursalInventario(Sucursal sucursalInventario) {
        this.sucursalInventario = sucursalInventario;
    }

    public Integer getIdInventario() {
        return idInventario;
    }

    public void setIdInventario(Integer idInventario) {
        this.idInventario = idInventario;
    }

    public Integer getExistenciasInventario() {
        return existenciasInventario;
    }

    public void setExistenciasInventario(Integer existenciasInventario) {
        this.existenciasInventario = existenciasInventario;
    }

    public Producto getProductoInventario() {
        return productoInventario;
    }

    public void setProductoInventario(Producto productoInventario) {
        this.productoInventario = productoInventario;
    }
    
}