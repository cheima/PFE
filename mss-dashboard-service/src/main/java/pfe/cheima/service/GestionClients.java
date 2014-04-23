/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima.service;

import java.util.List;
import net.vpc.upa.PersistenceUnit;
import net.vpc.upa.UPA;
import pfe.cheima.service.model.Address;
import pfe.cheima.service.model.Client;

/**
 *
 * @author Cheima
 */
public class GestionClients {

    public int ajouterClient(Client c) {
        PersistenceUnit pu = UPA.getPersistenceUnit();
        pu.insert(c);
        return c.getId();
    }

    public int copierClient(int id) {
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
    }
}
