
const GetCustomer = ({newCustomer}) =>{
  const id=newCustomer.id;
  const firstName=newCustomer.firstName;
  const lastName=newCustomer.lastName;
  const userName=newCustomer.userName;
  const password=newCustomer.password;
  const email=newCustomer.email;
  const country=newCustomer.country;
  const city=newCustomer.city;
  const street=newCustomer.street;
  const number=newCustomer.number;
  const phone=newCustomer.phone
  return(
     
    <div className="container">
      <p className="text-left">Id: {id}</p>
      <p className="text-left">First Name: {firstName}</p>
      <p className="text-left">Last Name: {lastName}</p>
      <p className="text-left">Username: {userName}</p>
      <p className="text-left">Password: {password}</p>
      <p className="text-left">Email: {email}</p>
      <p className="text-left">Country: {country}</p>
      <p className="text-left">City: {city}</p>
      <p className="text-left">Street: {street}</p>
      <p className="text-left">Number: {number}</p>
      <p className="text-left">Phone: {phone}</p>
    </div>
      
  )
}
export default GetCustomer;