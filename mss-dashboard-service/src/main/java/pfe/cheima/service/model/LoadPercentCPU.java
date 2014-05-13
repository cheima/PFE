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
public class LoadPercentCPU implements Serializable {
 private static final long serialVersionUID = 1L;
    @Id  @Sequence
    private Integer Id;
    private Integer DateExec;
    private Integer LoadCPU;
    private Integer ModuleId; 

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public Integer getDateExec() {
        return DateExec;
    }

    public void setDateExec(Integer DateExec) {
        this.DateExec = DateExec;
    }

    public Integer getLoadCPU() {
        return LoadCPU;
    }

    public void setLoadCPU(Integer LoadCPU) {
        this.LoadCPU = LoadCPU;
    }

    public Integer getModuleId() {
        return ModuleId;
    }

    public void setModuleId(Integer ModuleId) {
        this.ModuleId = ModuleId;
    }
    
}
