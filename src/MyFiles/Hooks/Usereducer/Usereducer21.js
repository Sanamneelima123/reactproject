import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usereducer21 = () =>{

 const reducer = (state, action) =>{

    if(action.type === "FETCH-API"){
        return{
            ...state,
            vendor:action.payLoad
        }
    }

    if(action.type === "DELETE"){
        const newVendor = state.vendor.filter((eachVendor)=>{
            return eachVendor.id !== action.payLoad
        })
        return{
            ...state,
            vendor:newVendor
        }
    }

    if(action.type === "LOADING"){
        return{
            ...state,
            isLoading:action.payLoad
        }
    }

    if(action.type === "ONCLICK_EDIT"){
        return{
            ...state,
            isEditing:action.payLoad
        }
    }

    if(action.type === "UPDATE_VENDOR"){
        const newVendor = state.vendor.map((eachVendor)=>{
            if(eachVendor.id === action.payLoad.id){
                return{
                    id:action.payLoad.id,
                    name:action.payLoad.name,
                    email:action.payLoad.email,
                    website:action.payLoad.website
                }
            }else{
                return eachVendor
            }
        })
        return{
            ...state,
            vendor:newVendor
        }
        
    }

    return state;
 }

 const initinalState = {
    vendor:[],
    isLoading:false,
    isEditing:{status:false, id:'', name:'', email:'', website:''}
 }

 const fetchApi = async (apiUrl) =>{
    dispatch({type:'LOADING', payLoad:true});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch({type:'FETCH-API', payLoad:data});
        dispatch({type:'LOADING', payLoad:false});
    } catch (error) {
        console.log('Error Message', error);
        dispatch({type:'LOADING', payLoad:false});
    }
 }

 const [state, dispatch] = useReducer(reducer, initinalState);

 const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            },
        });
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed Vendor Delete')
        }
        dispatch({type:'DELETE', payLoad:id});
    } catch (error) {
        console.log('Error Message', error)
    }
 }

 const updateData = async (id, name, email, website) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({id, name, email, website})
        })
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'Failed Vendor Update')
        }
        dispatch({type:'UPDATE_VENDOR', payLoad:{id:id, name:name, email:email, website:website}});
        dispatch({type:'ONCLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
    } catch (error) {
        console.log('Error Vendor Update Failed', error)
    }
 }

 useEffect(()=>{
   fetchApi('https://jsonplaceholder.typicode.com/users')
 },[])

    return(
        <div>
            <Header/>
               <div className="container">

                  {state.isLoading && <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>}

                  {state.isEditing.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />}

                  <div className="row mt-4">
                    {
                        state.vendor.map((eachVendor)=>{
                            const {id, name, email, website} = eachVendor;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-2">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> dispatch({type:'ONCLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                            <Link className="btn btn-primary rounded-0" to={`/Usereducer21/${eachVendor.id}`}>Details</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                  </div>

               </div>
            <Footer/>
        </div>
    )
}

const EditForm = ({id, comingName, comingEmail, comingWebsite, updateData}) =>{

 const [name, setName] = useState(comingName || '');
 const [email, setEmail] = useState(comingEmail || '');
 const [website, setWebsite] = useState(comingWebsite || '');

 const handleUpdate = () =>{
    if(!name || !email || !website){
        alert('All input fields or required');

        return;
    }
    updateData(id, name, email, website)
 }

    return(
        <div className="shadow p-3 mt-4 mb-3">
            <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
            <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
            <input type="submit" className="btn btn-primary mb-2"  onClick={handleUpdate} />
        </div>
    )
}

export default Usereducer21;