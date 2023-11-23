/*
    Artifact:    Modelo Empleado
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Empleado
{
    private Integer idEmpleado;
    private String codigoEmpleado;
    private String fechaIngresoEmpleado;
    private String puestoEmpleado;
    private Float salarioBrutoEmpleado;
    private Boolean activoEmpleado;
    private Persona personaEmpleado;
    private Usuario usuarioEmpleado;
    private Sucursal sucursalEmpleado;

    public Empleado() {}

    public Empleado(String codigoEmpleado, Float salarioBrutoEmpleado, Persona personaEmpleado, Usuario usuarioEmpleado, Sucursal sucursalEmpleado) {
        this.codigoEmpleado = codigoEmpleado;
        this.salarioBrutoEmpleado = salarioBrutoEmpleado;
        this.personaEmpleado = personaEmpleado;
        this.usuarioEmpleado = usuarioEmpleado;
        this.sucursalEmpleado = sucursalEmpleado;
    }
    

    public Empleado(Integer idEmpleado, String codigoEmpleado, String fechaIngresoEmpleado, String puestoEmpleado, Float salarioBrutoEmpleado, Boolean activoEmpleado, Persona personaEmpleado, Usuario usuarioEmpleado, Sucursal sucursalEmpleado) {
        this.idEmpleado = idEmpleado;
        this.codigoEmpleado = codigoEmpleado;
        this.fechaIngresoEmpleado = fechaIngresoEmpleado;
        this.puestoEmpleado = puestoEmpleado;
        this.salarioBrutoEmpleado = salarioBrutoEmpleado;
        this.activoEmpleado = activoEmpleado;  //Preguntar si que diferencia entre activo y estatus
        this.personaEmpleado = personaEmpleado;
        this.usuarioEmpleado = usuarioEmpleado;
        this.sucursalEmpleado = sucursalEmpleado;
    }

    public Sucursal getSucursalEmpleado() {
        return sucursalEmpleado;
    }

    public void setSucursalEmpleado(Sucursal sucursalEmpleado) {
        this.sucursalEmpleado = sucursalEmpleado;
    }

    public Integer getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(Integer idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getCodigoEmpleado() {
        return codigoEmpleado;
    }

    public void setCodigoEmpleado(String codigoEmpleado) {
        this.codigoEmpleado = codigoEmpleado;
    }

    public String getFechaIngresoEmpleado() {
        return fechaIngresoEmpleado;
    }

    public void setFechaIngresoEmpleado(String fechaIngresoEmpleado) {
        this.fechaIngresoEmpleado = fechaIngresoEmpleado;
    }

    public String getPuestoEmpleado() {
        return puestoEmpleado;
    }

    public void setPuestoEmpleado(String puestoEmpleado) {
        this.puestoEmpleado = puestoEmpleado;
    }

    public Float getSalarioBrutoEmpleado() {
        return salarioBrutoEmpleado;
    }

    public void setSalarioBrutoEmpleado(Float salarioBrutoEmpleado) {
        this.salarioBrutoEmpleado = salarioBrutoEmpleado;
    }

    public Boolean getActivoEmpleado() {
        return activoEmpleado;
    }

    public void setActivoEmpleado(Boolean activoEmpleado) {
        this.activoEmpleado = activoEmpleado;
    }

    public Persona getPersonaEmpleado() {
        return personaEmpleado;
    }

    public void setPersonaEmpleado(Persona personaEmpleado) {
        this.personaEmpleado = personaEmpleado;
    }

    public Usuario getUsuarioEmpleado() {
        return usuarioEmpleado;
    }

    public void setUsuarioEmpleado(Usuario usuarioEmpleado) {
        this.usuarioEmpleado = usuarioEmpleado;
    }
    
}