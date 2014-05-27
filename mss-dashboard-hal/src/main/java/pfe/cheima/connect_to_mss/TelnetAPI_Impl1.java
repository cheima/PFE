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

    // MSSFacade m = new MSSFacade();
    TelnetClient tc = new TelnetClient();

    //public static boolean test = true;
    public String getAllSiguTraffic(String ip) throws IOException {

       // tc.ConnectMSS("10.106.120.4", "STAG01", "AZERTY");
        tc.ConnectMSS(ip, "STAG01", "AZERTY");
        String ListExecSIGU = "";
        // ArrayList<String> ListExecSIGU = new ArrayList();
        ArrayList<String> ListCmdSIGU = new ArrayList();
        GenerateCmd gc = new GenerateCmd();
        Pattern pa = Pattern.compile("ZQRS: SIGU,[0-9].*::PRO::;");
        ArrayList<String> ExecCmd = gc.ExecCmd(tc);
        for (int i = 0; i < ExecCmd.size(); i++) {
            Matcher m = pa.matcher(ExecCmd.get(i));
            if (m.find()) {
                ListCmdSIGU.add(m.group());
            }
        }
        for (int k = 0; k < ListCmdSIGU.size(); k++) {
            System.out.println(ListCmdSIGU.get(k));
            String s = tc.SendCmdTelnet(ListCmdSIGU.get(k));
            // ListExecSIGU.add(s);
            ListExecSIGU += "\n" + s;
        }
        // System.out.println(ListCmdSIGU.size());     
        return ListExecSIGU;
    }

    public String getAllBsuTraffic() throws IOException {
        // m.ConnectMSS("10.106.120.4", "STAG01", "AZERTY");
        String ListExecSIGU = "";
        // ArrayList<String> ListExecSIGU = new ArrayList();
        ArrayList<String> ListCmdBSU = new ArrayList();
        GenerateCmd gc = new GenerateCmd();
        Pattern pa = Pattern.compile("ZQRS: BSU,[0-9].*::PRO::;");
        ArrayList<String> ExecCmd = gc.ExecCmd(tc);
        for (int i = 0; i < ExecCmd.size(); i++) {
            Matcher m = pa.matcher(ExecCmd.get(i));
            if (m.find()) {
                ListCmdBSU.add(m.group());
            }
        }
        for (int k = 0; k < ListCmdBSU.size(); k++) {
            System.out.println(ListCmdBSU.get(k));
            String s = tc.SendCmdTelnet(ListCmdBSU.get(k));
            // ListExecSIGU.add(s);
            ListExecSIGU += "\n" + s;
        }
        // System.out.println(ListCmdSIGU.size());
        return ListExecSIGU;
    }

    public String getAllCPU() throws IOException {
        // m.ConnectMSS("10.106.120.4", "STAG01", "AZERTY");
        String ListExecSIGU = "";
        String s = tc.SendCmdTelnet("ZDOI;");
        System.out.println(s);
        ListExecSIGU += "\n" + s;
        return ListExecSIGU;
    }

}
