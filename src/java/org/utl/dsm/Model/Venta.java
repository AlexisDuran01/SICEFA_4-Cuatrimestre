/*
    Artifact:    Modelo Venta
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Venta 
{
    private Integer idVenta;
    private String horaYFechaVenta;
    private Boolean estatus;
    private Cliente clienteVenta;
    private Empleado empleadoVenta;

    public Venta(){}

    public Venta(Integer idVenta, String horaYFechaVenta, Boolean estatus, Cliente clienteVenta, Empleado empleadoVenta) {
        this.idVenta = idVenta;
        this.horaYFechaVenta = horaYFechaVenta;
        this.estatus = estatus;
        this.clienteVenta = clienteVenta;
        this.empleadoVenta = empleadoVenta;
    }

    public Empleado getEmpleadoVenta() {
        return empleadoVenta;
    }

    public void setEmpleadoVenta(Empleado empleadoVenta) {
        this.empleadoVenta = empleadoVenta;
    }

    public Integer getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Integer idVenta) {
        this.idVenta = idVenta;
    }

    public String getHoraYFechaVenta() {
        return horaYFechaVenta;
    }

    public void setHoraYFechaVenta(String horaYFechaVenta) {
        this.horaYFechaVenta = horaYFechaVenta;
    }

    public Boolean getEstatus() {
        return estatus;
    }

    public void setEstatus(Boolean estatus) {
        this.estatus = estatus;
    }

    public Cliente getClienteVenta() {
        return clienteVenta;
    }

    public void setClienteVenta(Cliente clienteVenta) {
        this.clienteVenta = clienteVenta;
    }
    
}