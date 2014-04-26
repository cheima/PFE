/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.service.model;

import java.io.Serializable;
import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import net.vpc.upa.config.Entity;



/**
 *
 * @author Cheima
 */
@Entity
@XmlRootElement
public class GetAllSigu implements Serializable{
     private static final long serialVersionUID = 1L;
    private String siguname;
    private int siguid;
    private List<Trafficforsigu> liste;

    public String getSiguname() {
        return siguname;
    }

    public void setSiguname(String siguname) {
        this.siguname = siguname;
    }

    public int getSiguid() {
        return siguid;
    }

    public void setSiguid(int siguid) {
        this.siguid = siguid;
    }

    public List<Trafficforsigu> getListe() {
        return liste;
    }

    public void setListe(List<Trafficforsigu> liste) {
        this.liste = liste;
    }
    
    
    
}
