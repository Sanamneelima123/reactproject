import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usereducer10 = () =>{

    const reducer = (state, action) =>{

        if(action.type === "FETCH_API"){
            return{
                userData:(action.payLoad)
            }
        }
        if(action.type === "DELETE_USER"){
           const deleteData = state.userData.filter((eachData)=>{
              return eachData.id !== action.payLoad
           })
           return{
            ...state,
            userData:deleteData
           }
        }

        if(action.type === "ONCLICK_EDIT"){
            return{
                ...state,
                isEditing:action.payLoad
            }
        }
        if(action.type === "Loading"){
            return{
                ...state,
                isLoading:action.payLoad
            }
          }

        if(action.type === "UPDATE_DATA"){
            const Todos = state.userData.map((eachData)=>{
                if(eachData.id === action.payLoad.id){
                    return{
                        id:action.payLoad.id,
                        name:action.payLoad.name,
                        email:action.payLoad.email,
                        website:action.payLoad.website
                    }
                }else{
                    return eachData;
                }
            })
            return{
                ...state,
                userData:Todos
            }
        }

        return state;
    }

    const initialState ={
        userData:[],
        isEditing:{status:false, id:'', name:'', email:'', website:''},
        isLoading:(false)
    }

    const apiFetch = async (URL)=>{
        dispatch({type:'Loading', payLoad:true});
        try {
            const response = await fetch(URL);
            const data = await response.json();
            dispatch({type:'FETCH_API', payLoad:data});
            dispatch({type:'Loading', payLoad:false});
        } catch (error) {
            console.log(error)
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = (id) =>{
        dispatch({type:'DELETE_USER', payLoad:id})
    }

    const uploadData = (id, name, email, website) =>{
        dispatch({type:'UPDATE_DATA', payLoad:{id:id, name, email, website}});
        dispatch({type:'ONCLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
    }

    useEffect(()=>{
        apiFetch('https://jsonplaceholder.typicode.com/users');
    },[])

    return(
        <div>
            <Header/>
                <div className="container">

                        {state.isEditing?.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} uploadData={uploadData} />}

                    {state.isLoading && <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>}
                
                    <div className="row mt-3 mb-5">
                        {
                            state.userData.map((eachData)=>{
                                const {id, name, email, website} = eachData;
                                return(
                                    <div key={id} className="col-4 col-xs-12">
                                        <div className="shadow p-3 mb-3">
                                            <p>{name}</p>
                                            <p>{email}</p>
                                            <p>{website}</p>
                                            <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                            <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className='btn btn-info rounded-0' onClick={()=> dispatch({type:'ONCLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                            <Link className="btn btn-primary rounded-0" to={`/Usereducer10/${id}`}>Details</Link>
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

const EditForm = ({id, comingName, comingEmail, comingWebsite, uploadData}) =>{

 const [name, setName] = useState(comingName || '');
 const [email, setEmail] = useState(comingEmail || '');
 const [website, setWebsite] = useState(comingWebsite || '');

    return(
        <div className="shadow p-3">
            <form>
                <input type="text" className="form-control mb-2" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" id="name" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type="submit" className="btn btn-primary mb-2" onClick={()=> uploadData(id, name, email, website)} />
            </form>
        </div>
    )
}

export default Usereducer10;