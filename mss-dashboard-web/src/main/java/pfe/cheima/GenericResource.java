package pfe.cheima;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
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
import net.vpc.upa.Key;
import net.vpc.upa.UPA;
import pfe.cheima.decorators.JsonModuleCpu;
import pfe.cheima.decorators.JsonMultiModuleCpu;
import pfe.cheima.decorators.JsonMultiSiguTraffic_Response;
import pfe.cheima.service.GestionTraffic;
import pfe.cheima.decorators.JsonSiguTraffic;
import pfe.cheima.service.model.TimePoint;
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

   /* @Path("traffic")
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
       //  List<Trafficforsigu> entityList = pu.createQuery("select a from Trafficforsigu a ").getEntityList();//
        //  return m.getEntities();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        //   Trafficforsigu entity;
        //  entity = pu.createQuery("Select a from Trafficforsigu a where a.id=:v")
        //        .setParameter("v", 110)
        //      .getEntity();
        List<Trafficforsigu> entityList = pu.createQuery("select a from Trafficforsigu a ").getEntityList();
        return entityList;
    }*/

    @Path("time")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<Trafficforsigu> findTrafficByTime() {

        Date time = lastHour();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<Trafficforsigu> entityList = pu.createQuery("select a from trafficforsigu a left join TimePoint t ON a.dateExec = t.id where t.atTime >= :v")
                .setParameter("v", time)
                .getEntityList();
        return entityList;
    }

    ////
    @Path("cc")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<Trafficforsigu> findTrafficByTime11() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<Trafficforsigu> entityList = pu.createQuery("select a from traffictotal a order by a.packetreceived DESC")
                .getEntityList();
        return entityList;
    }
    ////

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
        /* List<modules> entityList = pu.createQuery("select a from modules a WHERE a.type = :v order by a.id DESC")
         .setParameter("v", 0).getEntityList();*/
        // List<Integer> idList = pu.createQuery("select a from modules a order by a.id DESC ").getIdList();
        List<modules> get = pu.createQuery("select a from modules a WHERE a.type = :v order by a.id DESC")
                .setParameter("v", 0).getEntityList();
        return get;
    }

    //getnames with specifi type 
    @Path("getnames/{list12}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<modules> getNames(@PathParam("list12") String list12) {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();

        List<modules> get = pu.createQuery("select a from modules a WHERE a.type = :v order by a.id DESC")
                .setParameter("v", Integer.parseInt(list12)).getEntityList();
        return get;
    }

    @Path("getbsuname")
    @GET
    @Produces(MediaType.APPLICATION_JSON)

    public List<modules> getBsuName() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<modules> entityList = pu.createQuery("select a from modules a WHERE a.type = :v")
                .setParameter("v", 1).getEntityList();
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

    //indicateur bande passante
    /*@Path("sommesigu")
     @GET
     @Produces(MediaType.APPLICATION_JSON)
     public JsonMultiSiguTraffic_Response getBp() {
     List<JsonSiguTraffic> gas = new ArrayList<JsonSiguTraffic>();
     net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
     List<List<Trafficforsigu>> liste = new ArrayList<List<Trafficforsigu>>();
     List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v").setParameter("v", 0).getEntityList();
     //List<modules> name = pu.createQuery("select a.siguName from modules a").getIdList();
     Date time = lastHour();
     List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v")
     .setParameter("v", time)
     .getEntityList();
     for (int i = 0; i < List.size(); i++) {
     JsonSiguTraffic sigu = new JsonSiguTraffic();
     sigu.setSiguid(List.get(i).getId());
     sigu.setSiguname(List.get(i).getSiguName());
     List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a left join TimePoint t ON a.dateExec = t.id where a.siguId = :id AND t.atTime >= :v")
     .setParameter("v", time)
     .setParameter("id", List.get(i).getId())
     .getEntityList();
     sigu.setListe(entityList2);
     //  gas.get(i).setListe(entityList2);
     gas.add(sigu);

     }

     JsonMultiSiguTraffic_Response ret = new JsonMultiSiguTraffic_Response();
     ret.setSigus(gas);
     ret.setTimes(times);
     return (ret);
        
     }*/
    @Path("allbsu/{year}/{month}/{day}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMultiSiguTraffic_Response getBsu(@PathParam("year") int year, @PathParam("month") int month, @PathParam("day") int day) {
        List<JsonSiguTraffic> gas = new ArrayList<JsonSiguTraffic>();
        //  List<List<GetAllSigu>> listegas = new ArrayList<List<GetAllSigu>>();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        // List<List<Trafficforsigu>> liste = new ArrayList<List<Trafficforsigu>>();
        List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v").setParameter("v", 1).getEntityList();
        //List<modules> name = pu.createQuery("select a.siguName from modules a").getIdList();
        Calendar c = new GregorianCalendar(year, month, day);
        Date time = c.getTime();
        c = new GregorianCalendar(year, month, day + 1);
        Date time2 = c.getTime();

        //Date time = lastHour();
        List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v and t.atTime < :v2")
                .setParameter("v", time)
                .setParameter("v2", time2)
                .getEntityList();
        for (int i = 0; i < List.size(); i++) {
            JsonSiguTraffic sigu = new JsonSiguTraffic();
            sigu.setSiguid(List.get(i).getId());
            //gas.get(i).setSiguid(List.get(i).getId());
            sigu.setSiguname(List.get(i).getSiguName());
            // gas.get(i).setSiguname(List.get(i).getSiguName());
//            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a where a.siguId = :v ")
//                    .setParameter("v", List.get(i).getId())
//                    .getEntityList();
            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a left join TimePoint t ON a.dateExec = t.id where a.siguId = :id AND t.atTime >= :v")
                    .setParameter("v", time)
                    .setParameter("id", List.get(i).getId())
                    .getEntityList();
            sigu.setListe(entityList2);
            //  gas.get(i).setListe(entityList2);
            gas.add(sigu);

        }

        JsonMultiSiguTraffic_Response ret = new JsonMultiSiguTraffic_Response();
        ret.setSigus(gas);
        ret.setTimes(times);
        return (ret);

    }

    @Path("alltraffic/{year}/{month}/{day}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMultiSiguTraffic_Response getSigu1(@PathParam("year") int year, @PathParam("month") int month, @PathParam("day") int day) {
        List<JsonSiguTraffic> gas = new ArrayList<JsonSiguTraffic>();
        //  List<List<GetAllSigu>> listegas = new ArrayList<List<GetAllSigu>>();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v").setParameter("v", 1).getEntityList();
        //List<modules> name = pu.createQuery("select a.siguName from modules a").getIdList();
        Calendar c = new GregorianCalendar(year, month, day);
        Date time = c.getTime();
        c = new GregorianCalendar(year, month, day + 1);
        Date time2 = c.getTime();

        //Date time = lastHour();
        List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v and t.atTime < :v2")
                .setParameter("v", time)
                .setParameter("v2", time2)
                .getEntityList();
        for (int i = 0; i < List.size(); i++) {
            JsonSiguTraffic sigu = new JsonSiguTraffic();
            sigu.setSiguid(List.get(i).getId());
            //gas.get(i).setSiguid(List.get(i).getId());
            sigu.setSiguname(List.get(i).getSiguName());
            // gas.get(i).setSiguname(List.get(i).getSiguName());
//            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a where a.siguId = :v ")
//                    .setParameter("v", List.get(i).getId())
//                    .getEntityList();
            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a left join TimePoint t ON a.dateExec = t.id where a.siguId = :id AND t.atTime >= :v")
                    .setParameter("v", time)
                    .setParameter("id", List.get(i).getId())
                    .getEntityList();
            sigu.setListe(entityList2);
            //  gas.get(i).setListe(entityList2);
            gas.add(sigu);

        }

        JsonMultiSiguTraffic_Response ret = new JsonMultiSiguTraffic_Response();
        ret.setSigus(gas);
        ret.setTimes(times);
        return (ret);

    }


    //service of cpu
    @Path("mss/{mss}/cart/{type}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<modules> getModules(@PathParam("mss") String msst, @PathParam("type") String list) {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        int type = Integer.parseInt(list);
        int mss = Integer.parseInt(msst);
        List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v and a.mss = :mss")
                .setParameter("v", type)
                .setParameter("mss", mss)
                .getEntityList();
        return List;
    }

    //allcpu of sigu
