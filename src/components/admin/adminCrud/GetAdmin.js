import React from "react";

const GetAdmin = ({newAdmin}) =>{
  const id=newAdmin.id;
  const firstName=newAdmin.firstName;
  const lastName=newAdmin.lastName;
  const userName=newAdmin.userName;
  const password=newAdmin.password;
  const email=newAdmin.email;
  return(
     
    <div className="container">
      <p className="text-left">Id: {id}</p>
      <p className="text-left">First Name: {firstName}</p>
      <p className="text-left">Last Name: {lastName}</p>
      <p className="text-left">Username: {userName}</p>
      <p className="text-left">Password: {password}</p>
      <p className="text-left">Email: {email}</p>
  
    </div>
      
  )
}
export default GetAdmin;