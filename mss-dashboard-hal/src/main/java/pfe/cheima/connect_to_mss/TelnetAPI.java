/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pfe.cheima.connect_to_mss;

import java.io.IOException;

/**
 *
 * @author Cheima
 */
public interface TelnetAPI {

    public String getAllSiguTraffic(String ip) throws IOException;

    public String getAllBsuTraffic() throws IOException;

    public String getAllCPU() throws IOException;

}