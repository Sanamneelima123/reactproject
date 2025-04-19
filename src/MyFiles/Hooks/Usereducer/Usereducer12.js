import React, { useEffect, useReducer, useState } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import { Link } from 'react-router-dom';

const Usereducer12 = () =>{

    const URL='https://jsonplaceholder.typicode.com/users';

    const reducer = (state, action) =>{

        if(action.type === "FETCH_API"){
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
        if(action.type === "ONCLICK_EDIT"){
            return{
                ...state,
                isEdit: action.payLoad
            }
        }
        if(action.type === "DELETE_USER"){
            const delteItem = state.userData.filter((eachUser)=>{
                return eachUser.id !== action.payLoad
            })
            return{
                ...state,
                userData:delteItem
            }
        }
        if(action.type === "UPDATE_DATA"){
            const Todos = state.userData.map((eachUser)=>{
                if(eachUser.id === action.payLoad.id){
                    return{
                        id:action.payLoad.id,
                        name:action.payLoad.name,
                        email:action.payLoad.email,
                        website:action.payLoad.website
                    }
                }else{
                    return eachUser;
                }
            })
            return{
                ...state,
                userData:Todos
            }
        }

        return state;
    }

    const initinalState ={
        userData:[],
        isLoading:false,
        isError:{status:false, msg:''},
        isEdit:{status:false, id:'', name:'', email:'', website:''}
    }

    const fetchApi = async (apiUrl)=>{
         dispatch({type:'LOADING', payLoad:true});
        try {
           const response = await fetch(apiUrl); 
           const data = await response.json();
           dispatch({type:"FETCH_API", payLoad:data});
           dispatch({type:'LOADING', payLoad:false});
        } catch (error) {
            console.log(error);
        }
    }

 const [state, dispatch] = useReducer(reducer, initinalState);

 const updateData = (id, name, email, website) =>{
    dispatch({type:"UPDATE_DATA", payLoad:{id:id, name:name, email:email, website:website}});
    dispatch({type:'ONCLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
 }

 const handleDelete = (id) =>{
    dispatch({type:"DELETE_USER", payLoad:id})
 } 

 useEffect(()=>{
   fetchApi(URL);
 },[])

    return(
        <div>
            <Header/>
            <div className='container'>

                {state.isEdit.status && <EditForm id={state.isEdit.id} comingName={state.isEdit.name} comingEmail={state.isEdit.email} comingWebsite={state.isEdit.website} updateData={updateData} />}

                {state.isLoading && <h3 className='text-center mt-5'>Loading...</h3>}

                <div className='row mt-5'>
                    {state.userData.map((eachUser)=>{
                        const {id, name, email, website} = eachUser;
                        return(
                            <div key={id} className='col-4 col-xs-12'>
                                <div className='shadow p-3 mb-3'>
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                        <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className='btn btn-info rounded-0' onClick={()=> dispatch({type:'ONCLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                        {/* Add button to navigate to details page */}
                                        <Link to={`/Usereducer12/${eachUser.id}`} className='btn btn-primary rounded-0'>Details</Link>
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
  const [website, setWebsite] = useState(comingWebsite || '')

    return(
        <div className='shadow p-3 mt-4 mb-4'>
            <h4>Update User Data</h4>
            <form>
               <input type='text' className='form-control mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
               <input type='email' className='form-control mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
               <input type='text' className='form-control mb-2' id='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
               <input type='submit' className='btn btn-primary mb-2' onClick={()=> updateData(id, name, email, website)} />
            </form>
        </div>
    )
}

export default Usereducer12;