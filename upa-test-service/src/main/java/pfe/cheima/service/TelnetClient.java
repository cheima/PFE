package pfe.cheima.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author chaima.khalfa.stg
 */
public class TelnetClient {

    TelnetUtils_1 localtelnetclient = new TelnetUtils_1();
    String connexion = "";

    public void ConnectMSS(String MssAdrIp, String MssLogin, String MssPssword) {

        connexion = localtelnetclient.testConnexion(MssAdrIp, MssLogin, MssPssword);

    }

    public String SendCmdTelnet(String Str) {
        String OutPutCmd = "";
        if (connexion.equals("")) {
            OutPutCmd = localtelnetclient.sendCommand(Str);
        }
        return OutPutCmd;
    }

    public void CloseTelnet() {
        localtelnetclient.disconnect();
    }
////

    public void Protocole() {
        Map mapA = new HashMap();

    }

/////
    public static void main(String[] args) throws IOException, InterruptedException {
       // while (true) {
       /* Module m = new Module();
         ArrayList<String> ExecCmd = m.ExecCmd();
         ExecutionDesCmd ec = new ExecutionDesCmd();
         ArrayList<Long> Commande = ec.Commande(ExecCmd);*/
        //Pattern p = Pattern.compile("ZQRS: BSU,[0-9].*::PRO::;");
        // Pattern p1 = Pattern.compile("ZQRS: SIGU,[0-9].*::PRO::;");
       /* IndicateurBSU ibsu=new IndicateurBSU();
         ArrayList<Long> indBSU = ibsu.indBSU(p);
         for(int i=0;i<indBSU.size();i++)
         System.out.println(indBSU.get(i));   
         System.out.println("le 2eme module SIGU");
         ArrayList<Long> indSIGU = ibsu.indBSU(p1);
         for(int j=0;j<indBSU.size();j++)
         System.out.println(indSIGU.get(j)); */
        // Thread.sleep(300000);
        // tel.extraction();
        //}

       // GenerateCmd gc = new GenerateCmd();
        //ArrayList<String> ExecCmd = gc.ExecCmd();
        // ExecuteCmdBSU cmd= new ExecuteCmdBSU();
        //ArrayList<String> CmdBSU = cmd.CmdBSU();
//        ExecuteCmdSIGU cmd2 = new ExecuteCmdSIGU();
//        ArrayList<String> CmdSIGU = cmd2.CmdSIGU();
//      
//        ExecuteCmdBSU cmd3 = new ExecuteCmdBSU();
//        ArrayList<String> CmdBSU = cmd3.CmdBSU();
         // ExecuteCmdCPU cmd4 = new ExecuteCmdCPU();
        //int ExecuteZDOI = cmd4.ExecuteZDOI();
        // cmd4.Comparaison();
        //  GenerateCmdForCPU cpu=new GenerateCmdForCPU();
        // ArrayList<String> ExecCmdZUSI = cpu.ExecCmdZUSI();
    }
}
