package pfe.cheima.service;


import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;

import java.util.regex.Pattern;
import static pfe.cheima.service.Protocol.NONE;


import pfe.cheima.service.model.Trafficforsigu;

public class NewClasse {
    
    ArrayList siguName = new ArrayList<String>();

    public List<Trafficforsigu> Lecture() throws FileNotFoundException, IOException {
        // array for each protocol 
     //   ArrayList ListSomProtocol = new ArrayList<Trafficforsigu>();
        //array for each sigu
         ArrayList ListSigu = new ArrayList<Trafficforsigu>();
        Calculator calcSCTP = new Calculator(Protocol.SCTP);
        Calculator calcIP = new Calculator(Protocol.IP);
        Calculator calcARP = new Calculator(Protocol.ARP);
        Calculator calcICMP = new Calculator(Protocol.ICMP);
        Calculator calcIP6 = new Calculator(Protocol.IP6);
        Calculator calcUDP = new Calculator(Protocol.UDP);
        Calculator calcTCP = new Calculator(Protocol.TCP);
        Calculator calcIGMP = new Calculator(Protocol.IGMP);
        Calculator calcICMP6 = new Calculator(Protocol.ICMP6);
        Calculator calcUDP6 = new Calculator(Protocol.UDP6);
        Calculator calcEMB = new Calculator(Protocol.EMB);

        BufferedReader br = new BufferedReader(new FileReader("F:\\PFE\\FolderForGit\\upa-test-service\\test.txt"));

        String sCurrentLine;
        Protocol pr = NONE;
        //calcul la somme des protocoles dans un sigu
        int somreceived =0;
        int somsent=0;
        while ((sCurrentLine = br.readLine()) != null) {
            //System.out.println(sCurrentLine);
            ///
            Pattern p20 = Pattern.compile("UNIT:.*");
            Matcher m20 = p20.matcher(sCurrentLine);
            ///
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
            ////

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

            if (m6.find()) {
                //FOR SCTP size 1500 octet
                Trafficforsigu ModuleSigu = new Trafficforsigu();
                ModuleSigu.setPacketreceived(calcSCTP.received);
                System.out.println("total SCTP received for SIGU " + ModuleSigu.getPacketreceived());
                somreceived+=ModuleSigu.getPacketreceived();
                ModuleSigu.setPacketsent(calcSCTP.sent);
                System.out.println("total SCTP sent for SIGU " + ModuleSigu.getPacketsent());
                somsent+=ModuleSigu.getPacketsent();
//                ListSomProtocol.add(ModuleSigu);

                //FOR IP size 1500 octet
                Trafficforsigu ModuleSigu1 = new Trafficforsigu();
                ModuleSigu1.setPacketreceived(calcIP.received);
                System.out.println("total IP received for SIGU " + ModuleSigu1.getPacketreceived());
                somreceived+=ModuleSigu1.getPacketreceived();
                ModuleSigu1.setPacketsent(calcIP.sent);
                System.out.println("total IP sent for SIGU " + ModuleSigu1.getPacketsent());
                somsent+=ModuleSigu1.getPacketsent();
//                ListSomProtocol.add(ModuleSigu1);

                //FOR ARP size?
                Trafficforsigu ModuleSigu2 = new Trafficforsigu();
                ModuleSigu2.setPacketreceived(calcARP.received);
                System.out.println("total ARP received for SIGU " + ModuleSigu2.getPacketreceived());
                somreceived+=ModuleSigu2.getPacketreceived();
                ModuleSigu2.setPacketsent(calcARP.sent);
                System.out.println("total ARP sent for SIGU " + ModuleSigu2.getPacketsent());
                somsent+=ModuleSigu2.getPacketsent();
           //     ListSomProtocol.add(ModuleSigu2);

                //FOR TCP size 1500 octet
                Trafficforsigu ModuleSigu3 = new Trafficforsigu();
                ModuleSigu3.setPacketreceived(calcTCP.received);
                System.out.println("total TCP received for SIGU " + ModuleSigu3.getPacketreceived());
                somreceived+=ModuleSigu3.getPacketreceived();
                ModuleSigu3.setPacketsent(calcTCP.sent);
                System.out.println("total TCP sent for SIGU " + ModuleSigu3.getPacketsent());
                somsent+=ModuleSigu3.getPacketsent();
//                ListSomProtocol.add(ModuleSigu3);

                // FOR IGMP size?
                Trafficforsigu ModuleSigu4 = new Trafficforsigu();
                ModuleSigu4.setPacketreceived(calcIGMP.received);
                System.out.println("total IGMP received for SIGU " + ModuleSigu4.getPacketreceived());
                somreceived+=ModuleSigu4.getPacketreceived();
                ModuleSigu4.setPacketsent(calcIGMP.sent);
                System.out.println("total IGMP sent for SIGU " + ModuleSigu4.getPacketsent());
                somsent+=ModuleSigu4.getPacketsent();
           //     ListSomProtocol.add(ModuleSigu4);

                //FOR ICMP size 1500
                Trafficforsigu ModuleSigu5 = new Trafficforsigu();
                ModuleSigu5.setPacketreceived(calcICMP.received);
                System.out.println("total ICMP received for SIGU " + ModuleSigu5.getPacketreceived());
                somreceived+=ModuleSigu5.getPacketreceived();
                ModuleSigu5.setPacketsent(calcICMP.sent);
                System.out.println("total ICMP sent for SIGU " + ModuleSigu5.getPacketsent());
                somsent+=ModuleSigu5.getPacketsent();
              //  ListSomProtocol.add(ModuleSigu5);

                //FOR IP6 size 1500 octet ??
                Trafficforsigu ModuleSigu6 = new Trafficforsigu();
                ModuleSigu6.setPacketreceived(calcIP6.received);
                System.out.println("total IP6 received for SIGU " + ModuleSigu6.getPacketreceived());
                somreceived+=ModuleSigu6.getPacketreceived() ;
                ModuleSigu6.setPacketsent(calcIP6.sent);
                System.out.println("total IP6 sent for SIGU " + ModuleSigu6.getPacketsent());
                somsent+=ModuleSigu6.getPacketsent();
              //  ListSomProtocol.add(ModuleSigu6);

                //FOR UDP size 1500 octet
                Trafficforsigu ModuleSigu7 = new Trafficforsigu();
                ModuleSigu7.setPacketreceived(calcUDP.received);
                System.out.println("total UDP received for SIGU " + ModuleSigu7.getPacketreceived());
                somreceived+=ModuleSigu7.getPacketreceived();
                ModuleSigu7.setPacketsent(calcUDP.sent);
                System.out.println("total UDP sent for SIGU " + ModuleSigu7.getPacketsent());
                somsent+=ModuleSigu7.getPacketsent();
               // ListSomProtocol.add(ModuleSigu7);

                //ICMP6 size??
                Trafficforsigu ModuleSigu8 = new Trafficforsigu();
                ModuleSigu8.setPacketreceived(calcICMP6.received);
                System.out.println("total ICMP6 received for SIGU " + ModuleSigu8.getPacketreceived());
                somreceived+=ModuleSigu8.getPacketreceived();
                ModuleSigu8.setPacketsent(calcICMP6.sent);
                System.out.println("total ICMP6 sent for SIGU " + ModuleSigu8.getPacketsent());
                somsent+=ModuleSigu8.getPacketsent();
             //   ListSomProtocol.add(ModuleSigu8);

                //UDP6 size ?
                Trafficforsigu ModuleSigu9 = new Trafficforsigu();
                ModuleSigu9.setPacketreceived(calcUDP6.received);
                System.out.println("total UDP6 received for SIGU " + ModuleSigu9.getPacketreceived());
                somreceived+=ModuleSigu9.getPacketreceived();
                ModuleSigu9.setPacketsent(calcUDP6.sent);
                System.out.println("total UDP6 sent for SIGU " + ModuleSigu9.getPacketsent());
                somsent+=ModuleSigu9.getPacketsent();
          //      ListSomProtocol.add(ModuleSigu9);

                //EMB size?
                Trafficforsigu ModuleSigu10 = new Trafficforsigu();
                ModuleSigu10.setPacketreceived(calcEMB.received);
                System.out.println("total EMB received for SIGU " + ModuleSigu10.getPacketreceived());
                somreceived+=ModuleSigu10.getPacketreceived();
                ModuleSigu10.setPacketsent(calcEMB.sent);
                System.out.println("total EMB sent for SIGU " + ModuleSigu10.getPacketsent());
                somsent+=ModuleSigu10.getPacketsent();
            //    ListSomProtocol.add(ModuleSigu10);

                pr = Protocol.NONE;
                calcSCTP.received = 0;
                calcSCTP.sent = 0;
                calcIP.received = 0;
                calcIP.sent = 0;
                calcARP.received = 0;
                calcARP.sent = 0;
                calcICMP.received = 0;
                calcICMP.sent = 0;
                calcIP6.received = 0;
                calcIP6.sent = 0;
                calcUDP.received = 0;
                calcUDP.sent = 0;
                calcTCP.received = 0;
                calcTCP.sent = 0;
                calcIGMP.received = 0;
                calcIGMP.sent = 0;
                calcICMP6.received = 0;
                calcICMP6.sent = 0;
                calcUDP6.received = 0;
                calcUDP6.sent = 0;
                calcEMB.received = 0;
                calcEMB.sent = 0;
            Trafficforsigu trafficSIGU = new Trafficforsigu();
            trafficSIGU.setPacketreceived((int)(somreceived *0.000012));
            trafficSIGU.setPacketsent((int)(somsent *0.000012));
            ListSigu.add(trafficSIGU);
             somsent=0;
            somreceived=0;
            } 
        }
        // for(int g=0;g<ListSIGU.size()<g++)
        //System.out.println(ListSigu.size());
        for(int g=0;g<siguName.size();g++){
        System.out.println(siguName.get(g));
        }
        return ListSigu;
    }
}
