package com.carmen.magazin_de_bijuterii.constant;

import java.io.IOException;

public class FileWriter {
    public void writeInFile(String nameFile,String output) {
        try {
            java.io.FileWriter fw = new java.io.FileWriter(nameFile);
            fw.write(output);
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

