/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.vpc.upa.UPA;
import pfe.cheima.service.model.Authentification;
import pfe.cheima.service.model.Login;

/**
 *
 * @author Cheima
 */
@Path("rest")
public class MSSManagmentREST {

    @Path("/login/{username}")
    // @POST
    //@Consumes(MediaType.APPLICATION_JSON)
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String postClichedMessage(@PathParam("username") String username) {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        String[] user = username.split(",");

        Login entityList = pu.createQuery("select l from login l where l.adrip = :v").setParameter("v", user[0]).getEntity();

        if (entityList == null) {
            Login l = new Login();
            l.setAdrip(user[0]);
            l.setLogin(user[1]);
    //            l.setPasswd(user[2]);
            pu.insert(l);
        }
        return username;

    }
    @Path("mss")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Login> getmss222() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<Login> mss = pu.createQuery("select l from login l").getEntityList();
        return mss;
    }
    
    
    @Path("authentif")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getLogin(@PathParam("authentification") String authentification) {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        String[] user = authentification.split(",");

       Authentification entityList = pu.createQuery("select l from authentification l").getEntity();

        if (entityList == null) {
            Login l = new Login();
            l.setAdrip("administrator");
            l.setLogin("azerty");
    //            l.setPasswd(user[2]);
            pu.insert(l);
               //return  entityList;
        }
          Authentification el = pu.createQuery("select l from authentification l WHERE l.username = :v AND l.password = :y")
                  .setParameter("v", user[0])
                  .setParameter("y", user[1]).getEntity();
          if(el.getPassword() == null || el.getUsername() == null)
              return "failed";
          else 
              return  "succeded";

    }
}
