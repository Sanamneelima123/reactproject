import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"

const Usestate13 = () =>{

 const URL="https://jsonplaceholder.typicode.com/users";

 const [mydata, setMyData] = useState([]);
 const [editid, setEditId] = useState(null);
 const [name, setName] = useState();
 const [email, setEmail] = useState(); 
 const [city, setCity] = useState();
 const [loading, setLoading] = useState(false);
 const [showFormData, setShowFormData] = useState(false)

 const apiFetch = async (apiUrl)=>{
    setLoading(true);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        setMyData(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
 }

 const handleDelete = (id) =>{
    const deleteData = mydata.filter((eachData)=>{
        return eachData.id !== id
    })
         setMyData(deleteData);
 }

 const handleEdit = (id, name, email, address) =>{
     setEditId(id);
     setName(name);
     setEmail(email);
     setCity(address);
     setShowFormData(true)
 }

 const upDate = () => {
    const updateMyData = mydata.map((eachData) => {
        if (eachData.id === editid) {
            return { ...eachData, name: name, email: email, address: { city: city } };
        } else {
            return eachData;
        }
    });
    setMyData(updateMyData);
    setEditId(null);
    setName('');
    setEmail('');
    setCity('');
    setShowFormData(false)
}


useEffect(()=>{
   apiFetch(URL)
},[])

if(loading){
    return <h3 className="text-center"><img src={Loader} alt={Loader} /></h3>
}

    return(
        <div>
            <Header/>
               <div className="container mt-5 mb-5">
                {showFormData && (
                  <div className="shadow p-3 mt-4 mb-4">
                    <h4 className="mb-3">User Updating </h4>
                    <input type="text" className="form-control mb-2" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" id="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                    <input type="submit" className="btn btn-primary mb-2" onClick={()=> upDate(editid)} />
                  </div>
                  )}

                  {!loading &&
                  <div className="row">
                   {
                    mydata.map((eachData)=>{
                        const {id, name, email, address} = eachData;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow bg-primary text-white p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{address.city}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, address.city)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                   }
                   </div>
                   }

               </div>
            <Footer/>
        </div>
    )
}

export default Usestate13;