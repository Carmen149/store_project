package com.carmen.magazin_de_bijuterii.model.products;

public enum Type {
    BRACELET,
    CHARM,
    EARRINGS,
    NECKLACE,
    RING;
    public static Type parseType(String s){
        if(s.equals("bracelet")){
            return Type.BRACELET;
        }
        if(s.equals("charm")){
            return Type.CHARM;
        }
        if(s.equals("earrings")){
            return Type.EARRINGS;
        }
        if(s.equals("necklace")){
            return Type.NECKLACE;
        }
        if(s.equals("ring")){
            return Type.RING;
        }
        return null;
    }


}

//arhitectura de tip client-server:
//modul al unei aplicatii: un serviciu care se ocupa de o anumita parte a aplicatiei
//intr-o aplicatie putem avea oricate module
//o schimare a unui modul nu ar trebui sa afecteze aplicatia
//arhitectura pe modulue
//arhitectura pe leyere-impartim codul pe mai multe nivele
//service-bussines-ul aplicatiei
//repo-operatii cu baze de date cel mai de jos, acceseaza datele
//controller-api pe care o prezentam aplicatiei client, leaga clientii de server
//fiecare nivel este independent
//un nivel poate accesa date doar din nivelul imediat urmator
//controoler-oricate service
//facade folosim mai multe service-uri
//modelul il follosim ca sa c0municam intre repo(returneaza ce e in baza de date, nu ar trebui sa treaca mai departe, folosim DTO) si service

//Dto comunicare intre service si controller si intre client si server
//dto pentru securitate si eficienta
//dto nu trebuie sa avem nicio logica, doar variabile instanta si getter si setter
//doar datele de care avem nevoie nu datele suplimentare
//builder in loc de constructor
//Controller- comenziile clientului trebuie sa vna de la api prin url(http)
         //-mapare intre url-ul de la client si c evrem sa faca serverul
//rest-controller specializat, mai usor, matching intre ce vine din aplicatia client si ce trebuie sa execute
//controller-
//requestmapping
//get read-only nu are body, interogam baza ded ata doar citim
//post adauga un obiect in baza de date,
//put update,
//put,post change,delete nu prea exista diferenta, au body-crieteriu de diferentiere intre operatii
//requestparam
//pathVariabile - serializata biblioteca (browser) se deserializeaza cand ajunge in backend
//json: un format text, care o anumita structura prin el trimitem datele,

//response enitty obiectul care urmeaza sa fie serialixat, putem sa punem status, mesaj,
//log in post-startul unei sesiuni, vrem sa aiba body
//log in -token, sau boolean true sau false;


