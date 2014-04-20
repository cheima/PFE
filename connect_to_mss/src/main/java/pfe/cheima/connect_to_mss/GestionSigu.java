/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import pfe.cheima.service.GenerateCmd;
import pfe.cheima.service.TelnetClient;

/**
 *
 * @author Cheima
 */
public class GestionSigu {
     public List<String> ListCmdSIGU(TelnetClient tc) throws IOException{
        GenerateCmd gc = new GenerateCmd();
        List<String> ExecCmd = gc.ExecCmd(tc);

        Pattern pa = Pattern.compile("ZQRS: SIGU,[0-9].*::PRO::;");
        ArrayList<String> ListCmdSIGU = new ArrayList();
        for(int i=0;i<ExecCmd.size();i++){
             Matcher m = pa.matcher(ExecCmd.get(i));
            if(m.find()){
                ListCmdSIGU.add(m.group());            
            }
        }
        return  ListCmdSIGU;
     }
     
     
     
    
}
