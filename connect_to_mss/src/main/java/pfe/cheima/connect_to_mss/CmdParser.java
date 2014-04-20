/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.connect_to_mss;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author Cheima
 */
public class CmdParser {
    
     public List<String> parse(File s) throws IOException{
         TelnetAPI ta = new TelnetAPI();
        StringBuilder str=new StringBuilder();
        FileReader fr=new FileReader(s);
        char[] buffer=new char[1024];
        int count;
        while((count=fr.read(buffer))>0){
            str.append(buffer,0,count);
        }
       
        return parse(s);
    }
}
