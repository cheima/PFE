/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import pfe.cheima.trafficin.Protocol;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Cheima
 */
public class Calculator {

  
    public int received;
    public int sent;

    public int getSent() {
        return sent;
    }

    public void setSent(int sent) {
        this.sent = sent;
    }
 
 public int getReceived() {
        return received;
    }

    public void setReceived(int received) {
        this.received = received;
    }

    //calc packet received
    public void CalcPackets(String CurrentLine) {
        int ind1;
        Pattern p = Pattern.compile("(\\s{1,16})([0-9]+).*[^:;]$");
        Matcher m = p.matcher(CurrentLine);
        if (m.find() && 8 >= m.group(1).length()) {
                 if (m.group().contains("received")) {
                ind1 = Integer.parseInt(m.group(2));
                received += ind1;

            }
        }

    }

    //calc packet sent
    public void CalcPacketsSent(String CurrentLine) {
        int ind1;
        Pattern p = Pattern.compile("(\\s{1,16})([0-9]+).*[^:;]$");
        Matcher m = p.matcher(CurrentLine);
        if (m.find() && 8 >= m.group(1).length()) {
                 if (m.group().contains("sent")) {
                ind1 = Integer.parseInt(m.group(2));
                sent += ind1;
                
            }
        }
    }

}
