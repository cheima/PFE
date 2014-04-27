/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.service;

import net.vpc.upa.PersistenceUnit;
import net.vpc.upa.UPA;
import pfe.cheima.connect_to_mss.MSSFacade;
import pfe.cheima.service.model.Login;

/**
 *
 * @author Cheima
 */
public class GestionLogin {
    
    public void Connection(){
        PersistenceUnit pu = UPA.getPersistenceUnit();
        
        MSSFacade m = new MSSFacade();
        Login l = new Login();
        
    }
}
