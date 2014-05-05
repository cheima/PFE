/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima;

import java.util.Timer;
import java.util.TimerTask;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import net.vpc.upa.UPA;

/**
 * Web application lifecycle listener.
 *
 * @author Cheima
 */
@WebListener()
public class MSSScheduler implements ServletContextListener {

    private Timer timer = null;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        timer = new Timer(true);
        timer.scheduleAtFixedRate(new TimerTask() {

            @Override
            public void run() {
                //definir le contexte UPA
                //car on est dans thread "user" et non dans le thread principal
                //du request WEB
                GatherDataTask t = UPA.makeSessionAware(new GatherDataTask());
                t.populate();
            }
        }, 5000, 3600000);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        timer.cancel();
    }
}
