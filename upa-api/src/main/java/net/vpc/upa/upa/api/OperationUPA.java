/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.vpc.upa.upa.api;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;
import javax.persistence.PersistenceUnit;
import net.vpc.upa.UPA;

/**
 *
 * @author Cheima
 */
public class OperationUPA {
    public void saveCustomer(Customer customer) {

    UPA.getPersistenceUnit().insert(customer);

}

public List<Customer> findAllCustomers() {

        net.vpc.upa.PersistenceUnit pu;
        pu = UPA.getPersistenceUnit();

    return pu.createQueryBuilder(Customer.class).getEntityList();

}


public void deleteCustomer(int customerId) {

    UPA.getPersistenceUnit()

    .delete(Customer.class, customerId);

}
public static void main( String[] args ) { 
    OperationUPA up = new OperationUPA();
    Customer c = new Customer();
    Calendar cal = Calendar.getInstance();
    cal.set(1985, 1, 8);
    c.setBirthDate((Date) cal.getTime());
    c.setCustomerId(2);
    c.setName("cheima");
    System.out.println("voici mes coordonneesc "+c.toString());
    up.saveCustomer(c);
}
}
