
import Cart from "../Cart"
import {useEffect, useState} from 'react';
import Ring from "./Ring";

function RingFunctions(itemListos){
    // const [items,setItems] =useState([]);
       

    // useEffect ( () => {
    //     setItems(
    //         [...Ring.getItemList()]
    //         )
    // },[]);


   console.log(itemListos.itemListos);
    return <Cart
    
    itemList={itemListos.itemListos}
    
     />
}
export default RingFunctions;