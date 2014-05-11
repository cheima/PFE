/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package appboolean;

/**
 *
 * @author Cheima
 */
public class Appboolean {

    
    public static boolean test = true;
    public static void change(){
        test = false;
    }
    public static void main(String[] args) {
        // TODO code application logic here
        change();
        if(test == false)
            System.out.println("false");
        else 
            System.out.println("true");
        
    }
    
}
