/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.vpc.upa.UPA;
import pfe.cheima.decorators.JsonMultiSiguTraffic_Response;
import pfe.cheima.decorators.JsonSiguTraffic;
import pfe.cheima.service.model.TimePoint;
import pfe.cheima.service.model.Trafficforsigu;
import pfe.cheima.service.model.modules;

/**
 *
 * @author Cheima
 */
@Path("mss/{mss}/traffic")

public class TRAFFICWebService {
    @PathParam("mss") String msst;
    @Path("{list11}/{dateFrom}/{dateTo}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMultiSiguTraffic_Response getList111(@PathParam("list11") String list11, @PathParam("dateFrom") String dateFrom, @PathParam("dateTo") String dateTo) throws ParseException {
        String[] siguIdsAsStrings = list11.split(",");
        int mss = Integer.parseInt(msst);

        Date datefrom = new SimpleDateFormat("yyyy-MM-dd").parse(dateFrom);
        Calendar c = new GregorianCalendar();
        c.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(dateTo));
        c.add(Calendar.DAY_OF_MONTH, 1);
        Date dateto = c.getTime();

        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        ///essai de list contenant all,0(type)
        if ("all".equals(siguIdsAsStrings[0])) {
            Integer type = Integer.parseInt(siguIdsAsStrings[1]);
            return getTRAFFICByType(mss, type, datefrom, dateto);
        } else {
            //  List<Integer> siguIds = new ArrayList<Integer>(); // liste des id
            List<Integer> siguIds = new ArrayList<Integer>();
            for (String siguIdsAsString : siguIdsAsStrings) {
                siguIds.add(Integer.parseInt(siguIdsAsString));
            }
            return getTRAFFICByModule(siguIds, datefrom, dateto);
        }

    }

    @Path("{list11}/lastHour")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMultiSiguTraffic_Response getList111(@PathParam("list11") String list11) throws ParseException {
        String[] siguIdsAsStrings = list11.split(",");
        int mss = Integer.parseInt(msst);
        Calendar c = new GregorianCalendar();
        c.add(Calendar.HOUR_OF_DAY, -1);
        Date datefrom = c.getTime();
        Date dateto = new Date();

        if ("all".equals(siguIdsAsStrings[0])) {
            Integer type = Integer.parseInt(siguIdsAsStrings[1]);
            return getTRAFFICByType(mss, type, datefrom, dateto);
        } else {
            //  List<Integer> siguIds = new ArrayList<Integer>(); // liste des id
            List<Integer> siguIds = new ArrayList<Integer>();
            for (String siguIdsAsString : siguIdsAsStrings) {
                siguIds.add(Integer.parseInt(siguIdsAsString));
            }
            return getTRAFFICByModule(siguIds, datefrom, dateto);
        }
    }

    @Path("{list11}/last4Hours")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMultiSiguTraffic_Response getList112(@PathParam("list11") String list11) throws ParseException {
        String[] siguIdsAsStrings = list11.split(",");
        int mss = Integer.parseInt(msst);
        Calendar c = new GregorianCalendar();
        c.add(Calendar.HOUR_OF_DAY, -4);
        Date datefrom = c.getTime();
        Date dateto = new Date();

        if ("all".equals(siguIdsAsStrings[0])) {
            Integer type = Integer.parseInt(siguIdsAsStrings[1]);
            return getTRAFFICByType(mss, type, datefrom, dateto);
        } else {
            //  List<Integer> siguIds = new ArrayList<Integer>(); // liste des id
            List<Integer> siguIds = new ArrayList<Integer>();
            for (String siguIdsAsString : siguIdsAsStrings) {
                siguIds.add(Integer.parseInt(siguIdsAsString));
            }
            return getTRAFFICByModule(siguIds, datefrom, dateto);
        }
    }

    @Path("{list11}/byTime/{time}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonMultiSiguTraffic_Response getList113(@PathParam("list11") String list11, @PathParam("time") long time) throws ParseException {
        String[] siguIdsAsStrings = list11.split(",");
        int mss = Integer.parseInt(msst);

        if ("all".equals(siguIdsAsStrings[0])) {
            Integer type = Integer.parseInt(siguIdsAsStrings[1]);
            return getTRAFFICByTypeAtTime(mss, type, time);
        } else {
            throw new RuntimeException("non supporté");
        }
    }

    ///list of cpu selected
    private JsonMultiSiguTraffic_Response getTRAFFICByModule(List<Integer> siguIds, Date datefrom, Date dateto) {

        List<JsonSiguTraffic> gas = new ArrayList<JsonSiguTraffic>();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();

        List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v  and t.atTime < :v2")
                .setParameter("v", datefrom)
                .setParameter("v2", dateto)
                .getEntityList();
        for (int id : siguIds) {
            modules m = pu.createQuery("select a from modules a where a.id = :id").setParameter("id", id).getEntity();
            if (m != null) {
                JsonSiguTraffic sigu = new JsonSiguTraffic();
                sigu.setModuleid(id);
                sigu.setModulename(m.getSiguName());
                sigu.setModuleid(m.getMss());
                List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a left join TimePoint t ON a.dateExec = t.id where a.siguId = :id AND t.atTime >= :v  and t.atTime < :v2")
                        .setParameter("v", datefrom)
                        .setParameter("v2", dateto)
                        .setParameter("id", id)
                        .getEntityList();
               
           //     for (int i =0;i<entityList2.size();i++)
             //       entityList2.get(i).setSomme(null);
                 sigu.setListe(entityList2);
                gas.add(sigu);
            }
        }
        JsonMultiSiguTraffic_Response ret = new JsonMultiSiguTraffic_Response();
        ret.setModules(gas);
        ret.setTimes(times);
        return (ret);
    }

    private  JsonMultiSiguTraffic_Response getTRAFFICByType(int mss, int type, Date datefrom, Date dateto) {

        List<JsonSiguTraffic> gas = new ArrayList<JsonSiguTraffic>();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v  and a.mss = :mss")
                .setParameter("v", type)
                .setParameter("mss", mss)
                .getEntityList();

        //Date time = lastHour();
        List<TimePoint> times = pu.createQuery("select t from TimePoint t where t.atTime >= :v  and t.atTime < :v2")
                .setParameter("v", datefrom)
                .setParameter("v2", dateto)
                .getEntityList();
        for (int i = 0; i < List.size(); i++) {
            JsonSiguTraffic sigu = new JsonSiguTraffic();
            sigu.setModuleid(List.get(i).getId());
            //gas.get(i).setSiguid(List.get(i).getId());
            sigu.setModulename(List.get(i).getSiguName());
            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a left join TimePoint t ON a.dateExec = t.id where a.siguId = :id AND t.atTime >= :v AND t.atTime < :v2")
                    .setParameter("v", datefrom)
                    .setParameter("v2", dateto)
                    .setParameter("id", List.get(i).getId())
                    .getEntityList();
            sigu.setListe(entityList2);
            gas.add(sigu);

        }

        JsonMultiSiguTraffic_Response ret = new JsonMultiSiguTraffic_Response();
        ret.setModules(gas);
        ret.setTimes(times);
        return (ret);
    }

    private  JsonMultiSiguTraffic_Response getTRAFFICByTypeAtTime(int mss, int type, long time) {

        List<JsonSiguTraffic> gas = new ArrayList<JsonSiguTraffic>();
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        List<modules> List = pu.createQuery("select a from modules a WHERE a.type = :v  and a.mss = :mss")
                .setParameter("v", type)
                .setParameter("mss", mss)
                .getEntityList();

        //trouver le TimePoint
        Calendar c = new GregorianCalendar();
        c.setTimeInMillis(time-3600*1000);
        Date date=c.getTime();
        TimePoint tp = pu.createQuery("select a from timepoint a WHERE a.attime = :v")
                .setParameter("v", date)
                .getEntity();
        List<TimePoint> times = new ArrayList<TimePoint>();
        times.add(tp);
        int timepoint = tp.getId();
        for (int i = 0; i < List.size(); i++) {
            JsonSiguTraffic sigu = new JsonSiguTraffic();
            sigu.setModuleid(List.get(i).getId());
            //gas.get(i).setSiguid(List.get(i).getId());
            sigu.setModulename(List.get(i).getSiguName());
            List<Trafficforsigu> entityList2 = pu.createQuery("select a from trafficforsigu a where a.dateExec = :v and a.siguId = :id ")
                    .setParameter("v", timepoint)
                    .setParameter("id", List.get(i).getId())
                    .getEntityList();
            sigu.setListe(entityList2);
            gas.add(sigu);

        }

        JsonMultiSiguTraffic_Response ret = new JsonMultiSiguTraffic_Response();
        ret.setModules(gas);
        ret.setTimes(times);
        return (ret);
    }

}