//    @Path("allcpu/{type1}/{year}/{month}/{day}")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public JsonMultiModuleCpu getmodule(@PathParam("type1") String list, @PathParam("year") int year, @PathParam("month") int month, @PathParam("day") int day) {
//        List<JsonModuleCpu> gas = new ArrayList<JsonModuleCpu>();
//        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
//        int type = Integer.parseInt(list);
//        List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v").setParameter("v", type).getEntityList();
//        //List<modules> name = pu.createQuery("select a.siguName from modules a").getIdList();
//        Calendar c = new GregorianCalendar(year, month, day);
//        Date time = c.getTime();
//        c = new GregorianCalendar(year, month, day + 1);
//        Date time2 = c.getTime();
//
//        //Date time = lastHour();
//        List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v and t.atTime < :v2")
//                .setParameter("v", time)
//                .setParameter("v2", time2)
//                .getEntityList();
//        for (int i = 0; i < List.size(); i++) {
//            JsonModuleCpu sigu = new JsonModuleCpu();
//            sigu.setModuleid(List.get(i).getId());
//            //gas.get(i).setSiguid(List.get(i).getId());
//            sigu.setModulename(List.get(i).getSiguName());
//            List<LoadPercentCPU> entityList2 = pu.createQuery("select a from loadpercentcpu a left join TimePoint t ON a.dateExec = t.id where a.moduleid = :id AND t.atTime >= :v AND t.atTime < :v2")
//                    .setParameter("v", time)
//                    .setParameter("v2", time2)
//                    .setParameter("id", List.get(i).getId())
//                    .getEntityList();
//            sigu.setListe(entityList2);
//            gas.add(sigu);
//
//        }
//
//        JsonMultiModuleCpu ret = new JsonMultiModuleCpu();
//        ret.setModules(gas);
//        ret.setTimes(times);
//        return (ret);
//
//    }
//NEW CODE DATEFROM DATETO
  

