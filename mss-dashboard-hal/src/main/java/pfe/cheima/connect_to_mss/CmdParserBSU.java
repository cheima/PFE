/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static pfe.cheima.connect_to_mss.Protocol.NONE;

/**
 *
 * @author Cheima
 */
public class CmdParserBSU {
      public List<String> parse(File s) throws IOException {
        // TelnetAPI ta = new TelnetAPI();       
        StringBuilder str = new StringBuilder();
        FileReader fr = new FileReader(s);
        char[] buffer = new char[1024];
        int count;
        while ((count = fr.read(buffer)) > 0) {
            str.append(buffer, 0, count);
        }

        return parse(s);
    }

    public List<TrafficTotal> parseSiguTraffic(String s) throws IOException {
        ArrayList ListSigu = new ArrayList<TrafficTotal>();
       // ArrayList<String> ListCmdSIGU = new ArrayList();
        // ArrayList ListSIGU = new ArrayList<Trafficforsigu>();
         ArrayList siguName = new ArrayList<String>();
        Calculator calcSCTP = new Calculator(Protocol.SCTP);
        Calculator calcIP = new Calculator(Protocol.IP);
        Calculator calcARP = new Calculator(Protocol.ARP);
        //0
        Calculator calcICMP = new Calculator(Protocol.ICMP);
        // ip+24
        Calculator calcIP6 = new Calculator(Protocol.IP6);
        Calculator calcUDP = new Calculator(Protocol.UDP);
        Calculator calcTCP = new Calculator(Protocol.TCP);
        //0
        Calculator calcIGMP = new Calculator(Protocol.IGMP);
        Calculator calcICMP6 = new Calculator(Protocol.ICMP6);
        //0
        Calculator calcUDP6 = new Calculator(Protocol.UDP6);
        //0
        Calculator calcEMB = new Calculator(Protocol.EMB);
      //  for (int i = 0; i < s.size(); i++) {
            StringReader sr = new StringReader(s); // wrap your String
            BufferedReader buff = new BufferedReader(sr); // wrap your StringReader
            String sCurrentLine;
            Protocol pr = NONE;
            Integer ip = 28;
                    long ip1 = ip.longValue();
                    Integer sctp = 94;
                    long sctp1 = sctp.longValue();
            int k= 0;
            Integer r = 0;
            Integer t = 0;
            long somreceived = r.longValue();
            long somsent = t.longValue();
            long som = t.longValue() ;
            while ((sCurrentLine = buff.readLine()) != null) {
                Pattern p20 = Pattern.compile("UNIT:.*");
                Matcher m20 = p20.matcher(sCurrentLine);
                
                

                Pattern p = Pattern.compile("^ip:$");
                Matcher m = p.matcher(sCurrentLine);

                Pattern p2 = Pattern.compile("^sctp:$");
                Matcher m2 = p2.matcher(sCurrentLine);

                Pattern p3 = Pattern.compile("^icmp:$");
                Matcher m3 = p3.matcher(sCurrentLine);

                Pattern p4 = Pattern.compile("^ip6:$");
                Matcher m4 = p4.matcher(sCurrentLine);

                Pattern p5 = Pattern.compile("^arp:$");
                Matcher m5 = p5.matcher(sCurrentLine);

                Pattern p6 = Pattern.compile("COMMAND EXECUTED");
                Matcher m6 = p6.matcher(sCurrentLine);
                ////
                Pattern p7 = Pattern.compile("^udp:$");
                Matcher m7 = p7.matcher(sCurrentLine);

                Pattern p8 = Pattern.compile("^tcp:$");
                Matcher m8 = p8.matcher(sCurrentLine);

                Pattern p9 = Pattern.compile("^igmp:$");
                Matcher m9 = p9.matcher(sCurrentLine);

                Pattern p10 = Pattern.compile("^icmp6:$");
                Matcher m10 = p10.matcher(sCurrentLine);

                Pattern p11 = Pattern.compile("^udp6:$");
                Matcher m11 = p11.matcher(sCurrentLine);

                Pattern p12 = Pattern.compile("^emb:$");
                Matcher m12 = p12.matcher(sCurrentLine);
                ////
                if(m20.find()){
              String tab[] = m20.group().split(" ");
              siguName.add(tab[1]);
              
            }
                else if (m7.find()) {
                    pr = Protocol.UDP;
                } else if (m8.find()) {
                    pr = Protocol.TCP;
                } else if (m9.find()) {
                    pr = Protocol.IGMP;

                } else if (m10.find()) {
                    pr = Protocol.ICMP6;
                } else if (m11.find()) {
                    pr = Protocol.UDP6;
                } else if (m12.find()) {
                    pr = Protocol.EMB;
                }
                ////
                if (m.find()) {
                    pr = Protocol.IP;
                } else if (m2.find()) {
                    pr = Protocol.SCTP;
                } else if (m3.find()) {
                    pr = Protocol.ICMP;

                } else if (m4.find()) {

                    pr = Protocol.IP6;
                } else if (m5.find()) {
                    pr = Protocol.ARP;
                } ////
                else if (pr == Protocol.SCTP) {
                    calcSCTP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.IP) {
                    calcIP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.ARP) {
                    calcARP.CalcPackets(sCurrentLine);
                } ////
                else if (pr == Protocol.UDP) {
                    calcUDP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.TCP) {
                    calcTCP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.IGMP) {
                    calcIGMP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.ICMP6) {
                    calcICMP6.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.UDP6) {
                    calcUDP6.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.EMB) {
                    calcEMB.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.IP6) {
                    calcIP6.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.ICMP) {
                    calcICMP.CalcPackets(sCurrentLine);
                }
                 /////   

                if (m6.find()) {                    
                    //FOR SCTP size 1500 octet
                    TrafficTotal ModuleSigu = new TrafficTotal();
                    ModuleSigu.setTotalreceived(calcSCTP.received * sctp1);
                    System.out.println("total SCTP received for SIGU " + ModuleSigu.getTotalreceived());
                    somreceived += ModuleSigu.getTotalreceived();
                   // som += somreceived;
                    ModuleSigu.setTotalsent(calcSCTP.sent * sctp1);
                    System.out.println("total SCTP sent for SIGU " + ModuleSigu.getTotalsent());
                    somsent += ModuleSigu.getTotalsent();
                   // som += somsent;
//                ListSomProtocol.add(ModuleSigu);

                    //FOR IP size 1500 octet
                    TrafficTotal ModuleSigu1 = new TrafficTotal();
                    ModuleSigu1.setTotalreceived(calcIP.received * ip1);
                    System.out.println("total IP received for SIGU " + ModuleSigu1.getTotalreceived());
                    somreceived += ModuleSigu1.getTotalreceived();
                   // som += somreceived;
                    ModuleSigu1.setTotalsent(calcIP.sent * ip1);
                    System.out.println("total IP sent for SIGU " + ModuleSigu1.getTotalsent());
                    somsent += ModuleSigu1.getTotalsent();
                   // som += somsent;
                  //  ListSomProtocol.add(ModuleSigu1);

                    //FOR ARP size?
                    TrafficTotal ModuleSigu2 = new TrafficTotal();
                    ModuleSigu2.setTotalreceived(calcARP.received);
                    System.out.println("total ARP received for SIGU " + ModuleSigu2.getTotalreceived());
                    somreceived += ModuleSigu2.getTotalreceived();
                    som += somreceived;
                    ModuleSigu2.setTotalsent(calcARP.sent);
                    System.out.println("total ARP sent for SIGU " + ModuleSigu2.getTotalsent());
                    somsent += ModuleSigu2.getTotalsent();
                    som += somsent;
           //     ListSomProtocol.add(ModuleSigu2);

                    //FOR TCP size 1500 octet
                    TrafficTotal ModuleSigu3 = new TrafficTotal();
                    ModuleSigu3.setTotalreceived(calcTCP.received);
                    System.out.println("total TCP received for SIGU " + ModuleSigu3.getTotalreceived());
                    somreceived += ModuleSigu3.getTotalreceived();
                    som += somreceived;
                    ModuleSigu3.setTotalsent(calcTCP.sent);
                    System.out.println("total TCP sent for SIGU " + ModuleSigu3.getTotalsent());
                    somsent += ModuleSigu3.getTotalsent();
                    som += somsent;
//                ListSomProtocol.add(ModuleSigu3);

                    // FOR IGMP size?
                    /*Trafficforsigu ModuleSigu4 = new Trafficforsigu();
                    ModuleSigu4.setPacketreceived(calcIGMP.received);
                    System.out.println("total IGMP received for SIGU " + ModuleSigu4.getPacketreceived());
                    somreceived += ModuleSigu4.getPacketreceived();
                    som += somreceived;
                    ModuleSigu4.setPacketsent(calcIGMP.sent);
                    System.out.println("total IGMP sent for SIGU " + ModuleSigu4.getPacketsent());
                    somsent += ModuleSigu4.getPacketsent();
                    som += somsent;*/
           //     ListSomProtocol.add(ModuleSigu4);

                    //FOR ICMP size 1500
                   /* Trafficforsigu ModuleSigu5 = new Trafficforsigu();
                    ModuleSigu5.setPacketreceived(calcICMP.received);
                    System.out.println("total ICMP received for SIGU " + ModuleSigu5.getPacketreceived());
                    somreceived += ModuleSigu5.getPacketreceived();
                    som += somreceived;
                    ModuleSigu5.setPacketsent(calcICMP.sent);
                    System.out.println("total ICMP sent for SIGU " + ModuleSigu5.getPacketsent());
                    somsent += ModuleSigu5.getPacketsent();
                    som += somsent;*/
              //  ListSomProtocol.add(ModuleSigu5);

                    //FOR IP6 size 1500 octet ??
                   /* Trafficforsigu ModuleSigu6 = new Trafficforsigu();
                    ModuleSigu6.setPacketreceived(calcIP6.received);
                    System.out.println("total IP6 received for SIGU " + ModuleSigu6.getPacketreceived());
                    somreceived += ModuleSigu6.getPacketreceived();
                    som += somreceived;
                    ModuleSigu6.setPacketsent(calcIP6.sent);
                    System.out.println("total IP6 sent for SIGU " + ModuleSigu6.getPacketsent());
                    somsent += ModuleSigu6.getPacketsent();
                    som += somsent;*/
              //  ListSomProtocol.add(ModuleSigu6);

                    //FOR UDP size 1500 octet
                   /* Trafficforsigu ModuleSigu7 = new Trafficforsigu();
                    ModuleSigu7.setPacketreceived(calcUDP.received);
                    System.out.println("total UDP received for SIGU " + ModuleSigu7.getPacketreceived());
                    somreceived += ModuleSigu7.getPacketreceived();
                    som += somreceived;
                    ModuleSigu7.setPacketsent(calcUDP.sent);
                    System.out.println("total UDP sent for SIGU " + ModuleSigu7.getPacketsent());
                    somsent += ModuleSigu7.getPacketsent();
                    som += somsent;*/
               // ListSomProtocol.add(ModuleSigu7);

                    //ICMP6 size??
                  /*  Trafficforsigu ModuleSigu8 = new Trafficforsigu();
                    ModuleSigu8.setPacketreceived(calcICMP6.received);
                    System.out.println("total ICMP6 received for SIGU " + ModuleSigu8.getPacketreceived());
                    somreceived += ModuleSigu8.getPacketreceived();
                    som += somreceived;
                    ModuleSigu8.setPacketsent(calcICMP6.sent);
                    System.out.println("total ICMP6 sent for SIGU " + ModuleSigu8.getPacketsent());
                    somsent += ModuleSigu8.getPacketsent();
                    som += somsent;*/
             //   ListSomProtocol.add(ModuleSigu8);

                    //UDP6 size ?
                   TrafficTotal ModuleSigu9 = new TrafficTotal();
                    ModuleSigu9.setTotalreceived(calcUDP6.received);
                    System.out.println("total UDP6 received for SIGU " + ModuleSigu9.getTotalreceived());
                    somreceived += ModuleSigu9.getTotalreceived();
                    som += somreceived;
                    ModuleSigu9.setTotalsent(calcUDP6.sent);
                    System.out.println("total UDP6 sent for SIGU " + ModuleSigu9.getTotalsent());
                    somsent += ModuleSigu9.getTotalsent();
                    som += somsent;
          //      ListSomProtocol.add(ModuleSigu9);

                    //EMB size?
                    TrafficTotal ModuleSigu10 = new TrafficTotal();
                    ModuleSigu10.setTotalreceived(calcEMB.received);
                    System.out.println("total EMB received for SIGU " + ModuleSigu10.getTotalreceived());
                    somreceived += ModuleSigu10.getTotalreceived();
                    som += somreceived;
                    ModuleSigu10.setTotalsent(calcEMB.sent);
                    System.out.println("total EMB sent for SIGU " + ModuleSigu10.getTotalsent());
                    somsent += ModuleSigu10.getTotalsent();
                    som += somsent;
                    //    ListSomProtocol.add(ModuleSigu10);
                    pr = Protocol.NONE;
                    Integer y = 0;
                    long x = y.longValue();
                    calcSCTP.received = x;
                    calcSCTP.sent = x;
                    calcIP.received = x;
                    calcIP.sent = x;
                    calcARP.received = x;
                    calcARP.sent = x;
                    calcICMP.received = x;
                    calcICMP.sent = x;
                    calcIP6.received = x;
                    calcIP6.sent = x;
                    calcUDP.received = x;
                    calcUDP.sent = x;
                    calcTCP.received = x;
                    calcTCP.sent = x;
                    calcIGMP.received = x;
                    calcIGMP.sent = x;
                    calcICMP6.received = x;
                    calcICMP6.sent = x;
                    calcUDP6.received = x;
                    calcUDP6.sent = x;
                    calcEMB.received = x;
                    calcEMB.sent = x;
                   // Double z = 0.000012;
                    long q = (long)(somreceived );
                    long v = (long)(somsent);
                    TrafficTotal trafficSIGU = new TrafficTotal();
                    trafficSIGU.setTotalreceived (q);
                    trafficSIGU.setTotalsent(v);
                    trafficSIGU.setTotalsomme(q+v);
//                    trafficSIGU.setSiguName((String) siguName.get(k));
                    k++;
                    ListSigu.add(trafficSIGU);
                    somsent = x;
                    somreceived = x;
                    //som = x;
                    
                   
                }
            }
     //   }

        // System.out.println(ListCmdSIGU.size());
        return ListSigu;
    }

}
