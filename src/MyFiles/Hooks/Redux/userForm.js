import React from "react";
import { useSelector } from "react-redux";

const UserForm = () => {

    const getUser = useSelector((state)=> state.newUser.users)

    return(
        <div>
               <div className="container">
                   <h3 className="">User Form</h3>
                   <div className="row" style={{border: '1px solid black'}}>
                     {getUser.map((eachUser, index) =>
                         <ul key={index}>
                            <li>{eachUser}</li>
                         </ul>
                         )}
                   </div>
               </div>
        </div>
    )
}

export default UserForm;