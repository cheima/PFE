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
 * @author chaima.khalfa.stg
 */
public class CmdParserCPU9dim {

    TelnetClient tc = new TelnetClient();
    String[][] tabSIGU;
    String[][] tabVLRU;
    String[][] tabBSU;

    public  List<LoadPercentCpu> Comparaison( String s) throws IOException {
      //  ArrayList<LoadPercentCpu> cp = new ArrayList<LoadPercentCpu>();
        ArrayList cp = new ArrayList<LoadPercentCpu>();
        LoadPercentCpu lpsigu = new LoadPercentCpu();
        LoadPercentCpu lpvlru = new LoadPercentCpu();
        LoadPercentCpu lpbsu = new LoadPercentCpu();
        
      //  tc.ConnectMSS("10.106.120.4", "STAG01", "AZERTY");
        //String k = tc.SendCmdTelnet("ZDOI;"); // your String
        StringReader sr = new StringReader(s); // wrap your String
        BufferedReader buff = new BufferedReader(sr); // wrap your StringReader
        tabSIGU = new String[70][2];
        tabVLRU = new String[20][2];
        tabBSU = new String[30][2];
        String line;
        boolean testSIGU = false;
        boolean testVLRU = false;
        boolean testBSU = false;
        int l = 0;
        int j;
        int n = 0;
        int f = 0;
        int a = 0;
        int b = 0;
        int h = 0;
        int q = 0;
        while ((line = buff.readLine()) != null) {
            Pattern p = Pattern.compile("(UNIT:)(\\s+)(\\w+\\-\\w+\\-?\\w?).*");
            Matcher m = p.matcher(line);
            
            if (m.find() && 22 <= m.group(2).length()) {

                //  System.out.println("le protocole est "+m.group(3));
                if (m.group(3).contains("SIGU")) {
                 
                    testSIGU = true;
                    tabSIGU[n][0] = m.group(3);
                     System.out.println("Le module " + tabSIGU[n][0]);
                     lpsigu.setModuleName(tabSIGU[n][0]);
                    n++;

                    //////******VLRU*********//////
                } else if (m.group(3).contains("VLRU")) {
                    
                    testVLRU = true;
                    tabVLRU[b][0] = m.group(3);
                    System.out.println("le module "+tabVLRU[b][0]);
                    lpvlru.setModuleName(tabVLRU[b][0]);
                    b++;
                } //////******VLRU*********//////  
                //////******BSU*********////// 
                else if (m.group(3).contains("BSU")) {
                     
                    testBSU = true;
                    tabBSU[q][0] = m.group(3);
                   System.out.println("le module "+tabBSU[q][0]);
                   lpbsu.setModuleName(tabBSU[q][0]);
                    q++;
                }
                //////******BSU*********////// 
            }
            int cpu = 0;
            Pattern p1 = Pattern.compile("(LOAD PERCENT:)(\\s+)(\\d{1,3}).*");
            Matcher m1 = p1.matcher(line);
            int ind;
            if (m1.find() && 21 <= m1.group(2).length()) {
                if (testSIGU == true) {
                    l++;
                    ind = Integer.parseInt(m1.group(3));
                    cpu += ind;
                    // System.out.println("val du cpu du est "+cpu);
                    tabSIGU[f][1] = m1.group(3);
                    System.out.println("val du cpu du SIGU " + tabSIGU[f][1]);
                    f++;
                    testSIGU = false;
                } //////******VLRU*********//////
                else if (testVLRU == true) {

                    l++;
                    ind = Integer.parseInt(m1.group(3));
                    cpu += ind;
                    // System.out.println("val du cpu du est "+cpu);
                    tabVLRU[a][1] = m1.group(3);
                    System.out.println("val du cpu du VLRU " + tabVLRU[a][1]);
                    a++;
                    testVLRU = false;
                } //////******VLRU*********//////
                //////******BSU*********//////
                else if (testBSU == true) {

                    l++;
                    ind = Integer.parseInt(m1.group(3));
                    cpu += ind;
                    // System.out.println("val du cpu du est "+cpu);
                    tabBSU[h][1] = m1.group(3);
                    System.out.println("val du cpu de BSU " + tabBSU[h][1]);
                    h++;
                    testBSU = false;
                }
                //////******BSU*********//////

            }
        }
        int ind1;
        for (String[] tabSIGU1 : tabSIGU) {
            if (tabSIGU1[1] != null) {
                ind1 = Integer.parseInt(tabSIGU1[1]);
                lpsigu.setLoadCPU(ind1);
                  cp.add(lpsigu);
                //System.out.println(tabSIGU1[1]);
            }
        }

        //////******VLRU*********/////
        int ind2;
        for (String[] tabVLRU1 : tabVLRU) {
            if (tabVLRU1[1] != null) {
                ind2 = Integer.parseInt(tabVLRU1[1]);
                lpvlru.setLoadCPU(ind2);
                  cp.add(lpvlru);
                //System.out.println("fff" + tabVLRU1[1]);
            }
        }
        //////******VLRU*********//////
        //////******BSU*********//////
        int ind3;
        for (String[] tabBSU1 : tabBSU) {
            if (tabBSU1[1] != null) {
                ind3 = Integer.parseInt(tabBSU1[1]);
                lpbsu.setLoadCPU(ind3);
                cp.add(lpbsu);
                //System.out.println("fff" + tabBSU1[1]);
            }
        }
            //////******BSU*********//////
       
         
       
        buff.close();
        return cp;
    }
}
