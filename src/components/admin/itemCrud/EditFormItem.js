import React from "react";
import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import axiosInstance from "../../../axios";

const EditFormItem = ({item}) =>{
    const idItem = item.idItem;
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);
    const [material, setMaterial] = useState(item.material);
    const [availability, setAvailability] = useState(item.availability);
    const [size, setSize] = useState(item.size);
    const [type, setType] = useState(item.type);
    
  

    const updatedItem = {idItem, name, price, description,material,availability,size,type}
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedItem);
        let credentilas={
            idItem:idItem,
            name: updatedItem.name,
            price: updatedItem.price,
            description: updatedItem.description,
            material:updatedItem.material,
            availability: updatedItem.availability,
            size: updatedItem.size,
            type: updatedItem.type
        }
        console.log(credentilas);
        axiosInstance.put("api/items", credentilas)
        .then(
           res => {
                // const val = res.data;
                console.log("Success");
                //localStorage.setItem("USER_ID", res.data.id);
               // history.push("/log-in");
               // window.location.reload();
            }
        )
        .catch(error=>{
            console.log(error)
        })
        // console.log("aici");
        // console.log(id);
        // console.log(updateditem);

       
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    onChange={(e)=> { setName(e.target.value)}}
                   
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="double"
                    placeholder="Price *"
                    name="price"
                    value={price}
                    onChange={(e)=> { setPrice(e.target.value)}}
                    
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text-area"
                    rows={5}
                    placeholder="Description *"
                    name="description"
                    value={description}
                    onChange={(e)=> { setDescription(e.target.value)}}
                />
                
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Material *"
                    name="material"
                    value={material}
                    onChange={(e)=> { setMaterial(e.target.value)}}
                   
                  
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="boolean"
                    placeholder="Availability *"
                    name="availability"
                    value={availability}
                    onChange={(e)=> { setAvailability(e.target.value)}}
                    
                  
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Size *"
                    name="size"
                    value={size}
                    onChange={(e)=> { setSize(e.target.value)}}
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Type *"
                    name="type"
                    value={type}
                    onChange={(e)=> { setType(e.target.value)}}
                />
            </Form.Group>
            <br></br>
            <Button variant="success" type="submit" >
                Edit item
            </Button>
        </Form>

     )
}

export default EditFormItem;