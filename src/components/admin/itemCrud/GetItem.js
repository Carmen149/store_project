const GetNewItem = ({newItem}) =>{
    const idnewItem = newItem.idItem;
    const name=newItem.name;
    const price= newItem.price;
    const description = newItem.description;
    const material  = newItem.material;
    const availability = newItem.availability;
    const size = newItem.size;
    const type = newItem.type;
  return(
     
    <div className="container">
      <p className="text-left">Id: {idnewItem}</p>
      <p className="text-left">Name: {name}</p>
      <p className="text-left">Price: {price}</p>
      <p className="text-left">Description: {description}</p>
      <p className="text-left">Material: {material}</p>
      <p className="text-left">availability: {availability}</p>
      <p className="text-left">Size: {size}</p>
      <p className="text-left">Type: {type}</p>
    </div>
      
  )
}
export default GetNewItem;