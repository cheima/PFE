/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima.decorators;

import java.io.Serializable;
import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import pfe.cheima.service.model.SomTraffic;
import pfe.cheima.service.model.Trafficforsigu;

/**
 *
 * @author Cheima
 */
@XmlRootElement
public class JsonBP implements Serializable {

    private static final long serialVersionUID = 1L;
    private String modulename;
    private int moduleid;
    private int mssid;
     private List<SomTraffic> liste;
     
     
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

    public List<SomTraffic> getListe() {
        return liste;
    }

    public void setListe(List<SomTraffic> liste) {
        this.liste = liste;
    }

}
