/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.vpc.upa.upa.api;
import java.sql.Date;
import net.vpc.upa.config.*;
/**
 *
 * @author Cheima
 */
@Entity
public class Customer {
    @Id

    private int customerId;

    private String name;

    private Date birthDate;

 

    public int getCustomerId() {

        return customerId;

    }

 

    public void setCustomerId(int customerId) {

        this.customerId = customerId;

    }

 

    public String getName() {

        return name;

    }

 

    public void setName(String name) {

        this.name = name;

    }

 

    public java.sql.Date getBirthDate() {

        return birthDate;

    }

 

    public void setBirthDate(java.sql.Date birthDate) {

        this.birthDate = birthDate;

    }

 

    @Override

    public String toString() {

        return "Customer{" + "customerId=" + customerId + ", name=" + name + ", birthDate=" + birthDate + '}';

    }
}
