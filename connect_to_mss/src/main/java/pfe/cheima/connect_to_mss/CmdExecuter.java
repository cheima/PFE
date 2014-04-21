/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.IOException;
import java.util.List;


/**
 *
 * @author Cheima
 */
public class CmdExecuter {
    
      
        
        
       public List<Trafficforsigu> getAllSiguTraffic() throws IOException{
            // TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
           
           TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
        CmdParser cp = new CmdParser();
        String ListCmdSigu = ta.getAllSiguTraffic();
        List<Trafficforsigu> allStats = cp.parseSiguTraffic(ListCmdSigu);
        allStats.addAll(allStats);
        return allStats;

       }
}
