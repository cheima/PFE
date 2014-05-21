/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import net.vpc.upa.UPA;
import pfe.cheima.service.model.Login;


/**
 *
 * @author Cheima
 */
@Path("rest")
public class MSSManagmentREST {

    @Path("/login/{username}")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String postClichedMessage(@PathParam("username") String username) {
          net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
            Login l = new Login();
            if(l.getAdrip() != "????"){
            l.setAdrip(null);
            l.setLogin(null);
            l.setPasswd(null);
             pu.insert(l);
            }
         return "cheim"+username;
            
    }
}
