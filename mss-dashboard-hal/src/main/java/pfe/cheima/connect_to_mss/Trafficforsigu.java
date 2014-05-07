/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.Serializable;
import java.util.Date;



public class Trafficforsigu implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String siguName;
    private Date dateExec;
    private Long packetreceived;
    private Long packetsent;
    private Long somme;
    private Integer SiguId;

    public Long getSomme() {
        return somme;
    }

    public void setSomme(Long somme) {
        this.somme = somme;
    }

    
    public Integer getSiguId() {
        return SiguId;
    }

    public void setSiguId(Integer SiguId) {
        this.SiguId = SiguId;
    }
    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSiguName() {
        return siguName;
    }

    public void setSiguName(String siguName) {
        this.siguName = siguName;
    }

    public Date getDateExec() {
        return dateExec;
    }

    public void setDateExec(Date dateExec) {
        this.dateExec = dateExec;
    }

    public Long getPacketreceived() {
        return packetreceived;
    }

    public void setPacketreceived(Long packetreceived) {
        this.packetreceived = packetreceived;
    }

    public Long getPacketsent() {
        return packetsent;
    }

    public void setPacketsent(Long packetsent) {
        this.packetsent = packetsent;
    }
    
}
