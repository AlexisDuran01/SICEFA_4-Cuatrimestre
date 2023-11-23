/*
    Artifact:    Modelo Cliente
    Date:        07/11/2023
    Author:      Luis Roberto Garcia Ramirez
    Email:       luisrgr81gmail.com
*/

package org.utl.dsm.Model;
public class Cliente 
{
    private Integer idCliente;
    private String emailCliente;
    private String fechaRegistroCliente;
    private Boolean estatusCliente;
    private Persona personaCliente;

    public Cliente() {}

    public Cliente(Integer idCliente, String emailCliente, String fechaRegistroCliente, Boolean estatusCliente, Persona personaCliente) {
        this.idCliente = idCliente;
        this.emailCliente = emailCliente;
        this.fechaRegistroCliente = fechaRegistroCliente;
        this.estatusCliente = estatusCliente;
        this.personaCliente = personaCliente;
    }

    public Persona getPersonaCliente() {
        return personaCliente;
    }

    public void setPersonaCliente(Persona personaCliente) {
        this.personaCliente = personaCliente;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public void setEmailCliente(String emailCliente) {
        this.emailCliente = emailCliente;
    }

    public String getFechaRegistroCliente() {
        return fechaRegistroCliente;
    }

    public void setFechaRegistroCliente(String fechaRegistroCliente) {
        this.fechaRegistroCliente = fechaRegistroCliente;
    }

    public Boolean getEstatusCliente() {
        return estatusCliente;
    }

    public void setEstatusCliente(Boolean estatusCliente) {
        this.estatusCliente = estatusCliente;
    }
    
}