package pfe.cheima;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.vpc.upa.Query;
import net.vpc.upa.UPA;
import pfe.cheima.service.GestionTraffic;
import pfe.cheima.service.model.GetAllSigu;
import pfe.cheima.service.model.Trafficforsigu;
import pfe.cheima.service.model.modules;

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

    @GET
    @Produces("application/xml")
    public String getXml() throws ParseException, IOException {
        GestionTraffic m = new GestionTraffic();
        m.populate();
        return "<xml><value>test</value></xml>";
    }

    /**
     * PUT method for updating or creating an instance of GenericResource
     *
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content) {
    }

    @Path("traffic")
    @GET
    // @Produces("application/xml")doesn't work!!!
    @Produces(MediaType.APPLICATION_JSON)

    public List<Trafficforsigu> findAllTraffic() {
       // GestionTraffic m = new GestionTraffic();
        /*  net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
         Trafficforsigu entity;
         entity = pu.createQuery("Select a from Trafficforsigu a where a.id=:v")
         .setParameter("v", 110)
         .getEntity();
         List<Trafficforsigu> entityList = pu.createQuery("select a from Trafficforsigu a ").getEntityList();*/
        //  return m.getEntities();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        //   Trafficforsigu entity;
        //  entity = pu.createQuery("Select a from Trafficforsigu a where a.id=:v")
        //        .setParameter("v", 110)
        //      .getEntity();
        List<Trafficforsigu> entityList = pu.createQuery("select a from Trafficforsigu a ").getEntityList();
        return entityList;
    }

    @Path("time")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<Trafficforsigu> findTrafficByTime() {
        // 1) create a java calendar instance
        Calendar calendar = Calendar.getInstance();
// 2) get a java.util.Date from the calendar instance.
//    this date will represent the current instant, or "now".
        Date date = calendar.getTime();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.HOUR, -1);
        Date time = cal.getTime();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<Trafficforsigu> entityList = pu.createQuery("select a from trafficforsigu a where a.dateExec > :v")
                .setParameter("v", time)
                .getEntityList();
        return entityList;
    }

    @Path("siguname")
    @GET
    // @Produces("application/xml")doesn't work!!!
    @Produces(MediaType.APPLICATION_JSON)

    public List<Trafficforsigu> TrafficBySiguName() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<Trafficforsigu> entityList = pu.createQuery("select a from trafficforsigu a inner join trafficforsigu b on  a.siguName = b.siguName and b.id = :v ")
                .setParameter("v", 2482)
                .getEntityList();
        return entityList;
    }

    @Path("/{siguId}")
    @GET
    // @Produces("application/xml")doesn't work!!!
    @Produces(MediaType.APPLICATION_JSON)

    public List<Trafficforsigu> TrafficBySiguName1(@PathParam("siguId") int sigu) {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<Trafficforsigu> entityList = pu.createQuery("select a from trafficforsigu a where a.siguId = :v ")
                .setParameter("v", sigu)
                .getEntityList();
        return entityList;
    }

    /* @Path("/{siguRange}")
     @GET
     // @Produces("application/xml")doesn't work!!!
     @Produces(MediaType.APPLICATION_JSON)

     public List<Trafficforsigu> TrafficBySiguRange(@PathParam("siguRange") String range) {
     net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
     List<Trafficforsigu> entityList = pu.createQuery("select a from trafficforsigu inner join trafficsigu b on a.id >= b.id where a.siguName = :v inner join trafficforsigu "
     + "c on a.id<= c.id where c.siguname= :t")
     .setParameter("v","SIGU-3").setParameter("t", "SIGU-9")
     .getEntityList();
     return entityList;
     }*/
    /*
     @Path("/{siguFrom}/{siguTo}")
     public List<Trafficforsigu> TrafficBySiguRange(@PathParam("siguFrom") int from, @PathParam("siguTo") int to) {
     */
    @Path("getsiguname")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<modules> getSiguName() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<modules> entityList = pu.createQuery("select a from modules a").getEntityList();
        return entityList;
    }

   /* @Path("alltraffic")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<List<Trafficforsigu>> getSigu() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<List<Trafficforsigu>> liste = new ArrayList<List<Trafficforsigu>>();
        List<modules> entityList = pu.createQuery("select a.id from modules a").getIdList();

        for (int i = 0; i < entityList.size(); i++) {
            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a where a.siguId = :v ")
                    .setParameter("v", entityList.get(i))
                    .getEntityList();
            liste.add(entityList2);
        }
        return (liste);

    }*/

    @Path("alltraffic")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<List<GetAllSigu>> getSigu1() {
        List<GetAllSigu> gas = new ArrayList<GetAllSigu>();
        List<List<GetAllSigu>> listegas = new ArrayList<List<GetAllSigu>>();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<List<Trafficforsigu>> liste = new ArrayList<List<Trafficforsigu>>();
        List<modules> List = pu.createQuery("select a from modules a").getEntityList();
        //List<modules> name = pu.createQuery("select a.siguName from modules a").getIdList();
       
        for (int i = 0; i < List.size(); i++) {
            GetAllSigu sigu = new GetAllSigu();
            sigu.setSiguid(List.get(i).getId());
            //gas.get(i).setSiguid(List.get(i).getId());
            sigu.setSiguname(List.get(i).getSiguName());
           // gas.get(i).setSiguname(List.get(i).getSiguName());
            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a where a.siguId = :v ")
                    .setParameter("v", List.get(i).getId())
                    .getEntityList();
            sigu.setListe(entityList2);
          //  gas.get(i).setListe(entityList2);

            gas.add(sigu);
            listegas.add(gas);
        }

        return (listegas);

    }
}