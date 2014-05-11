package pfe.cheima.mss.dashboard.test;

import java.util.List;
import java.util.logging.Filter;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;
import net.vpc.upa.UPA;
import pfe.cheima.service.model.Trafficforsigu;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Logger.getLogger("net").setFilter(new Filter() {

            public boolean isLoggable(LogRecord lr) {
                return true;
            }
        });
        Logger.getLogger("net").setLevel(Level.FINEST);
        net.vpc.upa.PersistenceUnit pu = UPA.getPersistenceUnit();

        // dernier TimePoint dans la base
        Integer lastTime = pu.createQuery("select max(t.id) from TimePoint t").getNumber().intValue();
        // top 10 trafficforsigu à l'instant lastTime
        List<Trafficforsigu> entityList0 = pu.createQuery("select a from trafficforsigu a left join modules m ON a.siguId = m.id where m.type = 0 and  a.dateExec = :d order by a.packetreceived DESC")
                .setParameter("d", lastTime)
                .getEntityList();
        System.out.println(entityList0);
    }
}
