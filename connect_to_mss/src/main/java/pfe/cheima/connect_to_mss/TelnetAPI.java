/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.IOException;
import java.util.ArrayList;
import static java.util.Date.parse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import pfe.cheima.service.GenerateCmd;
import pfe.cheima.service.TelnetClient;


/**
 *
 * @author Cheima
 */
//execute les cmdes sigus
public class TelnetAPI {
    TelnetClient tc = new TelnetClient();
   public  ArrayList<String> ListCmdSigu() throws IOException{
       
       ArrayList<String> ListCmdSIGU = new ArrayList();
        GenerateCmd gc = new GenerateCmd();
        Pattern pa = Pattern.compile("ZQRS: SIGU,[0-9].*::PRO::;");
        ArrayList<String> ExecCmd = gc.ExecCmd(tc);
        for(int i=0;i<ExecCmd.size();i++){
             Matcher m = pa.matcher(ExecCmd.get(i));
            if(m.find()){
                ListCmdSIGU.add(m.group());            
            }
        }
      for (int k=0;k<ListCmdSIGU.size();k++)
        {
            System.out.println(ListCmdSIGU.get(k)); 
            String s =tc.SendCmdTelnet(ListCmdSIGU.get(k));
            ListCmdSIGU.add(s);
        }
       // System.out.println(ListCmdSIGU.size());
        return ListCmdSIGU;
   }
}
