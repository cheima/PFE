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
public class Login implements Serializable{
    
    @Id @Sequence
    private Integer id ;
    private String login;
    private String passwd;
    private String adrip;

    public String getAdrip() {
        return adrip;
    }

    public void setAdrip(String adrip) {
        this.adrip = adrip;
    }
    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
    
    
}
