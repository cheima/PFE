package pfe.cheima;

import java.util.List;
import net.vpc.upa.PersistenceUnit;
import net.vpc.upa.UPA;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        PersistenceUnit pu=UPA.getPersistenceUnit();
        Client c=new Client();
        c.setName("Alia");
        System.out.println("L'ancien ID="+c.getId());
        pu.insert(c);
        System.out.println("Le nouveau ID="+c.getId());
        
        
        Address a=new Address();
        a.setCity("Sousse");
        a.setRoad("Yesser Arafet");
        a.setClient(c);
        pu.insert(a);
        
        
        List<Client> entityList = pu.createQuery("Select y from Client y").getEntityList();
        for (Client client : entityList) {
            System.out.println(client);
        }
        List<Address> addresses = pu.createQuery("Select a from Address a where a.client.name like :qqc")
                .setParameter("qqc", "A%")
                .getEntityList();
        for (Address add : addresses) {
            System.out.println(add);
        }
    }
}
