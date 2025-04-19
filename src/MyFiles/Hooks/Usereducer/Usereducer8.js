import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from '../../../images/Loading-img.gif'

const Usereducer8 = () =>{

    const redcuer = (state, action) =>{
          if(action.type === "FETCH_API"){
            return {
                ...state,
                userData:action.payLoad
            }
          }
          if(action.type === "CLICK_EDIT"){
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
          if(action.type === "USER_DELETE"){
             const delteUser = state.userData.filter((eachUser)=>{
               return eachUser.id !== action.payLoad
             })
             return{
                ...state,
                userData:delteUser
             }
          }
          if (action.type === "UPDATE_DATA") {
            const newUserData = state.userData.map((eachUser) => {
                if (eachUser.id === action.payLoad.id) {
                    return {
                        id: action.payLoad.id,
                        name: action.payLoad.name,
                        email: action.payLoad.email,
                        website: action.payLoad.website
                    };
                } else {
                    return eachUser;
                }
            });
        
            return {
                ...state,
                userData: newUserData
            };
        }
        

          return state;
    }

    const initinalstate ={
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
            console.log(error);
        }
    }

    useEffect(()=>{
        apiFetch('https://jsonplaceholder.typicode.com/users');
    },[])
  
   const handleDelete = (id) =>{
      dispatch({type:'USER_DELETE', payLoad:id})
   }

     const updateData = (id, name, email, website) =>{
       dispatch({type:'UPDATE_DATA', payLoad:{id:id, name, email, website}});
       dispatch({type:'CLICK_EDIT', payLoad:({status:false, id:'', name:'', email:'', website:''})})
     }

   const [state, dispatch] = useReducer(redcuer, initinalstate);

    return(
        <div>
            <Header/>
                <div className="container">
                    
                  {
                    state.isEditing?.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name}  comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />
                  }

                   {state.isLoading && <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>}

                    <div className="row mt-5 mb-5">
                        {
                            state.userData.map((eachUser)=>{
                                const {id, name, email, website} = eachUser;
                                return(
                                    <div key={id} className="col-4 col-xs-12">
                                        <div className="shadow p-3 mb-3">
                                            <p>{name}</p>
                                            <p>{email}</p>
                                            <p>{website}</p>
                                            <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                                <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                                <button className="btn btn-info rounded-0" onClick={()=> dispatch({type:'CLICK_EDIT', payLoad:({status:true, id:id, name, email, website})})}>Edit</button>
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
        <div className="container">
            <div className="shadow p-3 mt-3 mb-3">
                <form>
                    <input type="text" className="form-control mb-2" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" id="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(id, name, email, website)} />
                </form>
            </div>
        </div>
    )
}

export default Usereducer8;