package pfe.cheima.connect_to_mss;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.util.regex.Matcher;
import java.util.regex.Pattern;



/**
 *
 * @author Cheima
 */
public class Calculator {

    public long received;
    public long sent;
    public Protocol pr;

    public Calculator(Protocol pr) {
        this.pr = pr;
    }

    public long getSent() {
        return sent;
    }

    public void setSent(long sent) {
        this.sent = sent;
    }

    public long getReceived() {
        return received;
    }

    public void setReceived(long received) {
        this.received = received;
    }

    //calc packet received
    public void CalcPackets(String CurrentLine) {
        
        long ind1;
        Pattern p = Pattern.compile("(\\s{1,16})([0-9]+).*[^:;]$");
        Matcher m = p.matcher(CurrentLine);
        if (m.find() && 8 >= m.group(1).length()) {
          

            if (m.group().contains("packets sent")) {
                ind1 = Long.parseLong(m.group(2));
                sent += ind1;

            }
              if (m.group().contains("packets received")) {
               // ind1 = Integer.parseInt(m.group(2));
                ind1 =  Long.parseLong(m.group(2));
                received += ind1;
            }

        }
    }

    //calc packet sent
  /*  public void CalcPacketsSent(String CurrentLine) {
     int ind1;
     Pattern p = Pattern.compile("(\\s{1,16})([0-9]+).*[^:;]$");
     Matcher m = p.matcher(CurrentLine);
     if (m.find() && 8 >= m.group(1).length()) {
     if (m.group().contains("sent")) {
     ind1 = Integer.parseInt(m.group(2));
     sent += ind1;
                
     }
     }*/
}
