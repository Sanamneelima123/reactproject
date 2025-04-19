import React, { useEffect, useReducer, useState } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Loader from '../../../images/Loading-img.gif'
import { Link } from 'react-router-dom';

const Usereducer13 = () =>{

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
            isEditing:action.payLoad
        }
    }
    if(action.type === "DELETE_U"){
        const deleteUser = state.userData.filter((eachItem)=>{
            return eachItem.id !== action.payLoad
        })
        return{
            ...state,
            userData:deleteUser
        }
    }
    if(action.type === "UPDATE_DATA"){
        const Todos = state.userData.map((eachItem)=>{
            if(eachItem.id === action.payLoad.id){
                return{
                    id:action.payLoad.id,
                    name:action.payLoad.name,
                    email:action.payLoad.email,
                    website:action.payLoad.website
                }
            }else{
                return eachItem;
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
    dispatch({type:'LOADING', payLoad:true});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch({type:'FETCH_API', payLoad:data});
        dispatch({type:'LOADING', payLoad:false});
    } catch (error) {
        console.log(error);
        dispatch({type:'LOADING', payLoad:false});
    }
 }

 const initinalState ={
    userData:[],
    isLoading:false,
    isEditing:{status:false, id:'', name:'', email:'', website:''}
 }

 useEffect(()=>{
    fetchApi(URL);
 },[])
 

 const [state, dispatch] = useReducer(reducer, initinalState);

//  const handleDelete = (id) =>{
//     dispatch({type:"DELETE_U", payLoad:id});
//  }

const handleDelete = async (id) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        dispatch({ type: "DELETE_U", payLoad: id });
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

//  const updateData = (id, name, email, website) =>{
//     dispatch({type:'UPDATE_DATA', payLoad:{id:id, name:name, email:email, website:website}});
//     dispatch({type:'ONCLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
//  }

const updateData = async (id, name, email, website) => {
    try {
        
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, email, website })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        dispatch({ type: 'UPDATE_DATA', payLoad: { id, name, email, website } });
        dispatch({ type: 'ONCLICK_EDIT', payLoad: { status: false, id: '', name: '', email: '', website: '' } });
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

    return(
        <div>
            <Header/>
              <div className='container'>
                 <h3 className='mt-3 mb-3'>Usereducer13 Component</h3>

                  {state.isEditing.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.email} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />}

                 {state.isLoading && <h3 className='text-center mt-5'><img src={Loader} alt={Loader} /></h3>}

                 <div className='row'>
                    {
                        state.userData.map((eachItem)=>{
                            const {id, name, email, website} = eachItem;
                            return(
                                <div key={id} className='col-4 col-xs-12'>
                                    <div className='shadow p-3 mb-3'>
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                            <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className='btn btn-info rounded-0' onClick={()=> dispatch({type:'ONCLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
                                            <Link className='btn btn-primary rounded-0' to={`/Usereducer13/${eachItem.id}`}>Details</Link>
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

    return(
        <div className='shadow p-3 mb-3 mt-3'>
           <input type='text' className='form-control mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
           <input type='email' className='form-control mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
           <input type='text' className='form-control mb-2' id='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
           <input type='submit' className='btn btn-primary mb-2' onClick={()=> updateData(id, name, email, website, updateData)} />
        </div>
    )
}

export default Usereducer13;