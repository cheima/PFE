/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 *
 * @author Cheima
 */
public class TelnetAPI_Impl2 implements TelnetAPI{

    public String getAllSiguTraffic() throws IOException {
      BufferedReader br = new BufferedReader(new FileReader("F:\\PFE\\FolderForGit\\mss-dashboard-service\\test.txt"));
     String s = "";
        while (br.ready()) {
            s += "\n" + br.readLine();
        }
        return s;
    }
    
    
}
