/*
    Artifact:    Modelo Detalle de la Venta
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class DetalleVenta
{
    private Integer cantidadDetalleVenta;
    private Float precioDetalleVenta;
    private Producto productoDetalleVenta;
    private Venta ventaDetalleCompra;

    public DetalleVenta() {}

    public DetalleVenta(Integer cantidadDetalleVenta, Float precioDetalleVenta, Producto productoDetalleVenta, Venta ventaDetalleCompra) {
        this.cantidadDetalleVenta = cantidadDetalleVenta;
        this.precioDetalleVenta = precioDetalleVenta;
        this.productoDetalleVenta = productoDetalleVenta;
        this.ventaDetalleCompra = ventaDetalleCompra;
    }

    public Venta getVentaDetalleCompra() {
        return ventaDetalleCompra;
    }

    public void setVentaDetalleCompra(Venta ventaDetalleCompra) {
        this.ventaDetalleCompra = ventaDetalleCompra;
    }

    public Integer getCantidadDetalleVenta() {
        return cantidadDetalleVenta;
    }

    public void setCantidadDetalleVenta(Integer cantidadDetalleVenta) {
        this.cantidadDetalleVenta = cantidadDetalleVenta;
    }

    public Float getPrecioDetalleVenta() {
        return precioDetalleVenta;
    }

    public void setPrecioDetalleVenta(Float precioDetalleVenta) {
        this.precioDetalleVenta = precioDetalleVenta;
    }

    public Producto getProductoDetalleVenta() {
        return productoDetalleVenta;
    }

    public void setProductoDetalleVenta(Producto productoDetalleVenta) {
        this.productoDetalleVenta = productoDetalleVenta;
    }
    
}