/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima.connect_to_mss;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Cheima
 */
public class CmdParserCPU {

    public List<LoadPercentCpu> Comparaison(String s) throws IOException {
        String line;
        StringReader sr = new StringReader(s); // wrap your String
        BufferedReader buff = new BufferedReader(sr); // wrap your StringReader
        List cpu = new ArrayList<LoadPercentCpu>();

        boolean testSIGU = false;
        boolean testVLRU = false;
        boolean testBSU = false;
        LoadPercentCpu l;
        while ((line = buff.readLine()) != null) {
            Pattern p = Pattern.compile("(UNIT:)(\\s+)(\\w+\\-\\w+\\-?\\w?).*");
            Matcher m = p.matcher(line);

            Pattern p1 = Pattern.compile("(LOAD PERCENT:)(\\s+)(\\d{1,3}).*");
            Matcher m1 = p1.matcher(line);

            l = new LoadPercentCpu();

            if (m.find() && 22 <= m.group(2).length()) {

                if (m.group(3).contains("SIGU")) {
                    testSIGU = true;
                    l.setModuleName(m.group(3));
                    System.out.println(m.group(3) + "sigu");
                    
                }
                /*else  if (m.group(3).contains("BSU")) {
                    testBSU = true;
                    l.setModuleName(m.group(3));
                    System.out.println(m.group(3) + "bsu");
                    
                }
                 else  if (m.group(3).contains("VLRU")) {
                    testVLRU = true;
                    l.setModuleName(m.group(3));
                    System.out.println(m.group(3) + "vlru");
                    
                }*/
            }
            int ind;
            if (m1.find() && 21 <= m1.group(2).length()) {
                if (testSIGU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testSIGU = false;
                }
               /* else if (testBSU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testBSU = false;
                }
                 else if (testVLRU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testVLRU = false;
                }*/

            }
        }
        for(int g =0 ; g<cpu.size();g++)
        {
            System.out.println("bjr"+cpu.get(g).toString());
        }
        System.out.println("le nre est" +cpu.size());
        return cpu;
    }

}
