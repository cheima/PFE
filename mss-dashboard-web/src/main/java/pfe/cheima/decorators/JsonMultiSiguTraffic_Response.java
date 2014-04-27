/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.decorators;

import java.io.Serializable;
import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import pfe.cheima.service.model.TimePoint;

@XmlRootElement
public class JsonMultiSiguTraffic_Response implements Serializable{
         private static final long serialVersionUID = 1L;

         private List<TimePoint> times;
         private List<JsonSiguTraffic> sigus;

    public List<TimePoint> getTimes() {
        return times;
    }

    public void setTimes(List<TimePoint> times) {
        this.times = times;
    }

    public List<JsonSiguTraffic> getSigus() {
        return sigus;
    }

    public void setSigus(List<JsonSiguTraffic> sigus) {
        this.sigus = sigus;
    }
}
