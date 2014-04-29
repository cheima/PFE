/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.decorators;

import java.io.Serializable;
import java.util.Date;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Cheima
 */
@XmlRootElement
public class JsonDisplayGraphs implements Serializable{
    private long packetsent;
    private long packetreceived;
    private Date atTime;
    private String SiguName;

    public long getPacketsent() {
        return packetsent;
    }

    public void setPacketsent(long packetsent) {
        this.packetsent = packetsent;
    }

    public long getPacketreceived() {
        return packetreceived;
    }

    public void setPacketreceived(long packetreceived) {
        this.packetreceived = packetreceived;
    }

    public Date getAtTime() {
        return atTime;
    }

    public void setAtTime(Date atTime) {
        this.atTime = atTime;
    }

    public String getSiguName() {
        return SiguName;
    }

    public void setSiguName(String SiguName) {
        this.SiguName = SiguName;
    }
    
    
}
