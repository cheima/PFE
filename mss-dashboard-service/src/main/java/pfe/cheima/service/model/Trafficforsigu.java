package pfe.cheima.service.model;


import java.io.Serializable;
import java.util.Date;
import javax.xml.bind.annotation.XmlRootElement;
import net.vpc.upa.config.Entity;
import net.vpc.upa.config.Id;
import net.vpc.upa.config.Sequence;

@Entity
@XmlRootElement
public class Trafficforsigu implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id  @Sequence
    private Integer Id;
    private Integer dateExec;
    private Long packetreceived;
    private Long packetsent;
    private Integer siguId;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }
    

    public Integer getSiguId() {
        return siguId;
    }

    public void setSiguId(Integer siguId) {
        this.siguId = siguId;
    }
    //private String siguName;
   

   

    public Integer getDateExec() {
        return dateExec;
    }

    public void setDateExec(Integer dateExec) {
        this.dateExec = dateExec;
    }

    public Long getPacketreceived() {
        return packetreceived;
    }

    public void setPacketreceived(Long packetreceived) {
        this.packetreceived = packetreceived;
    }

    public Long getPacketsent() {
        return packetsent;
    }

    public void setPacketsent(Long packetsent) {
        this.packetsent = packetsent;
    }
    
}