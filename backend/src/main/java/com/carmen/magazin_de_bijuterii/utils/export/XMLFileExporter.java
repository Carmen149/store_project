package com.carmen.magazin_de_bijuterii.utils.export;


import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.File;
import java.io.StringWriter;

public class XMLFileExporter implements FileExporter {

    @Override
    public String exportData(Object object,String nameFile) {
        String xmlContent = null;
        try {
            File file = new File(nameFile);
            JAXBContext jaxbContext = JAXBContext.newInstance(object.getClass());

            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            jaxbMarshaller.marshal(object, file);
            //jaxbMarshaller.marshal(object, System.out);

            StringWriter sw = new StringWriter();

            jaxbMarshaller.marshal(object, sw);

            xmlContent = sw.toString();
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return xmlContent;
    }
}