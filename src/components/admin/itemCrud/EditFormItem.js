import React from "react";
import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import axiosInstance from "../../../axios";

const EditFormItem = ({item}) =>{
    const idItem = item.idItem;
    const [name, setName] = useState(item.name);
    const [priceItem, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);
    const [material, setMaterial] = useState(item.material);
    const [availability, setAvailability] = useState(item.availability);
    const [size, setSize] = useState(item.size);
    const [type, setType] = useState(item.type);
    const [error, setError] =useState({});
    const [button, setButton]=useState(false);
  
    const updatedItem = {idItem, name, priceItem, description,material,availability,size,type}
    const handleSubmit = (e) => {
        e.preventDefault();
        if(updatedItem.size==null){
            setSize('-')
        }
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
            console.log("Success");
            }
        )
        .catch(error=>{
            console.log(error)
        })
    }
    const setFieldName=(event)=>{
        const name=event.target.value
        console.log(name)
        setName(name);
        const regex=/^([a-zA-Z]{3,}[ '-]?([a-zA-Z][ -])?)*$/
        if(name.length<3){
            setError({
                ...error,name:"Name is to short. Name should contain at least 3 characters"
            })
            setButton({
                button:true
            })
        }
        else if(name.match(regex)==null){
            setError({
            ...error,name:"Name should contains characters"
           })
           setButton({
            button:true
           })
        }
        else{
            setError({
                ...error,name:""

            })
            setButton({
                button:false
            })
        }
   }
   const setFieldMaterial=(event)=>{
        const material=event.target.value
        if((material.valueOf()=='aur') || (material.valueOf()=='argint') || (material.valueOf()=='aur roz') || (material.valueOf()=='argint placat cu rodiu') || (material.valueOf()=='otel inoxidabil') || (material.valueOf()=='argint placat cu aur roz')){
            setError({
                ...error, material:""

            })
            setButton(false)
        }
        else{
            setError({
                ...error,material:"Material should be aur, argint , aur roz, argint placat cu rodiu, otel inoxidabil, argint placat cu aur roz"
            })
            setButton(true)
        }
   }
    const setFieldType=(event)=>{
        const type=event.target.value
        console.log(type)
        setType(type);
        if((type.valueOf()=='RING') || (type.valueOf()=='BRACELET') || (type.valueOf()=='NECKLACE') || (type.valueOf()=='CHARM') || (type.valueOf()=='EARRINGS')){
            setError({
                ...error,type:""
            })
            setButton(false)
        }
        else{
           
            setError({
                ...error,type:"Type should be RING, BRACELET, NECKLACE, CHARM, EARRING"
            })
            setButton(true)
        }
  }
 
   return (

        <Form onSubmit={handleSubmit}>
            <Form.Group onChange={setFieldName}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name *" name="name" defaultValue={name} required/>
                {error.name && <p style={{color:'red'}}> {error.name}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={(e)=>{setPrice(e.target.value)}}>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number"  step='0.01' placeholder="Price *" name="price"  defaultValue={priceItem} required/>
            </Form.Group>
            <br></br>
            <Form.Group onChange={setDescription}>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text-area" rows={5}  placeholder="Description *" name="description" defaultValue={description} required/>
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldMaterial}>
                <Form.Label>Material</Form.Label>
                <Form.Control type="text" placeholder="Material *" name="material" defaultValue={material} required/>
                {error.material && <p style={{color:'red'}}> {error.material}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setAvailability}>
                <Form.Label>Availability</Form.Label>
                <Form.Control type="boolean" placeholder="Availability *" name="availability" defaultValue={availability} required/>
            </Form.Group>
            <br></br>
            <Form.Group onChange={setSize}>
                <Form.Label>Size</Form.Label>
                <Form.Control type="text" placeholder="Size *" name="size" defaulvalue={size}/>
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldType}>
                <Form.Label>Type</Form.Label>
                <Form.Control type="text" placeholder="Type *" name="type" defaultValue={type} required/>
                {error.type && <p style={{color:'red'}}> {error.type}</p>}
            </Form.Group>
            <br></br>
            <Button variant="success" disabled={button} type="submit" onChange={setButton} >
                Edit item
            </Button>
        </Form>

     )
}

export default EditFormItem;