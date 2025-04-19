import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"
import { Link, useNavigate } from "react-router-dom";


const Usereducer24 = () =>{

    const navigate = useNavigate();

    const reducer = (state, action) =>{

        if(action.type === "FETCH-API"){
            return{
                ...state,
                myData:action.payLoad
            }
        }

        if(action.payLoad === "LOADING"){
            return{
                ...state,
                isLoading:action.payLoad
            }
        }

        if(action.type === "DELETE"){
            const deleteData = state.myData.filter((eachData)=>{
                return eachData.id !== action.payLoad
            })
            return{
                ...state,
                myData:deleteData
            }
        }

        if(action.type === "ONCLICK_EDIT"){
            return{
                ...state,
                isEditing:action.payLoad
            }
        }

        if(action.type === "UPDATE_DATA"){
            const Todos = state.myData.map((eachData)=>{
                if(eachData.id === action.payLoad.id){
                    return{
                        id:action.payLoad.id,
                        name:action.payLoad.name,
                        email:action.payLoad.email,
                        website:action.payLoad.website
                    }
                }else{
                    return eachData
                }
            })
            return{
                ...state,
                myData:Todos
            }
        }

        return state;
    }

    const initinalState = {
        myData:[],
        isError:false,
        isLoading:false,
        isEditing:{status:false, id:'', name:'', email:'', website:''}
       }

    const fatchApi = async (apiUrl) =>{
        dispatch({type:'LOADING', payLoad:true});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            dispatch({type:'FETCH-API', payLoad:data});
            dispatch({type:'LOADING', payLoad:false});
        } catch (error) {
            console.log(error);
            dispatch({type:'LOADING', payLoad:false});
        }
    }

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
                throw new Error(data.message || 'Failed the Data Delete')
            }
            dispatch({type:'DELETE', payLoad:id})
        } catch (error) {
            console.log('Error Message Delete', error)
        }
    }

    const updateData = (id, name, email, website) =>{
       dispatch({type:'UPDATE_DATA', payLoad:{id:id, name:name, email:email, website:website}});
       dispatch({type:'ONCLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
    }

    useEffect(()=>{
        fatchApi('https://jsonplaceholder.typicode.com/users')
    },[])

    const [state, dispatch] = useReducer(reducer, initinalState)

    return(
        <div>
            <Header/>
              <div className="container">
                <h3 className="mt-4 mb-3">Usereducer24 Component</h3>

                {state.isLoading && <p className="text-center mt-5"><img src={Loader} alt={Loader} /></p>}

                {state.isEditing.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />}

                <div className="row">
                    {state.myData.map((eachData)=>{
                        const {id, name, email, website} = eachData;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-info rounded-0" onClick={()=> dispatch({type:'ONCLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                        <Link className="btn btn-primary rounded-0" to={`/Usereducer24/${eachData.id}`}>Details</Link>
                                        <button className="btn btn-success rounded-0" onClick={()=> navigate(`/Userpost24`)}>Post</button>
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

 const DataUpdate = () =>{
    if(!name || !email || !website){
        alert('All input fileds or Required');

        return;
    }
    updateData(id, name, email, website)
 }

    return(
        <div>
            <div className="shadow p-3 mb-3 mt-4">
                <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type="submit" className="btn btn-primary mb-2" onClick={DataUpdate} />
            </div>
        </div>
    )
}

export default Usereducer24;