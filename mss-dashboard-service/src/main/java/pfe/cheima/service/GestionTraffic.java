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
            Trafficforsigu traffic = new Trafficforsigu();

            //retrouver le sigu; créer un s'il nexiste pas.
            modules module = pu.createQuery("select m from modules m where m.SIGUNAME = :v ")
                    .setParameter("v", Lecture.get(g).getSiguName()).getEntity();

            int siguId;
            if (module == null) {
                modules m = new modules();
                m.setSiguName(Lecture.get(g).getSiguName());
                m.setType(0);
                pu.insert(m);
                siguId = m.getId();
            } else {
                siguId = module.getId();
            }
            traffic.setSiguId(siguId);

            //retrouver le dernier total 
            TrafficTotal trafficTotal = pu.createQuery("select t from traffictotal t where t.siguId = :v ")
                    .setParameter("v", siguId).getEntity();
            boolean update_or_insert;
            if (trafficTotal == null) { // si un total nexiste pas, creer un nouveau
                traffic.setDateExec(tp.getId());
                traffic.setPacketreceived(0L);
                traffic.setPacketsent(0L);
                traffic.setSomme(0L);

                trafficTotal = new TrafficTotal();
                trafficTotal.setSiguId(siguId);
                update_or_insert = false;
                
            } else {                    // si le total existe, utiliser (...=Nouvelle val - Dernier total)
                traffic.setDateExec(tp.getId());
                traffic.setPacketreceived(Lecture.get(g).getTotalreceived() - trafficTotal.getTotalreceived());
                traffic.setPacketsent(Lecture.get(g).getTotalsent() - trafficTotal.getTotalsent());
                traffic.setSomme(Lecture.get(g).getTotalsomme() - trafficTotal.getTotalsomme());
                update_or_insert = true;
            }
            //  le total prend les dernieres valeurs
            trafficTotal.setTotalreceived(Lecture.get(g).getTotalreceived());
            trafficTotal.setTotalsent(Lecture.get(g).getTotalsent());
            trafficTotal.setTotalsomme(Lecture.get(g).getTotalsomme());
            if (update_or_insert) {
                pu.update(trafficTotal);
            } else {
                pu.insert(trafficTotal);
            }

            pu.insert(traffic);
        }

      for (int g = 0; g < LectureBSU.size(); g++) {
            Trafficforsigu traffic = new Trafficforsigu();

            //retrouver le sigu; créer un s'il nexiste pas.
            modules module = pu.createQuery("select m from modules m where m.SIGUNAME = :v ")
                    .setParameter("v", LectureBSU.get(g).getSiguName()).getEntity();

            int siguId;
            if (module == null) {
                modules m = new modules();
                m.setSiguName(Lecture.get(g).getSiguName());
                m.setType(1);
                pu.insert(m);
                siguId = m.getId();
            } else {
                siguId = module.getId();
            }
            traffic.setSiguId(siguId);

            //retrouver le dernier total 
            TrafficTotal trafficTotal = pu.createQuery("select t from TrafficTotal t where t.siguId = :v ")
                    .setParameter("v", siguId).getEntity();
            boolean update_or_insert;
            if (trafficTotal == null) { // si un total nexiste pas, creer un nouveau
                traffic.setDateExec(tp.getId());
                traffic.setPacketreceived(0L);
                traffic.setPacketsent(0L);
                traffic.setSomme(0L);

                trafficTotal = new TrafficTotal();
                trafficTotal.setSiguId(siguId);
                update_or_insert = false;
            } else {                    // si le total existe, utiliser (...=Nouvelle val - Dernier total)
                traffic.setDateExec(tp.getId());
                traffic.setPacketreceived(LectureBSU.get(g).getTotalreceived() - trafficTotal.getTotalreceived());
                traffic.setPacketsent(LectureBSU.get(g).getTotalsent() - trafficTotal.getTotalsent());
                traffic.setSomme(LectureBSU.get(g).getTotalsomme() - trafficTotal.getTotalsomme());
                update_or_insert = true;
            }
            //  le total prend les dernieres valeurs
            trafficTotal.setTotalreceived(LectureBSU.get(g).getTotalreceived());
            trafficTotal.setTotalsent(LectureBSU.get(g).getTotalsent());
            trafficTotal.setTotalsomme(LectureBSU.get(g).getTotalsomme());
            if (update_or_insert) {
                pu.update(trafficTotal);
            } else {
                pu.insert(trafficTotal);
            }

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
