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

        boolean testSIGU = false;    //0
        boolean testVLRU = false;     //2
        boolean testBSU = false;    //1
        boolean testCCSU = false;   //3
        boolean  testCHU = false;   //4
        boolean testBDCU = false;   //5
        boolean testCMU = false;   //6
        boolean testSTU = false;   //7
        boolean testOMU = false;   //8
        boolean testCMM = false;   //9
        LoadPercentCpu l;
       // l = null;
         l = new LoadPercentCpu();
         while ((line = buff.readLine()) != null) {
            Pattern p = Pattern.compile("(UNIT:)(\\s+)(\\w+\\-\\w+\\-?\\w?).*");
            Matcher m = p.matcher(line);

            Pattern p1 = Pattern.compile("(LOAD PERCENT:)(\\s+)(\\d{1,3}).*");
            Matcher m1 = p1.matcher(line);

            if (m.find() && 22 <= m.group(2).length()) {

                if (m.group(3).contains("SIGU")) {
                    testSIGU = true;
                    l = new LoadPercentCpu();
                    l.setModuleName(m.group(3));
                      l.setType(0);
                    System.out.println(l.getModuleName() + "sigu");

                } else if (m.group(3).contains("BSU")) {
                     l = new LoadPercentCpu();
                    testBSU = true;
                    l.setModuleName(m.group(3));
                      l.setType(1);
                    System.out.println(m.group(3) + "bsu");
                    //type = 3
                } else if (m.group(3).contains("VLRU")) {
                     l = new LoadPercentCpu();
                    testVLRU = true;
                    l.setModuleName(m.group(3));
                      l.setType(2);
                   // System.out.println(m.group(3) + "vlru");
                      //type= 4
                } else if (m.group(3).contains("CCSU")) {
                     l = new LoadPercentCpu();
                    testCCSU = true;
                    l.setModuleName(m.group(3));
                    l.setType(3);
                }
                //TYPE 5
                else if (m.group(3).contains("CHU")) {
                     l = new LoadPercentCpu();
                    testCHU = true;
                    l.setModuleName(m.group(3));
                    l.setType(4);
                }
                //TYPE 6
                else if (m.group(3).contains("BDCU")) {
                     l = new LoadPercentCpu();
                    testBDCU = true;
                    l.setModuleName(m.group(3));
                      l.setType(5);
                   // System.out.println(m.group(3) + "vlru");
                      //type= 6
                } else if (m.group(3).contains("CMU")) {
                     l = new LoadPercentCpu();
                    testCMU = true;
                    l.setModuleName(m.group(3));
                    l.setType(6);
                }
                //TYPE 7
                else if (m.group(3).contains("STU")) {
                     l = new LoadPercentCpu();
                    testSTU = true;
                    l.setModuleName(m.group(3));
                    l.setType(7);
                }
                //TYPE 8
                else if (m.group(3).contains("OMU")) {
                     l = new LoadPercentCpu();
                    testOMU = true;
                    l.setModuleName(m.group(3));
                    l.setType(8);
                }
                //TYPE 9
                else if (m.group(3).contains("CMM")) {
                     l = new LoadPercentCpu();
                    testCMM = true;
                    l.setModuleName(m.group(3));
                    l.setType(9);
                }
            }
            int ind;
            if (m1.find() && 21 <= m1.group(2).length()) {
                if (testSIGU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    System.out.println("les elts de l sont " + l.getModuleName() + "eee" + l.getLoadCPU());
                    testSIGU = false;
                } else if (testBSU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testBSU = false;
                } else if (testVLRU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testVLRU = false;
                } else if (testCCSU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testCCSU = false;
                }
                else if (testCHU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testCHU = false;
                } else if (testBDCU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testBDCU = false;
                } else if (testCMU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testCMU = false;
                }
                 else if (testSTU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testSTU = false;
                }
                else if (testCMU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testCMU = false;
                }
                 else if (testSTU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testSTU = false;
                }
                else if (testCMM == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testCMM = false;
                }
                 else if (testOMU == true) {
                    ind = Integer.parseInt(m1.group(3));
                    l.setLoadCPU(ind);
                    cpu.add(l);
                    testOMU = false;
                }
            }
        }
        for (int g = 0; g < cpu.size(); g++) {
            System.out.println("bjr" + cpu.get(g).toString());
        }
        System.out.println("le nre est cpuu" + cpu.size());
        return cpu;
    }

}
