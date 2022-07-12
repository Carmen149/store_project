package com.carmen.magazin_de_bijuterii.constant;

import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public final class JSONReport {
    public static void createJSONReport(List<Item>items, List<Integer> nr, String nameFile) {
        JSONArray itemsList = new JSONArray();
        int i=0;
        for (Item item : items) {
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("Name", item.getName());
            jsonObject.put("Material", item.getMaterial());
            jsonObject.put("Price", item.getPrice());
            jsonObject.put("Type", item.getType().toString());
            jsonObject.put("Number of occurences",nr.get(i++));
            itemsList.add(jsonObject);
            ObjectMapper mapper = new ObjectMapper();
            try {
                Files.write(Path.of(nameFile),
                        mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(mapper.readTree(itemsList.toJSONString())));
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }
}
