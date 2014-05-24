/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.service.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;
import net.vpc.upa.config.Entity;
import net.vpc.upa.config.Id;
import net.vpc.upa.config.Sequence;

/**
 *
 * @author Cheima
 */
@Entity
@XmlRootElement
public class SomTraffic implements Serializable{
     private static final long serialVersionUID = 1L;
    @Id  @Sequence
   // private FieldDesc Id;
    private Integer Id;
    private Integer dateExec;
    private Long somme;
    private Integer siguId;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public Integer getDateExec() {
        return dateExec;
    }

    public void setDateExec(Integer dateExec) {
        this.dateExec = dateExec;
    }

    public Long getSomme() {
        return somme;
    }

    public void setSomme(Long somme) {
        this.somme = somme;
    }

    public Integer getSiguId() {
        return siguId;
    }

    public void setSiguId(Integer siguId) {
        this.siguId = siguId;
    }

}
