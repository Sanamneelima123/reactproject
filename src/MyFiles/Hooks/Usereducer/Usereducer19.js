import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usereducer19 = () =>{

 const reducer = (state, action) =>{

    if(action.type === "FETCH-API"){
        return{
            ...state,
            adminUser:action.payLoad
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

    if(action.type === "DELETE"){
        const deleteAdmin = state.adminUser.filter((eachAdmin)=>{
            return eachAdmin.id !== action.payLoad
        })
        return{
            ...state,
            adminUser:deleteAdmin
        }
    }

    if(action.type === "UPDATE-DATA"){
        const Todos = state.adminUser.map((eachAdmin)=>{
            if(eachAdmin.id === action.payLoad.id){
                return{
                    id:action.payLoad.id,
                    name:action.payLoad.name,
                    email:action.payLoad.email,
                    website:action.payLoad.website
                }
            }else{
                return eachAdmin
            }
        })
        return{
            ...state,
            adminUser:Todos
        }
    }

    return state;
 }

 const initinalState = {
    adminUser:[],
    isLoading:false,
    isError:({status:false, msg:''}),
    isEditing:({status:false, id:'' , name:'', email:'', website:''})
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

 const handleDelete = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json'
            },
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed Admin Delete');
        }
        dispatch({ type: 'DELETE', payLoad: id })
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
            throw new Error('Failed Edit Admin')
        }
    } catch (error) {
        console.log('Error Message', error);
    }

    dispatch({type:'UPDATE-DATA', payLoad:{id, name, email, website}});
    dispatch({type:'ONCLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
}

 useEffect(()=>{
    fetchApi('https://jsonplaceholder.typicode.com/users')
 },[])

    return(
        <div>
            <Header/>
               <div className="container">
                  <h3 className="mt-4 mb-4">Usereducer19 Components</h3>

                  {state.isEditing.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />}

                  {state.isLoading && <h3 className="mt-5 text-center"><img src={Loader} alt={Loader} /></h3>}

                   <div className="row">
                      {
                        state.adminUser.map((eachAdmin)=>{
                            const {id, name, email, website} = eachAdmin;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-3">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> dispatch({type:'ONCLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                            <Link className="btn btn-primary rounded-0" to={`/Usereducer19/${eachAdmin.id}`}>Details</Link>
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

 const [name, setName] = useState('' || comingName);
 const [email, setEmail] = useState('' || comingEmail);
 const [website, setWebsite] = useState('' || comingWebsite);

    return(
        <div className="shadow p-3 mb-3 mt-3">
                <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(id, name, email, website)} />
        </div>
    )
}

export default Usereducer19;