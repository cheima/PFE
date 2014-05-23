/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;



/**
 *
 * @author Cheima
 */
//execute les cmdes sigus
public class TelnetAPI_Impl1 implements TelnetAPI {
    TelnetClient tc = new TelnetClient();
   public  String getAllSiguTraffic() throws IOException{
        String ListExecSIGU = "";
         // ArrayList<String> ListExecSIGU = new ArrayList();
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
           // ListExecSIGU.add(s);
            ListExecSIGU+= "\n"+ s;
        }
       // System.out.println(ListCmdSIGU.size());
        return ListExecSIGU;
   }

    public String getAllBsuTraffic() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public String getAllCPU() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
   
   
   
}
