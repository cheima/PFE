/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.inject.Inject;
import pfe.cheima.trafficin.Trafficforsigu;
import pfe.cheima.trafficin.TrafficforsiguFacade;

/**
 *
 * @author Cheima
 */
@ManagedBean
@RequestScoped
public class NewJSFManagedBean {

    @Inject
    TrafficforsiguFacade facade;

    /**
     * Creates a new instance of NewJSFManagedBean
     */
    public NewJSFManagedBean() {
    }

    public String getText() throws ParseException, IOException {
        NewClasse bre = new NewClasse();
        ArrayList<Trafficforsigu> Lecture = bre.Lecture();
        for (int g = 0; g < Lecture.size(); g++) {
            Trafficforsigu traffic = new Trafficforsigu();
           // traffic.setId(g);
            traffic.setSiguName("SIGU "+g);
            traffic.setPacketreceived(Lecture.get(g).getPacketreceived());
            traffic.setPacketsent(Lecture.get(g).getPacketsent());
            // 1) create a java calendar instance
            Calendar calendar = Calendar.getInstance();
// 2) get a java.util.Date from the calendar instance.
//    this date will represent the current instant, or "now".
            Date now = calendar.getTime();
// 3) a java current time (now) instance
            java.sql.Timestamp currentTimestamp = new java.sql.Timestamp(now.getTime());
            traffic.setDateExec(currentTimestamp);
            facade.create(traffic);
        }
       
        return "test";
    }
}
