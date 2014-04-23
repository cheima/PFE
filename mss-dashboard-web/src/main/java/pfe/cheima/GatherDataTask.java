/*t
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima;

import java.io.IOException;
import java.text.ParseException;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;
import pfe.cheima.service.GestionTraffic;

/**
 *
 * @author Cheima
 */
//definir les requetes qui vont etre executés périodiquement
public class GatherDataTask {

    public void populate() {
        GestionTraffic t = new GestionTraffic();
        try {
            t.populate();
        } catch (ParseException ex) {
            Logger.getLogger(GatherDataTask.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(GatherDataTask.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