//    @Path("allcpu11/{list11}/{year}/{month}/{day}")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public JsonMultiModuleCpu getList111(@PathParam("list11") String list11, @PathParam("year") int year, @PathParam("month") int month, @PathParam("day") int day) {
//
//        String[] siguIdsAsStrings = list11.split(",");
//        List<Integer> siguIds = new ArrayList<Integer>(); // liste des id
//        for (String siguIdsAsString : siguIdsAsStrings) {
//            siguIds.add(Integer.parseInt(siguIdsAsString));
//        }
//
//        List<JsonModuleCpu> gas = new ArrayList<JsonModuleCpu>();
//        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
//
//        Calendar c = new GregorianCalendar(year, month, day);
//        Date time = c.getTime();
//        c = new GregorianCalendar(year, month, day + 1);
//        Date time2 = c.getTime();
//
//        List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v  and t.atTime < :v2")
//                .setParameter("v", time)
//                .setParameter("v2", time2)
//                .getEntityList();
//        for (int id : siguIds) {
//            modules m = pu.createQuery("select a from modules a where a.id = :id").setParameter("id", id).getEntity();
//            if (m != null) {
//                JsonModuleCpu sigu = new JsonModuleCpu();
//                sigu.setModuleid(id);
//                sigu.setModulename(m.getSiguName());
//                List<LoadPercentCPU> entityList2 = pu.createQuery("select a from loadpercentcpu a left join TimePoint t ON a.dateExec = t.id where a.moduleid = :id AND t.atTime >= :v  and t.atTime < :v2")
//                        .setParameter("v", time)
//                        .setParameter("v2", time2)
//                        .setParameter("id", id)
//                        .getEntityList();
////                List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a where a.siguId = :v ")
////                        .setParameter("v", id)
////                        .getEntityList();
//                sigu.setListe(entityList2);
//                gas.add(sigu);
//            }
//        }
//
//        JsonMultiModuleCpu ret = new JsonMultiModuleCpu();
//        ret.setModules(gas);
//        ret.setTimes(times);
//        return (ret);
//
//    }
    private Date lastHour() {
        Calendar calendar = Calendar.getInstance();
// 2) get a java.util.Date from the calendar instance.
//    this date will represent the current instant, or "now".
        Date date = calendar.getTime();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, -60);
        Date time = cal.getTime();
        return time;
    }

}
