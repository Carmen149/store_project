import React from 'react';

const AuxCart=(itemList,cantityList)=>{
   console.log(itemList.itemList);
   let x =itemList.itemList;
    return(
        <div>
            {x.map((item,i)=>(

                <div key={i}>
                 <p>{item.name} </p> 
                </div>
            ))}    
        </div>
    )
}
export default AuxCart;