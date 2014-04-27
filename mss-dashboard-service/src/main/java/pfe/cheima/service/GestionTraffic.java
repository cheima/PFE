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
import pfe.cheima.connect_to_mss.CmdParser;
import pfe.cheima.service.model.TimePoint;
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
        // NewClasse bre = new NewClasse();
        CmdExecuter ce = new CmdExecuter();
        List<pfe.cheima.connect_to_mss.Trafficforsigu> Lecture = ce.getAllSiguTraffic();

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

        for (int g = 0; g < Lecture.size(); g++) {
            Trafficforsigu traffic = new Trafficforsigu();
            modules m = new modules();
            //m.setSiguName("sigu0");
            modules module = pu.createQuery("select m from modules m where m.SIGUNAME LIKE :v ")
                    .setParameter("v", Lecture.get(g).getSiguName()).getEntity();

            int siguId;
            if (module == null) {
                m.setSiguName(Lecture.get(g).getSiguName());
                pu.insert(m);
                siguId = m.getId();
            } else {
                siguId = module.getId();
            }
            //m.setSiguName("sigu1");
            traffic.setSiguId(siguId);
            traffic.setPacketreceived(Lecture.get(g).getPacketreceived());
            traffic.setPacketsent(Lecture.get(g).getPacketsent());
            // traffic.setPacketreceived(Lecture.get(g).getPacketreceived());
            //traffic.setPacketsent(Lecture.get(g).getPacketsent());
            traffic.setDateExec(tp.getId());
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

    /*  public int copierClient(int id) {
     PersistenceUnit pu = UPA.getPersistenceUnit();
     //        Client c0=pu.createQuery("Select a from Client a where a.id=:v")
     //                .setParameter("v", id)
     //                .getEntity();
     Client c=(Client)pu.findEntityById(Client.class, id);
     Client c2 = new Client();
     c2.setName(c.getName());
     pu.insert(c2);
     List<Address> addresses=pu.createQuery("Select a from Address a where a.client.id=:v")
     .setParameter("v", id)
     .getEntityList();
     for (Address a : addresses) {
     Address a2=new Address();
     a2.setClient(c2);
     a2.setRoad(a.getRoad());
     a2.setCity(a.getCity());
     pu.insert(a);
     }
     return c2.getId();
     }*/
}
