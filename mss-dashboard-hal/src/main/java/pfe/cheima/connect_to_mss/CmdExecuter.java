/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.Random;


/**
 *
 * @author Cheima
 */
public class CmdExecuter {
        
       public List<TrafficTotal> getAllSiguTraffic(String ip) throws IOException{
            // TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
           
        TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
        CmdParser cp = new CmdParser();
       
        String ListCmdSigu = ta.getAllSiguTraffic(ip);
        List<TrafficTotal> allStats = cp.parseSiguTraffic(ListCmdSigu);
       // allStats.addAll(allStats);

           // ---- modifier les valeurs du fichier text - les cpus -- a supprimer
           Calendar c = Calendar.getInstance();
           c.set(Calendar.MONTH, 0);
           c.set(Calendar.YEAR, 0);
           long valeur_de_base = c.getTimeInMillis()/1000;
           for(TrafficTotal traffic : allStats){
               Random r = new Random();
               int i = r.nextInt(200);
               int i2 = r.nextInt(200);
               traffic.setTotalreceived(i+valeur_de_base);
               traffic.setTotalsent(i2+valeur_de_base);
           }

           return allStats;

       }
       
       public List<TrafficTotal> getAllBsuTraffic() throws IOException {
           
           TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
           CmdParserBSU cp = new CmdParserBSU();
           String ListCmdBsu = ta.getAllBsuTraffic();
           List<TrafficTotal> allStats = cp.parseSiguTraffic(ListCmdBsu);

                      // ---- modifier les valeurs du fichier text - les cpus -- a supprimer
           Calendar c = Calendar.getInstance();
           c.set(Calendar.MONTH, 0);
           c.set(Calendar.YEAR, 0);
           long valeur_de_base = c.getTimeInMillis()/1000;
           for(TrafficTotal traffic : allStats){
               Random r = new Random();
               int i = r.nextInt(200);
               int i2 = r.nextInt(200);
               traffic.setTotalreceived(i+valeur_de_base);
               traffic.setTotalsent(i2+valeur_de_base);
           }

           return allStats;
       }
       
        public List<LoadPercentCpu> getAllCPU() throws IOException {
           
           TelnetAPI_Impl2 ta = new TelnetAPI_Impl2();
           CmdParserCPU cp = new CmdParserCPU();
           String ListCmdCPU = ta.getAllCPU();
           List<LoadPercentCpu> allStats = cp.Comparaison(ListCmdCPU);
           
           // ---- modifier les valeurs du fichier text - les cpus -- a supprimer
           Calendar c = Calendar.getInstance();
           int valeur_de_base = c.get(Calendar.MINUTE);
           for(LoadPercentCpu cpu : allStats){
               Random r = new Random();
               int i = r.nextInt(5);
               cpu.setLoadCPU(i+valeur_de_base);
           }
           return allStats;
       }
}
///hethi il methode ili teb3a il telent
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*package pfe.cheima.connect_to_mss;

import java.io.IOException;
import java.util.List;



public class CmdExecuter {
        
       public List<TrafficTotal> getAllSiguTraffic(String ip) throws IOException{
            // TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
           
        TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
        CmdParser cp = new CmdParser();
       
        String ListCmdSigu = ta.getAllSiguTraffic(ip);
        List<TrafficTotal> allStats = cp.parseSiguTraffic(ListCmdSigu);
       // allStats.addAll(allStats);
        return allStats;

       }
       
       public List<TrafficTotal> getAllBsuTraffic() throws IOException {
           
           TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
           CmdParserBSU cp = new CmdParserBSU();
           String ListCmdBsu = ta.getAllBsuTraffic();
           List<TrafficTotal> allStats = cp.parseSiguTraffic(ListCmdBsu);
           return allStats;
       }
       
        public List<LoadPercentCpu> getAllCPU() throws IOException {
           
           TelnetAPI_Impl1 ta = new TelnetAPI_Impl1();
           CmdParserCPU cp = new CmdParserCPU();
           String ListCmdCPU = ta.getAllCPU();
           List<LoadPercentCpu> allStats = cp.Comparaison(ListCmdCPU);
           
           // modifier les valeurs du fichier text - les cpus
          /* Calendar c = Calendar.getInstance();
           int valeur_de_base = c.get(Calendar.MINUTE);
           for(LoadPercentCpu cpu : allStats){
               Random r = new Random();
               int i = r.nextInt(5);
               cpu.setLoadCPU(i+valeur_de_base);
           }*/
          /* return allStats;
       }
}*/