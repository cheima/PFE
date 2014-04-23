package pfe.cheima.connect_to_mss;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author chaima.khalfa.stg
 */
public class GenerateCmd {

//    TelnetClient tc = new TelnetClient();

    public ArrayList<String> ExecCmd(TelnetClient tc) throws IOException {
        ArrayList<String> cmd = new ArrayList();
        int i = 0;
        String s = tc.SendCmdTelnet("ZUSI;"); // your String
        StringReader sr = new StringReader(s); // wrap your String
        BufferedReader buff = new BufferedReader(sr); // wrap your StringReader
        String line;

        while ((line = buff.readLine()) != null) {
            Pattern p = Pattern.compile(".*-.*WO-EX.*");
            Matcher m = p.matcher(line);

            while (m.find()) {
                Pattern p1 = Pattern.compile(".*-.*");
                Matcher m1 = p1.matcher(m.group());

                Pattern p2 = Pattern.compile("CLAB-.*|ET-.*|SBUS-.*|SWU-.*|EMB-.*|CLS-.*");
                Matcher m2 = p2.matcher(m.group());
                while (!m2.find() && m1.find()) {

                    String Tab[] = m1.group().split("-");

                    String Tab2[] = Tab[1].split(" ");

                    String Tab3[] = Tab[2].split(" ");

                    if ("0".equals(Tab3[0]) || "1".equals(Tab3[0])) {

                        String tab3[] = Tab[2].split(" ");

                        cmd.add("ZQRS:" + Tab[0] + "," + Tab2[0] + "," + tab3[0] + "::PRO::;");

                    } else {
                        cmd.add("ZQRS:" + Tab[0] + "," + Tab2[0] + "::PRO::;");
                    }
                }
            }
        }
        buff.close(); //Lecture fini donc on ferme le flux 
        return cmd;
    }

}
