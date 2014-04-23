


import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import java.util.ArrayList;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import pfe.cheima.trafficin.Trafficforsigu;


public class NewClasse {

    public ArrayList<Trafficforsigu> Lecture() throws FileNotFoundException, IOException {
        ArrayList ListSIGU = new ArrayList<Trafficforsigu>();
        Calculator calc = new Calculator();

        BufferedReader br = new BufferedReader(new FileReader("F:\\PFE\\cmdsigu.txt"));

        String sCurrentLine;

        while ((sCurrentLine = br.readLine()) != null) {
            //System.out.println(sCurrentLine);
            calc.CalcPackets(sCurrentLine);
            calc.CalcPacketsSent(sCurrentLine);
            Pattern p5 = Pattern.compile("COMMAND EXECUTED");
            Matcher m5 = p5.matcher(sCurrentLine);
            if (m5.find()) {

                System.out.println("la COMMAND EXECUTED est trouvée");
                Trafficforsigu TrafficSigu = new Trafficforsigu();
                TrafficSigu.setPacketreceived(calc.received);
                TrafficSigu.setPacketsent(calc.sent);
                ListSIGU.add(TrafficSigu);
                calc.received = 0;
                calc.sent=0;
            }

        }
        // for(int g=0;g<ListSIGU.size()<g++)
        System.out.println(ListSIGU.size());
        return ListSIGU;
    }

    /* public static void main(String[] args) {

     NewClasse bre = new NewClasse();
     bre.Lecture();

     }*/
}
