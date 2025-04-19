import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usereducer22 = () =>{

 const reducer = (state, action) =>{

    if(action.type === "FETCH-API"){
        return{
            ...state,
            myVendor:action.payLoad
        }
    }

    if(action.type === "DELETE"){
        const deleteVendor = state.myVendor.filter((eachVendor)=>{
            return eachVendor.id !== action.payLoad
        })
        return{
            ...state,
            myVendor:deleteVendor
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

    if(action.type === "UPDATE_DATA"){
        const Todos = state.myVendor.map((eachVendor)=>{
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
            myVendor:Todos
        }
    }

    return state;
 }

 const initinalState ={
    myVendor :[],
    isLoading:false,
    isEditing:{status:false, id:'', name:'', email:'', website:''}
 }

  const fecthApi = async (apiUrl) =>{
    dispatch({type:'LOADING', payLoad:true});
    try {
        const responsive = await fetch(apiUrl);
        const data = await responsive.json();
        dispatch({type:'FETCH-API', payLoad:data});
        dispatch({type:'LOADING', payLoad:false});
    } catch (error) {
        console.log('Error Fetch API', error);
        dispatch({type:'LOADING', payLoad:false});
    }
  }

  const handleDelete = async (id) =>{
    try {
        const responsive = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'Application/json'
            },
        });
        if(!responsive.ok){
            const data = await responsive.json();
            throw new Error(data.message || 'Failed Delete Vendor')
        }
        dispatch({type:'DELETE', payLoad:id})
    } catch (error) {
        console.log('Error Vendor Deleting', error)
    }
  }

  const updateData = (id, name, email, website) =>{
     dispatch({type:"UPDATE_DATA", payLoad:{id:id, name:name, email:email, website:website}});
     dispatch({type:"ONCLICK_EDIT", payLoad:({status:false, id:'', name:'', email:'', website:''})})
  }

 useEffect(()=>{
    fecthApi('https://jsonplaceholder.typicode.com/users')
 },[])

 const [state, dispatch] = useReducer(reducer, initinalState)

    return(
        <div>
            <Header/>
                <div className="container">
                    
                    {state.isEditing.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />}

                    {state.isLoading && <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>}

                    <div className="row">
                        {state.myVendor.map((eachVendor)=>{
                            const {id, name, email, website} = eachVendor;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-3">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> dispatch({type:"ONCLICK_EDIT", payLoad:({status:true, id:id, name, email, website})})} >Edit</button>
                                            <Link className="btn btn-success rounded-0" to={`/Usereducer22/${eachVendor.id}`}>Details</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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
        <div>
            <div className="shadow p-3 mt-4 mb-3">
                <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type="submit" className="btn btn-primary mb-2" onClick={handleUpdate} />
            </div>
        </div>
    )
}

export default Usereducer22;