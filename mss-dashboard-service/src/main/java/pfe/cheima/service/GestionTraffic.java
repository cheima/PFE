package pfe.cheima.service;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import net.vpc.upa.PersistenceUnit;
import net.vpc.upa.UPA;
import pfe.cheima.connect_to_mss.CmdExecuter;
import pfe.cheima.service.model.TimePoint;
import pfe.cheima.service.model.TrafficTotal;
import pfe.cheima.service.model.Trafficforsigu;
import pfe.cheima.service.model.modules;
/**
 *
 * @author Cheima
 */
public class GestionTraffic {

    public int ajouterTraffic(Trafficforsigu t) {
        PersistenceUnit pu = UPA.getPersistenceUnit();
        pu.insert(t);
        return t.getId();
    }

    public void populate() throws ParseException, IOException {

        PersistenceUnit pu = UPA.getPersistenceUnit();
        CmdExecuter ce = new CmdExecuter();
        List<pfe.cheima.connect_to_mss.TrafficTotal> Lecture = ce.getAllSiguTraffic();
        List<pfe.cheima.connect_to_mss.TrafficTotal> LectureBSU = ce.getAllBsuTraffic();
        // 1) create a java calendar instance
        Calendar calendar = Calendar.getInstance();
// 2) get a java.util.Date from the calendar instance.
//    this date will represent the current instant, or "now".
        Date now = calendar.getTime();
// 3) a java current time (now) instance
        java.sql.Timestamp currentTimestamp = new java.sql.Timestamp(now.getTime());
        TimePoint tp = new TimePoint();
        tp.setAtTime(currentTimestamp);
        pu.insert(tp);
//codiiii
       // pu.createQuery("select t from totaltraffic ")
        ///********////
        for (int g = 0; g < Lecture.size(); g++) {
            TrafficTotal traffic = new TrafficTotal();
            modules m = new modules();
           
            //m.setSiguName("sigu0");
            modules module = pu.createQuery("select m from modules m where m.SIGUNAME LIKE :v ")
                    .setParameter("v", Lecture.get(g).getSiguName()).getEntity();

            int siguId;
            if (module == null) {
                m.setSiguName(Lecture.get(g).getSiguName());
                m.setType(0);
                pu.insert(m);
                siguId = m.getId();
            } else {
                siguId = module.getId();
            }
            //m.setSiguName("sigu1");
            traffic.setSiguId(siguId);
            traffic.setTotalreceived(Lecture.get(g).getTotalreceived());
            traffic.setTotalsent(Lecture.get(g).getTotalsent());
            traffic.setTotalsomme(Lecture.get(g).getTotalsomme());
            // traffic.setPacketreceived(Lecture.get(g).getPacketreceived());
            //traffic.setPacketsent(Lecture.get(g).getPacketsent());
           // traffic.setDateExec(tp.getId());
            //   pu.createQuery((EntityStatement) traffic);
            traffic.setSiguName(Lecture.get(g).getSiguName());
            pu.insert(traffic);
        }
        
        for (int g = 0; g < LectureBSU.size(); g++) {
            TrafficTotal traffic = new TrafficTotal();
            modules m = new modules();
           
            //m.setSiguName("sigu0");
            modules module = pu.createQuery("select m from modules m where m.SIGUNAME LIKE :v ")
                    .setParameter("v", LectureBSU.get(g).getSiguName()).getEntity();

            int siguId;
            if (module == null) {
                m.setSiguName(LectureBSU.get(g).getSiguName());
                m.setType(1);
                pu.insert(m);
                siguId = m.getId();
            } else {
                siguId = module.getId();
            }
            //m.setSiguName("sigu1");
            traffic.setSiguId(siguId);
            traffic.setTotalreceived(LectureBSU.get(g).getTotalreceived());
            traffic.setTotalsent(LectureBSU.get(g).getTotalsent());
            traffic.setTotalsomme(LectureBSU.get(g).getTotalsomme());
            traffic.setSiguName(LectureBSU.get(g).getSiguName());
            // traffic.setPacketreceived(Lecture.get(g).getPacketreceived());
            //traffic.setPacketsent(Lecture.get(g).getPacketsent());
            //traffic.setDateExec(tp.getId());
            //   pu.createQuery((EntityStatement) traffic);
            pu.insert(traffic);
        }

    }

    public List<Trafficforsigu> getEntities() {
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();
        //   Trafficforsigu entity;
        //  entity = pu.createQuery("Select a from Trafficforsigu a where a.id=:v")
        //        .setParameter("v", 110)
        //      .getEntity();
        List<Trafficforsigu> entityList = pu.createQuery("select a from Trafficforsigu a ").getEntityList();
        return entityList;
    }
}
