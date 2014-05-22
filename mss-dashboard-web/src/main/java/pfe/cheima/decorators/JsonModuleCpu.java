/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.decorators;

import java.io.Serializable;
import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import pfe.cheima.service.model.LoadPercentCPU;


/**
 *
 * @author Cheima
 */
@XmlRootElement
public class JsonModuleCpu implements Serializable {
  
    private static final long serialVersionUID = 1L;
    private String modulename;
    private int moduleid;
    private int mssid;
    private List<LoadPercentCPU> liste;

    public String getModulename() {
        return modulename;
    }

    public void setModulename(String modulename) {
        this.modulename = modulename;
    }

    public int getModuleid() {
        return moduleid;
    }

    public void setModuleid(int moduleid) {
        this.moduleid = moduleid;
    }

    public List<LoadPercentCPU> getListe() {
        return liste;
    }

    public void setListe(List<LoadPercentCPU> liste) {
        this.liste = liste;
    }

    public int getMssid() {
        return mssid;
    }

    public void setMssid(int mssid) {
        this.mssid = mssid;
    }
    
}
