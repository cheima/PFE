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
public class modules implements Serializable {
    @Id @Sequence
    private Integer Id;
    private String siguName;
    private Integer type;
    private Integer mss;

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
    
    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public String getSiguName() {
        return siguName;
    }

    public void setSiguName(String siguName) {
        this.siguName = siguName;
    }

    public Integer getMss() {
        return mss;
    }

    public void setMss(Integer mss) {
        this.mss = mss;
    }
    
}
