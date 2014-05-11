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
//@Entity(entityType = )
@XmlRootElement
public class TrafficTotal implements Serializable {
    
    @Id @Sequence
    private Integer id;
    private Long totalreceived;
    private Long totalsent;
    private Long totalsomme;
    private Integer siguId;
    //private String SiguName;

//    public String getSiguName() {
//        return SiguName;
//    }
//
//    public void setSiguName(String SiguName) {
//        this.SiguName = SiguName;
//    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getTotalreceived() {
        return totalreceived;
    }

    public void setTotalreceived(Long totalreceived) {
        this.totalreceived = totalreceived;
    }

    public Long getTotalsent() {
        return totalsent;
    }

    public void setTotalsent(Long totalsent) {
        this.totalsent = totalsent;
    }

    public Long getTotalsomme() {
        return totalsomme;
    }

    public void setTotalsomme(Long totalsomme) {
        this.totalsomme = totalsomme;
    }

    public Integer getSiguId() {
        return siguId;
    }

    public void setSiguId(Integer siguId) {
        this.siguId = siguId;
    }

  
    
    
}
