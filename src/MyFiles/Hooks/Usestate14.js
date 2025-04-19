import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from "../../images/Loading-img.gif"

const Usestate14 = () =>{

 const [List, setList] = useState([]);
 const [editid, setEditId] = useState(null);
 const [name, setName] = useState();
 const [email, setEmail] = useState();
 const [city, setCity] = useState();
 const [Loading, setLoading] = useState(false);
 const [showForm, setShowForm] = useState(false)

 const apiFetch = async (URL)=>{
    setLoading(true);
    try {
        const response = await fetch(URL);
        const data = await response.json();
        // console.log(data);
        setList(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
 }

 const handleDelete = (id) =>{
    const deleteList = List.filter((eachList)=>{
        return eachList.id !== id
    })
    setList(deleteList);
 }

 const handleEdit = (id, name, email, address) =>{
    setEditId(id);
    setName(name);
    setEmail(email);
    setCity(address);
    setShowForm(true)
 }

 const handleUpdate = () =>{
    const updateData = List.map((eachList)=>{
        if(eachList.id === editid){
            return {...List, name:name, email:email, address:{city}}
        }else{
            return eachList;
        }
    })
    setList(updateData);
    setEditId(null);
    setName('');
    setEmail('');
    setCity('')
    setShowForm(false)
 }

 useEffect(()=>{
    apiFetch('https://jsonplaceholder.typicode.com/users');
 },[])

 if(Loading){
    return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
 }

    return(
        <div>
            <Header/>
               <div className="container">

                {showForm && (
                   <div className="shadow p-3 mt-4 mb-4">
                      <h4 className="mb-3">User Data Updating</h4>
                      <input type="text" className="form-control mb-2" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                      <input type="email" className="form-control mb-2" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                      <input type="text" className="form-control mb-2" id="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                      <input type="submit" className="btn btn-primary mb-2" onClick={()=> handleUpdate(editid)} />
                   </div>
                   )}
                   
                   {!Loading &&
                    <div className="row mt-5 mb-5">
                       
                        {
                            List.map((eachList)=>{
                                const {id, name, email, address} = eachList;
                                return(
                                    <div key={id} className="col-4 col-xs-12">
                                        <div className="shadow p-3 mb-3">
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

export default Usestate14;