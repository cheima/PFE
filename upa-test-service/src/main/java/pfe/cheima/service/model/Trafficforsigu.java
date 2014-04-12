package pfe.cheima.service.model;


import java.io.Serializable;
import java.util.Date;
import net.vpc.upa.config.Entity;
import net.vpc.upa.config.Id;
import net.vpc.upa.config.Sequence;

@Entity
public class Trafficforsigu implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id  @Sequence
    private Integer id;
    private String siguName;
    private Date dateExec;
    private Integer packetreceived;
    private Integer packetsent;

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
    
}