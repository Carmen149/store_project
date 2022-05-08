package com.carmen.magazin_de_bijuterii.utils.export;

public class TXTFileExporter implements FileExporter {

    @Override
    public String exportData(Object object,String nameFile) {
        return object.toString();
    }
}