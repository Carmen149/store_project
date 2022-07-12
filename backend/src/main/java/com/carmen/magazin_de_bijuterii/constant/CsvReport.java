package com.carmen.magazin_de_bijuterii.constant;

import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import com.opencsv.CSVWriter;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.io.FileWriter;
import java.util.Set;

public final class CsvReport {
    public static void createReportItem(List<String> items,String nameFile) {
        // first create file object for file placed at location
        // specified by filepath
        File file = new File(nameFile);
        try {
            // create FileWriter object with file as parameter
            FileWriter outputfile = new FileWriter(file);
            // create CSVWriter object filewriter object as parameter
            CSVWriter writer = new CSVWriter(outputfile);
            // create a List which contains String array
            List<String[]> data = new ArrayList<String[]>();
            data.add(new  String[] {"Item's name","Number of appearences"});
            String[] aux;
            for(String string:items){
                aux=string.split("/");
                data.add(new String[]{aux[0],aux[1]});
            }
            writer.writeAll(data);
            // closing writer connection
            writer.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void createReportFavList(Set<Item> items, String nameFile) {
        File file = new File(nameFile);
        try {

            FileWriter outputfile = new FileWriter(file);
            CSVWriter writer = new CSVWriter(outputfile);
            List<String[]> data = new ArrayList<String[]>();
            data.add(new  String[] {"Name","Price","Material","Type"});
            for(Item item:items){
                data.add(new String[]{item.getName(),item.getPrice().toString(),item.getMaterial(),item.getType().toString()});
            }
            writer.writeAll(data);
            writer.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void createReportCustomer(List<Customer>customers, List<Double>sum, String nameFile) {
        File file = new File(nameFile);
        try {

            FileWriter outputfile = new FileWriter(file);
            CSVWriter writer = new CSVWriter(outputfile);
            List<String[]> data = new ArrayList<String[]>();
            data.add(new  String[] {"Customer's name","Sum"});
            for(int i=0;i<customers.size();i++){
                data.add(new String[]{customers.get(i).getLastName()+" "+customers.get(i).getFirstName(),sum.get(i).toString()});
            }
            writer.writeAll(data);
            writer.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}
