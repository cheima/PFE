

package pfe.cheima;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.logging.Level;
import javax.persistence.PersistenceUnit;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.vpc.upa.UPA;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import pfe.cheima.service.GestionTraffic;
import pfe.cheima.service.model.Trafficforsigu;





/**
 * REST Web Service
 *
 * @author Cheima
 */
@Path("generic")
public class GenericResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public GenericResource() {
    }

    /**
     * Retrieves representation of an instance of pfe.cheima.GenericResource
     * @return an instance of java.lang.String
     * @throws java.text.ParseException
     * @throws java.io.IOException
     */
    @GET
    @Produces("application/xml")
    public String getXml() throws ParseException, IOException {
        GestionTraffic m=new GestionTraffic();
//        Trafficforsigu t=new Trafficforsigu();
//        t.setPacketreceived(55555);
//        t.setPacketsent(1);
//        int id=m.ajouterTraffic(t);
        String text = m.getText();
        return "<xml><value>"+text+"</value></xml>";
    }
    

    /**
     * PUT method for updating or creating an instance of GenericResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content) {
    }
   
    @Path("ch")
    @GET
     public String getRes() throws ParseException, IOException {
    
        Trafficforsigu t = new Trafficforsigu();
        t.setSiguName("cccc");
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        pu.insert(t);
        int id = t.getId();
        return "<xml>"+id+"</xml>";
    
     }
     
     @Path("traffic")
     @GET
     // @Produces("application/xml")doesn't work!!!
    @Produces(MediaType.APPLICATION_JSON)

     public List<Trafficforsigu> findAllTraffic() {
       
       net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        Trafficforsigu entity;
        entity = pu.createQuery("Select a from Trafficforsigu a where a.id=:v")
                .setParameter("v", 110)
                .getEntity();
        List<Trafficforsigu> entityList = pu.createQuery("select a from Trafficforsigu a ").getEntityList();
     //  ****
        /* JSONObject myObject = new JSONObject();
  
   try {
    myObject.put("name", "Agamemnon");
    myObject.put("age", 32);
   } catch (JSONException ex) {
    
   }*/
       return entityList;
      //// return entity.getSiguName();
       //return myObject.toString();
      

}
   
}
