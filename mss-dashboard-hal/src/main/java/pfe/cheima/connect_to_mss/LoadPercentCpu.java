package pfe.cheima.connect_to_mss;

import java.io.Serializable;



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Cheima
 */
public class LoadPercentCpu implements Serializable {
    
    private Integer Id;
    private Integer DateExec;
    private Integer LoadCPU;
    private Integer ModuleId; 
    private String ModuleName;
    private Integer Type;

    public Integer getType() {
        return Type;
    }

    public void setType(Integer Type) {
        this.Type = Type;
    }
    

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

    public String getModuleName() {
        return ModuleName;
    }

    public void setModuleName(String ModuleName) {
        this.ModuleName = ModuleName;
    }
    
    
    
}
