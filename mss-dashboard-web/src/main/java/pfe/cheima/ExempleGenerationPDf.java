/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima;

import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.util.HashMap;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.vpc.upa.UPA;

/**
 *
 * @author Cheima
 */
public class ExempleGenerationPDf {
    public static void generatePDF() throws IOException, JRException {
        //chargement du fichier jrxml
        URL u=ExempleGenerationPDf.class.getResource("/reports/report1.jrxml");
        
        //recuperation de la connection à la base de donnees, la même utilisee par UPA
        //pour ne pas repriser l'url et le login/mot de passe
        //j'ai juste oublié ici le nom du parametre utilisé dans upa "connection" ou "java.sql.Connection", je dois redemarrer linux
        //pour pouvoir te confirmer!
        //j'ai une autre quest pour le derby(je veux qu'il vide la base après une semaine ou une duree bien determiné
        Connection currentConnection=UPA.getPersistenceGroup()
                .getCurrentSession().getParam(UPA.getPersistenceUnit(), Connection.class, "connection", (Connection)null);
        //compilation du rapport (pour pouvoir le remplir avec les donnees de la base)
       JasperReport jasperReport = JasperCompileManager.compileReport(u.openStream());
       //executer le rapport et donc le remplir avec les donnes depuis la connection
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap(),currentConnection);
        // le rapport est pret, il suffit de choisir le format d'affichage, ici pdf!
        JasperExportManager.exportReportToPdfFile(jasperPrint, "c:/file.pdf");
     
        //en fait ireport est juste utilise pour creer le fichier jrmx (xml) pour ne pas l'ecrire à la main
    }
}
