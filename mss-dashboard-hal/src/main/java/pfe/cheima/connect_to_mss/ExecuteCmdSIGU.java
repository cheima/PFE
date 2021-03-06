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
 * @author chaima.khalfa.stg
 */
public class ExecuteCmdSIGU {
    
    public ArrayList<String> CmdSIGU(TelnetClient tc) throws IOException{
        GenerateCmd gc = new GenerateCmd();
        ArrayList<String> ExecCmd = gc.ExecCmd(tc);

        Pattern pa = Pattern.compile("ZQRS: SIGU,[0-9].*::PRO::;");
        ArrayList<String> ListCmdSIGU = new ArrayList();
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
            ListCmdSIGU.addAll(parse(s));
        }
       // System.out.println(ListCmdSIGU.size());
        return ListCmdSIGU;
    }

    public List<String> parse(File s) throws IOException{
        StringBuilder str=new StringBuilder();
        FileReader fr=new FileReader(s);
        char[] buffer=new char[1024];
        int count;
        while((count=fr.read(buffer))>0){
            str.append(buffer,0,count);
        }
        return parse(str.toString());
    }
    
    public List<String> parse(String s) throws IOException{
        ArrayList<String> ListCmdSIGU = new ArrayList();
        ArrayList ListSIGU = new ArrayList<TrafficTotal>();
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
       

        
       
            StringReader sr = new StringReader(s); // wrap your String
            BufferedReader buff = new BufferedReader(sr); // wrap your StringReader
            String sCurrentLine;
            Protocol pr = NONE;
             while ((sCurrentLine = buff.readLine()) != null) {
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
                if (m7.find()) {
                    pr = Protocol.UDP;
                } else if (m8.find()) {
                    pr = Protocol.TCP;
                } else if (m9.find()) {
                    pr = Protocol.IGMP;

                } else if (m10.find()) {
                    pr = Protocol.ICMP6;
                } else if(m11.find()){
                    pr = Protocol.UDP6;
                } else if(m12.find()){
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
                } else if(m5.find()){
                    pr = Protocol.ARP;
                }
                ////
                else if (pr == Protocol.SCTP) {
                    calcSCTP.CalcPackets(sCurrentLine);
                } else if (pr == Protocol.IP) {
                    calcIP.CalcPackets(sCurrentLine);
                } else if(pr == Protocol.ARP){
                    calcARP.CalcPackets(sCurrentLine);
                } ////
                else if(pr == Protocol.UDP){
                    calcUDP.CalcPackets(sCurrentLine);
                }else if(pr == Protocol.TCP){
                    calcTCP.CalcPackets(sCurrentLine);
                }else if(pr == Protocol.IGMP){
                    calcIGMP.CalcPackets(sCurrentLine);
                }else if(pr == Protocol.ICMP6){
                    calcICMP6.CalcPackets(sCurrentLine);
                } else if(pr == Protocol.UDP6){
                    calcUDP6.CalcPackets(sCurrentLine);
                }else if(pr == Protocol.EMB){
                    calcEMB.CalcPackets(sCurrentLine);
                } else if(pr == Protocol.IP6){
                    calcIP6.CalcPackets(sCurrentLine);
                }else if(pr == Protocol.ICMP){
                    calcICMP.CalcPackets(sCurrentLine);
                } 
                 /////   
                    
                    
              /*  if (m6.find()) {
                    //FOR SCTP
                    TrafficTotal ModuleSigu = new TrafficTotal();
                    ModuleSigu.setPacketreceived(calcSCTP.received);
                    System.out.println( "total SCTP received for SIGU "+ModuleSigu.getPacketreceived());
                    ModuleSigu.setPacketsent(calcSCTP.sent);
                    System.out.println( "total SCTP sent for SIGU "+ModuleSigu.getPacketsent());
                    ListSIGU.add(ModuleSigu);
                    
                    //FOR IP
                    TrafficTotal ModuleSigu1 = new TrafficTotal();
                    ModuleSigu1.setPacketreceived(calcIP.received);
                    System.out.println( "total IP received for SIGU "+ModuleSigu1.getPacketreceived());
                    ModuleSigu1.setPacketsent(calcIP.sent);
                    System.out.println( "total IP sent for SIGU "+ModuleSigu1.getPacketsent());
                    ListSIGU.add(ModuleSigu1);
                    
                    //FOR ARP
                    TrafficTotal ModuleSigu2 = new TrafficTotal();
                    ModuleSigu2.setPacketreceived(calcARP.received);
                    System.out.println( "total ARP received for SIGU "+ModuleSigu2.getPacketreceived());
                    ModuleSigu2.setPacketsent(calcARP.sent);
                    System.out.println( "total ARP sent for SIGU "+ModuleSigu2.getPacketsent());
                    ListSIGU.add(ModuleSigu2);
                    
                    //FOR TCP
                    TrafficTotal ModuleSigu3 = new TrafficTotal();
                    ModuleSigu3.setPacketreceived(calcTCP.received);
                    System.out.println( "total TCP received for SIGU "+ModuleSigu3.getPacketreceived());
                    ModuleSigu2.setPacketsent(calcTCP.sent);
                    System.out.println( "total TCP sent for SIGU "+ModuleSigu3.getPacketsent());
                    ListSIGU.add(ModuleSigu3);
                    
                    // FOR IGMP
                    TrafficTotal ModuleSigu4 = new TrafficTotal();
                    ModuleSigu4.setPacketreceived(calcIGMP.received);
                    System.out.println( "total IGMP received for SIGU "+ModuleSigu4.getPacketreceived());
                    ModuleSigu4.setPacketsent(calcIGMP.sent);
                    System.out.println( "total IGMP sent for SIGU "+ModuleSigu4.getPacketsent());
                    ListSIGU.add(ModuleSigu4);
                    
                    //FOR ICMP
                    TrafficTotal ModuleSigu5 = new TrafficTotal();
                    ModuleSigu5.setPacketreceived(calcICMP.received);
                    System.out.println( "total ICMP received for SIGU "+ModuleSigu5.getPacketreceived());
                    ModuleSigu5.setPacketsent(calcICMP.sent);
                    System.out.println( "total ICMP sent for SIGU "+ModuleSigu5.getPacketsent());
                    ListSIGU.add(ModuleSigu5);
                    
                    //FOR IP6
                    TrafficTotal ModuleSigu6 = new TrafficTotal();
                    ModuleSigu6.setPacketreceived(calcIP6.received);
                    System.out.println( "total IP6 received for SIGU "+ModuleSigu6.getPacketreceived());
                    ModuleSigu6.setPacketsent(calcIP6.sent);
                    System.out.println( "total IP6 sent for SIGU "+ModuleSigu6.getPacketsent());
                    ListSIGU.add(ModuleSigu6);
                    
                    //FOR UDP
                    TrafficTotal ModuleSigu7 = new TrafficTotal();
                    ModuleSigu7.setPacketreceived(calcUDP.received);
                    System.out.println( "total UDP received for SIGU "+ModuleSigu7.getPacketreceived());
                    ModuleSigu7.setPacketsent(calcUDP.sent);
                    System.out.println( "total UDP sent for SIGU "+ModuleSigu7.getPacketsent());
                    ListSIGU.add(ModuleSigu7);
                    
                    //ICMP6
                    TrafficTotal ModuleSigu8 = new TrafficTotal();
                    ModuleSigu8.setPacketreceived(calcICMP6.received);
                    System.out.println( "total ICMP6 received for SIGU "+ModuleSigu8.getPacketreceived());
                    ModuleSigu8.setPacketsent(calcICMP6.sent);
                    System.out.println( "total ICMP6 sent for SIGU "+ModuleSigu8.getPacketsent());
                    ListSIGU.add(ModuleSigu8);
                    
                    //UDP6
                    TrafficTotal ModuleSigu9 = new TrafficTotal();
                    ModuleSigu9.setPacketreceived(calcUDP6.received);
                    System.out.println( "total UDP6 received for SIGU "+ModuleSigu9.getPacketreceived());
                    ModuleSigu9.setPacketsent(calcUDP6.sent);
                    System.out.println( "total UDP6 sent for SIGU "+ModuleSigu9.getPacketsent());
                    ListSIGU.add(ModuleSigu9);
                    
                    //EMB
                    TrafficTotal ModuleSigu10 = new TrafficTotal();
                    ModuleSigu10.setPacketreceived(calcEMB.received);
                    System.out.println( "total EMB received for SIGU "+ModuleSigu10.getPacketreceived());
                    ModuleSigu10.setPacketsent(calcEMB.sent);
                    System.out.println( "total EMB sent for SIGU "+ModuleSigu10.getPacketsent());
                    ListSIGU.add(ModuleSigu10);
                    
                    pr = Protocol.NONE;
                    //Integer y = 0;
                   // Long x = y.longValue();
                    int j= 0;
                    Long e = (long)j;
                    calcSCTP.received = e;
                    calcSCTP.sent = e;
                    calcIP.received = e;
                    calcIP.sent = e;
                    calcARP.received=e;
                    calcARP.sent=e;                   
                    calcICMP.received = e;
                    calcICMP.sent = e;
                    calcIP6.received = e;
                    calcIP6.sent = e;
                    calcUDP.received=e;
                    calcUDP.sent=e;
                    calcTCP.received = e;
                    calcTCP.sent = e;
                    calcIGMP.received = e;
                    calcIGMP.sent = e;
                    calcICMP6.received=e;
                    calcICMP6.sent=e;
                    calcUDP6.received = e;
                    calcUDP6.sent = e;
                    calcEMB.received = e;
                    calcEMB.sent = e;                                      
                }*/
             }
        
       // System.out.println(ListCmdSIGU.size());
        return ListCmdSIGU;
    }

}
