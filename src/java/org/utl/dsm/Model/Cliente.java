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
    private int estatusCliente;
    private Persona personaCliente;

    public Cliente() {}

    public Cliente(Integer idCliente, String emailCliente, String fechaRegistroCliente, int estatusCliente, Persona personaCliente) {
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

    public int getEstatusCliente() {
        return estatusCliente;
    }

    public void setEstatusCliente(int estatusCliente) {
        this.estatusCliente = estatusCliente;
    }
    
}