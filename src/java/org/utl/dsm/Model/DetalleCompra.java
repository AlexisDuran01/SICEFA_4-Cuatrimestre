/*
    Artifact:    Modelo Detalle de la Compra
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class DetalleCompra 
{
    private Integer cantidadDetalleCompra;
    private Float precioDetalleCompra;
    private Compra compraDetalleCompra;
    private Producto productoDetalleCompra;

    public DetalleCompra() {}

    public DetalleCompra(Integer cantidadDetalleCompra, Float precioDetalleCompra, Compra compraDetalleCompra, Producto productoDetalleCompra) {
        this.cantidadDetalleCompra = cantidadDetalleCompra;
        this.precioDetalleCompra = precioDetalleCompra;
        this.compraDetalleCompra = compraDetalleCompra;
        this.productoDetalleCompra = productoDetalleCompra;
    }

    public Producto getProductoDetalleCompra() {
        return productoDetalleCompra;
    }

    public void setProductoDetalleCompra(Producto productoDetalleCompra) {
        this.productoDetalleCompra = productoDetalleCompra;
    }

    public Integer getCantidadDetalleCompra() {
        return cantidadDetalleCompra;
    }

    public void setCantidadDetalleCompra(Integer cantidadDetalleCompra) {
        this.cantidadDetalleCompra = cantidadDetalleCompra;
    }

    public Float getPrecioDetalleCompra() {
        return precioDetalleCompra;
    }

    public void setPrecioDetalleCompra(Float precioDetalleCompra) {
        this.precioDetalleCompra = precioDetalleCompra;
    }

    public Compra getCompraDetalleCompra() {
        return compraDetalleCompra;
    }

    public void setCompraDetalleCompra(Compra compraDetalleCompra) {
        this.compraDetalleCompra = compraDetalleCompra;
    }
    
}