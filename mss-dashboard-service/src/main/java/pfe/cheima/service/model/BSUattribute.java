/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package pfe.cheima.service.model;

/**
 *
 * @author chaima.khalfa.stg
 */
public class BSUattribute {
    int id;
    int packetSent;
    int packetReceived;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPacketSent() {
        return packetSent;
    }

    public void setPacketSent(int packetSent) {
        this.packetSent = packetSent;
    }

    public int getPacketReceived() {
        return packetReceived;
    }

    public void setPacketReceived(int packetReceived) {
        this.packetReceived = packetReceived;
    }
    
}
