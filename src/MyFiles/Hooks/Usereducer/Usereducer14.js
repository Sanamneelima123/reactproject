import React, { useEffect, useReducer, useState } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Loader from '../../../images/Loading-img.gif'
import { Link } from 'react-router-dom';

const Usereducer14 = () =>{

    const URL='https://jsonplaceholder.typicode.com/users';

    const reducer = (state, action) =>{

        if(action.type === "FTECH_API"){
            return{
                ...state,
                userData:action.payLoad
            }
        }
        if(action.type === "LOADING"){
            return{
                ...state,
                isLoading:action.payLoad
            }
        }
        if(action.type === "Error"){
            return{
                ...state,
                isError:action.payLoad
            }
        }
        if(action.type === "DELETE"){
            const deleteUser = state.userData.filter((eachData)=>{
                return eachData.id !== action.payLoad
            })
            return{
                ...state,
                userData:deleteUser
            }
        }
        if(action.type === "ONCLICK_EDIT"){
            return{
                ...state,
                isEdit:action.payLoad
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
                    return eachData
                }
            })
            return{
                ...state,
                userData:Todos
            }
        }

        return state;
    }

    const fetchApi = async (apiUrl)=>{
          dispatch({type:"LOADING", payLoad:true});
          dispatch({type:"Error", payLoad:false});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            dispatch({type:'FTECH_API', payLoad:data});
            dispatch({type:"LOADING", payLoad:false});
            dispatch({type:"Error", payLoad:false});
        } catch (error) {
            console.log(error);
            dispatch({type:"LOADING", payLoad:false});
            dispatch({type:"Error", payLoad:true});
        }
    }

    const initinalState={
        userData:[],
        isLoading:false,
        isError:{status:false, msg:''},
        isEdit:{status:false, id:'', name:'', email:'', website:''}
    }

    const [state, dispatch] = useReducer(reducer, initinalState);

    const handleDelete = (id) =>{
        dispatch({type:"DELETE", payLoad:id})
    }

    const updateData = (id, name, email, website) =>{
        dispatch({type:"UPDATE_DATA", payLoad:{id:id, name:name, email:email, website:website}});
        dispatch({type:"ONCLICK_EDIT", payLoad:({status:false, id:'', name:'', email:'', website:''})})
    }

    useEffect(()=>{
       fetchApi(URL);
    },[])


    return(
        <div>
            <Header/>
                 <div className='container'>
                    <h3 className='mt-3 mb-3'>Usereducer14 Components</h3>
                    
                    {state.isEdit?.status && <EditForm id={state.isEdit.id} comingName={state.isEdit.name} comingEmail={state.isEdit.email} comingWebsite={state.isEdit.website} updateData={updateData} />}

                    {state.isLoading && <h3 className='text-center mt-5'><img src={Loader} alt={Loader} /></h3>}

                    <div className='row'>
                        {state.userData.map((eachData)=>{
                            const {id, name, email, website} = eachData;
                            return(
                                <div key={id} className='col-4 col-xs-12'>
                                    <div className='shadow p-3 mb-3'>
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                            <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className='btn btn-info rounded-0' onClick={()=> dispatch({type:"ONCLICK_EDIT", payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                            <Link className='btn btn-primary rounded-0' to={`/Usereducer14/${eachData.id}`}>Details</Link>
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

    return(
        <div className='shadow p-3 mt-3 mb-3'>
            <form>
                <input type='text' className='form-control mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
                <input type='email' className='form-control mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type='text' className='form-control mb-2' id='address' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type='submit' className='btn btn-primary mb-2' onClick={()=> updateData(id, name, email, website)} />
            </form>
        </div>
    )
}

export default Usereducer14;