/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima.decorators;

import java.io.Serializable;
import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import net.vpc.upa.config.Entity;
import pfe.cheima.service.model.TimePoint;
import pfe.cheima.service.model.Trafficforsigu;

/**
 *
 * @author Cheima
 */
@XmlRootElement
public class JsonSiguTraffic implements Serializable {

    private static final long serialVersionUID = 1L;
    private String modulename;
    private int moduleid;
    private int mssid;
     private List<Trafficforsigu> liste;
     
     
    public int getMssid() {
        return mssid;
    }

    public void setMssid(int mssid) {
        this.mssid = mssid;
    }
   

    public String getModulename() {
        return modulename;
    }

    public void setModulename(String siguname) {
        this.modulename = siguname;
    }

    public int getModuleid() {
        return moduleid;
    }

    public void setModuleid(int siguid) {
        this.moduleid = siguid;
    }

    public List<Trafficforsigu> getListe() {
        return liste;
    }

    public void setListe(List<Trafficforsigu> liste) {
        this.liste = liste;
    }

}
