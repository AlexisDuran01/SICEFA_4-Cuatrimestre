/*
    Artifact:    Modelo Compra
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Compra 
{
    private Integer idCompra;
    private String horaYFechaPedidoCompra;
    private Boolean estatusCompra;
    private Boolean activoCompra;
    private Empleado empleadoCompra;

    public Compra(){}

    public Compra(Integer idCompra, String horaYFechaPedidoCompra, Boolean estatusCompra, Boolean activoCompra, Empleado empleadoCompra) {
        this.idCompra = idCompra;
        this.horaYFechaPedidoCompra = horaYFechaPedidoCompra;
        this.estatusCompra = estatusCompra;
        this.activoCompra = activoCompra;
        this.empleadoCompra = empleadoCompra;
    }

    public Empleado getEmpleadoCompra() {
        return empleadoCompra;
    }

    public void setEmpleadoCompra(Empleado empleadoCompra) {
        this.empleadoCompra = empleadoCompra;
    }

    public Integer getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Integer idCompra) {
        this.idCompra = idCompra;
    }

    public String getHoraYFechaPedidoCompra() {
        return horaYFechaPedidoCompra;
    }

    public void setHoraYFechaPedidoCompra(String horaYFechaPedidoCompra) {
        this.horaYFechaPedidoCompra = horaYFechaPedidoCompra;
    }

    public Boolean getEstatusCompra() {
        return estatusCompra;
    }

    public void setEstatusCompra(Boolean estatusCompra) {
        this.estatusCompra = estatusCompra;
    }

    public Boolean getActivoCompra() {
        return activoCompra;
    }

    public void setActivoCompra(Boolean activoCompra) {
        this.activoCompra = activoCompra;
    }
    
}