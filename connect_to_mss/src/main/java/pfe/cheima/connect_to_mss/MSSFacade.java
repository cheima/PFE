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
import static java.util.Date.parse;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 *
 * @author Cheima
 */
public class MSSFacade {

    TelnetClient tc = new TelnetClient();

    public void ConnectMSS(String MssAdrIp, String MssLogin, String MssPssword) {
        //tc.ConnectMSS("10.106.120.4", "STAG01", "AZERTY");
        if (MssAdrIp == null) {
            MssAdrIp = "10.106.120.4";
        }
        if (MssLogin == null) {
            MssLogin = "STAG01";
        }
        if (MssPssword == null) {
            MssPssword = "MssPssword";
        }
        tc.ConnectMSS(MssAdrIp, MssLogin, MssPssword);
    }

    public void ConnectBuffer() {

    }

    public List<String> CmdBSU() throws IOException {
        ExecuteCmdBSU b = new ExecuteCmdBSU();
        return b.CmdBSU(tc);
    }

    public int CmdCPU() throws IOException {
        ExecuteCmdCPU b = new ExecuteCmdCPU();
        return b.ExecuteZDOI(tc);
    }

    public List<String> CmdSIGU() throws IOException {
   // public List<Trafficforsigu> CmdSIGU() throws IOException {
        ExecuteCmdSIGU b = new ExecuteCmdSIGU();
        //NewClasse b = new NewClasse();
         return b.CmdSIGU(tc);
       // return b.Lecture();
    }
            }
