package pfe.cheima.connect_to_mss;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import org.apache.commons.net.telnet.TelnetClient;

public class TelnetUtils_1 {

     private TelnetClient telnet = new TelnetClient();
    private InputStream in;
    private PrintStream out;
   // private static TelnetClient telnet = null;

    public String testConnexion(String server, String username, String password) throws IOException {

        //try {
           /* String connexion_closed = "";
            connexion_closed = readUntilConnexion("Connection closed");
            if (connexion_closed.endsWith("closed")) {
                telnet = null;
            }*/
           // if (telnet == null) {
               // telnet = new TelnetClient();
        
                telnet.setConnectTimeout(50000);
                telnet.setDefaultTimeout(20000);
                telnet.connect(server, 23);//23
                //telnet.connect("news.thundernews.com", 119);//23
                telnet.setSoTimeout(20000);
                in = telnet.getInputStream();
                out = new PrintStream(telnet.getOutputStream());
                String server_message = "";
                server_message = readUntilConnexion("ENTER USERNAME");
                if (!server_message.endsWith("USERNAME")) {
                    return server_message;
                }
                write(username);
                server_message = readUntilConnexion("ENTER PASSWORD");
                if (!server_message.endsWith("PASSWORD")) {
                    return server_message;
                }
                write(password);
                server_message = readUntilConnexion("MAIN LEVEL COMMAND <___>");
                if (!server_message.endsWith("MAIN LEVEL COMMAND <___>")) {
                    return server_message;
                }
                // return "";
          //  }
            return "";

        /*} catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }*/
    }

    public String readUntil(String pattern) throws IOException {
        StringBuffer sb = new StringBuffer();
            char lastChar = pattern.charAt(pattern.length() - 1);
            char ch = (char) in.read();
            while (true) {

                sb.append(ch);
                if (ch == lastChar) {
                    if (sb.toString().endsWith(pattern)) {
                        return sb.toString();
                    }
                }
                ch = (char) in.read();
            }
        //return sb.toString();
    }

    public String readUntilConnexion(String pattern) throws IOException {
        StringBuffer sb = new StringBuffer();
        //try {
            int j = 0;
            char lastChar = pattern.charAt(pattern.length() - 1);
            char ch = (char) in.read();
            Calendar cal = new GregorianCalendar();
            long date = cal.getTimeInMillis();
            while (true) {
                Calendar cal2 = new GregorianCalendar();
                long date2 = cal2.getTimeInMillis();
                if(date2>(date+1000*20)) // si ça reste plus de 30 sec dans la boucle while true
                    throw new IOException("La boucle while de readUntilConnexion reste plus de 30 sec");
                        
                if (ch == '/') {
                    j++;
                }
                if (j == 2) {
                    break;
                }
                sb.append(ch);
                if (ch == lastChar) {
                    if (sb.toString().endsWith(pattern)) {
                        return sb.toString();
                    }
                }
                ch = (char) in.read();
            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        return sb.toString();
    }

    public void write(String value) {
        try {
            out.println(value);
            out.flush();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void writeY(String value) {
        try {
            out.println(value);
            out.flush();
            out.println("Y");
            out.flush();
            //System.out.println(value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String sendCommand(String command) {
        try {
            write(command);
            return readUntil("COMMAND EXECUTED");

        } catch (Exception e) {

            e.printStackTrace();

        }
        return null;

    }

    public String sendCommandY(String command) {
        try {
            writeY(command);
            return readUntil("COMMAND EXECUTED");

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void disconnect() {
        try {
            telnet.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
