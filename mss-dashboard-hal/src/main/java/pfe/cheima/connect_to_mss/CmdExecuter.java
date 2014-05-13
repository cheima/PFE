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
    
      
        
        
       public List<TrafficTotal> getAllSiguTraffic() throws IOException{
            // TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
           
        TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
        CmdParser cp = new CmdParser();
       
        String ListCmdSigu = ta.getAllSiguTraffic();
        List<TrafficTotal> allStats = cp.parseSiguTraffic(ListCmdSigu);
       // allStats.addAll(allStats);
        return allStats;

       }
       
       public List<TrafficTotal> getAllBsuTraffic() throws IOException {
           
           TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
           CmdParserBSU cp = new CmdParserBSU();
           String ListCmdBsu = ta.getAllBsuTraffic();
           List<TrafficTotal> allStats = cp.parseSiguTraffic(ListCmdBsu);
           return allStats;
       }
       
        public List<LoadPercentCpu> getAllCPU() throws IOException {
           
           TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
           CmdParserCPU cp = new CmdParserCPU();
           String ListCmdCPU = ta.getAllCPU();
           List<LoadPercentCpu> allStats = cp.Comparaison(ListCmdCPU);
           return allStats;
       }
}
