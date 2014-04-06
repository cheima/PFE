/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.trafficin;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Cheima
 */
@Entity
@Table(name = "TRAFFICFORSIGU")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Trafficforsigu.findAll", query = "SELECT t FROM Trafficforsigu t"),
    @NamedQuery(name = "Trafficforsigu.findById", query = "SELECT t FROM Trafficforsigu t WHERE t.id = :id"),
    @NamedQuery(name = "Trafficforsigu.findBySiguName", query = "SELECT t FROM Trafficforsigu t WHERE t.siguName = :siguName"),
    @NamedQuery(name = "Trafficforsigu.findByDateExec", query = "SELECT t FROM Trafficforsigu t WHERE t.dateExec = :dateExec"),
    @NamedQuery(name = "Trafficforsigu.findByPacketreceived", query = "SELECT t FROM Trafficforsigu t WHERE t.packetreceived = :packetreceived"),
    @NamedQuery(name = "Trafficforsigu.findByPacketsent", query = "SELECT t FROM Trafficforsigu t WHERE t.packetsent = :packetsent")})
public class Trafficforsigu implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 30)
    @Column(name = "SIGU_NAME")
    private String siguName;
    @Column(name = "DATE_EXEC")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateExec;
    @Column(name = "PACKETRECEIVED")
    private Integer packetreceived;
    @Column(name = "PACKETSENT")
    private Integer packetsent;

    public Trafficforsigu() {
    }

    public Trafficforsigu(Integer id) {
        this.id = id;
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

    public Integer getPacketreceived() {
        return packetreceived;
    }

    public void setPacketreceived(Integer packetreceived) {
        this.packetreceived = packetreceived;
    }

    public Integer getPacketsent() {
        return packetsent;
    }

    public void setPacketsent(Integer packetsent) {
        this.packetsent = packetsent;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Trafficforsigu)) {
            return false;
        }
        Trafficforsigu other = (Trafficforsigu) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "pfe.cheima.trafficin.Trafficforsigu[ id=" + id + " ]";
    }
    
}
