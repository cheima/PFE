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
import pfe.cheima.service.Calculator;
import pfe.cheima.service.Protocol;
import static pfe.cheima.service.Protocol.NONE;
import pfe.cheima.service.model.Trafficforsigu;

/**
 *
 * @author Cheima
 */
public class CmdExecuter {
    
      
        
        
       public List<String> OutputCmdSigu() throws IOException{
             TelnetAPI ta = new TelnetAPI();
           ArrayList<String> ListCmdSigu = ta.ListCmdSigu();
           return ListCmdSigu;
       }
}
