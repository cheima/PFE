/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static pfe.cheima.service.Protocol.NONE;
import pfe.cheima.service.model.BSUattribute;


/**
 *
 * @author chaima.khalfa.stg
 */
public class ExecuteCmdBSU {

    public ArrayList<String> CmdBSU(TelnetClient tc) throws IOException {
//        tc.ConnectMSS("10.106.120.4", "STAG01", "AZERTY");
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

        ArrayList<String> ListCmdBSU = new ArrayList();
        ArrayList ListBSU = new ArrayList<BSUattribute>();
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
            StringReader sr = new StringReader(s); // wrap your String
            BufferedReader buff = new BufferedReader(sr); // wrap your StringReader
            String sCurrentLine;
            Protocol pr = NONE;
            while ((sCurrentLine = buff.readLine()) != null) {
                Pattern p = Pattern.compile("ip:$");
                Matcher m = p.matcher(sCurrentLine);

                Pattern p2 = Pattern.compile("sctp:$");
                Matcher m2 = p2.matcher(sCurrentLine);

                Pattern p3 = Pattern.compile("icmp:$");
                Matcher m3 = p3.matcher(sCurrentLine);

                Pattern p4 = Pattern.compile("ip6:$");
                Matcher m4 = p4.matcher(sCurrentLine);

                Pattern p6 = Pattern.compile("^arp:$");
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

                Pattern p5 = Pattern.compile("COMMAND EXECUTED");
                Matcher m5 = p5.matcher(sCurrentLine);

                if (m.find()) {
                    pr = Protocol.IP;
                } else if (m2.find()) {
                    pr = Protocol.SCTP;
                } else if (m3.find()) {

                    pr = Protocol.ICMP;

                } else if (m4.find()) {

                    pr = Protocol.IP6;
                } else if (pr == Protocol.SCTP) {
                    calcSCTP.CalcPackets(sCurrentLine);
                } else if (m6.find()) {
                    pr = Protocol.ARP;

                } else if (pr == Protocol.IP) {
                    calcIP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.ARP) {
                    calcARP.CalcPackets(sCurrentLine);
                }
                ////
                if (m7.find()) {
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
                } else if (pr == Protocol.UDP) {
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
                ////
                if (m5.find()) {
                    //FOR SCTP
                    BSUattribute ModuleBsu = new BSUattribute();
                    ModuleBsu.setPacketReceived(calcSCTP.received);
                    System.out.println("total SCTP received by BSU  " + ModuleBsu.getPacketReceived());
                    ModuleBsu.setPacketSent(calcSCTP.sent);
                    System.out.println("total SCTP sent from BSU " + ModuleBsu.getPacketSent());
                    ListBSU.add(ModuleBsu);
                    //FOR ARP
                    BSUattribute ModuleBsu2 = new BSUattribute();
                    ModuleBsu2.setPacketReceived(calcARP.received);
                    System.out.println("total ARP received by BSU " + ModuleBsu2.getPacketReceived());
                    ModuleBsu2.setPacketSent(calcARP.sent);
                    System.out.println("total ARP sent from BSU " + ModuleBsu2.getPacketSent());
                    ListBSU.add(ModuleBsu2);
                    //FOR IP
                    BSUattribute ModuleBsu1 = new BSUattribute();
                    ModuleBsu1.setPacketReceived(calcIP.received);
                    System.out.println("total IP received by BSU  " + ModuleBsu1.getPacketReceived());
                    ModuleBsu1.setPacketSent(calcIP.sent);
                    System.out.println("total IP sent from BSU " + ModuleBsu1.getPacketSent());
                    ListBSU.add(ModuleBsu1);

                    //FOR TCP
                    BSUattribute ModuleBsu3 = new BSUattribute();
                    ModuleBsu3.setPacketReceived(calcTCP.received);
                    System.out.println("total TCP received for BSU " + ModuleBsu3.getPacketReceived());
                    ModuleBsu3.setPacketSent(calcTCP.sent);
                    System.out.println("total TCP sent for SIGU " + ModuleBsu3.getPacketSent());
                    ListBSU.add(ModuleBsu3);

                    // FOR IGMP
                    BSUattribute ModuleBsu4 = new BSUattribute();
                    ModuleBsu4.setPacketReceived(calcIGMP.received);
                    System.out.println("total IGMP received for SIGU " + ModuleBsu4.getPacketReceived());
                    ModuleBsu4.setPacketSent(calcIGMP.sent);
                    System.out.println("total IGMP sent for SIGU " + ModuleBsu4.getPacketSent());
                    ListBSU.add(ModuleBsu4);

                    //FOR ICMP
                    BSUattribute ModuleBsu5 = new BSUattribute();
                    ModuleBsu5.setPacketReceived(calcICMP.received);
                    System.out.println("total ICMP received for SIGU " + ModuleBsu5.getPacketReceived());
                    ModuleBsu5.setPacketSent(calcICMP.sent);
                    System.out.println("total ICMP sent for SIGU " + ModuleBsu5.getPacketSent());
                    ListBSU.add(ModuleBsu5);

                    //FOR IP6
                    BSUattribute ModuleBsu6 = new BSUattribute();
                    ModuleBsu6.setPacketReceived(calcIP6.received);
                    System.out.println("total IP6 received for SIGU " + ModuleBsu6.getPacketReceived());
                    ModuleBsu6.setPacketSent(calcIP6.sent);
                    System.out.println("total IP6 sent for SIGU " + ModuleBsu6.getPacketSent());
                    ListBSU.add(ModuleBsu6);

                    //FOR UDP
                    BSUattribute ModuleBsu7 = new BSUattribute();
                    ModuleBsu7.setPacketReceived(calcUDP.received);
                    System.out.println("total UDP received for SIGU " + ModuleBsu7.getPacketReceived());
                    ModuleBsu7.setPacketSent(calcUDP.sent);
                    System.out.println("total UDP sent for SIGU " + ModuleBsu7.getPacketSent());
                    ListBSU.add(ModuleBsu7);

                    //ICMP6
                    BSUattribute ModuleBsu8 = new BSUattribute();
                    ModuleBsu8.setPacketReceived(calcICMP6.received);
                    System.out.println("total ICMP6 received for SIGU " + ModuleBsu8.getPacketReceived());
                    ModuleBsu8.setPacketSent(calcICMP6.sent);
                    System.out.println("total ICMP6 sent for SIGU " + ModuleBsu8.getPacketSent());
                    ListBSU.add(ModuleBsu8);

                    //UDP6
                    BSUattribute ModuleBsu9 = new BSUattribute();
                    ModuleBsu9.setPacketReceived(calcUDP6.received);
                    System.out.println("total UDP6 received for SIGU " + ModuleBsu9.getPacketReceived());
                    ModuleBsu9.setPacketSent(calcUDP6.sent);
                    System.out.println("total UDP6 sent for SIGU " + ModuleBsu9.getPacketSent());
                    ListBSU.add(ModuleBsu9);

                    //EMB
                    BSUattribute ModuleBsu10 = new BSUattribute();
                    ModuleBsu10.setPacketReceived(calcEMB.received);
                    System.out.println("total EMB received for SIGU " + ModuleBsu10.getPacketReceived());
                    ModuleBsu10.setPacketSent(calcEMB.sent);
                    System.out.println("total EMB sent for SIGU " + ModuleBsu10.getPacketSent());
                    ListBSU.add(ModuleBsu10);

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

                }
            }
        }
        return ListCmdBSU;

    }
}
