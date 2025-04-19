import React,{useEffect, useReducer, useState} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"

const Usereducer6 = () =>{

    const reducer = (state, action) =>{
        if(action.type === "FETCH_API"){
            return{
                ...state,
                userData:action.payLoad
            }
        }
        if(action.type === "Loading"){
            return{
                ...state,
                isLoading:action.payLoad
            }
        }
        if(action.type === "USER_DELETE"){
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
                isEditing:action.payLoad
            }
        }
        if(action.type === "USER_UPDATE"){
            const addUser = state.userData.map((eachData)=>{
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
                userData:addUser
            }
        }


        return state;
    }

    const initinalstate ={
        userData:[],
        isLoading:false,
        isEditing:{status:false, id:'', name:'', email:'', website:''}
    }

    const fetchapi = async (URL)=>{
        dispatch({type:"Loading", payLoad:true});
        try {
            const response = await fetch(URL);
            const data = await response.json();
            dispatch({type:"FETCH_API", payLoad:data});
            dispatch({type:"Loading", payLoad:false});
        } catch (error) {
            console.log(error);
            dispatch({type:"Loading", payLoad:false});
        }
    }

    const handleDelete = (id) =>{
        dispatch({type:"USER_DELETE", payLoad:id})
    }

    const updateData = (id, name, email, website) =>{
        dispatch({type:"USER_UPDATE", payload:{id:id, name, email, website}});
        dispatch({type:"ONCLICK_EDIT", payload:({status:false, id:'', name:'', email:'', website:''})})
    }

    useEffect(()=>{
       fetchapi('https://jsonplaceholder.typicode.com/users');
    },[])

    const [state, dispatch] = useReducer(reducer, initinalstate);

    return(
        <div>
            <Header/>
               <div className="container">

                  {
                    state.isEditing?.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name}  comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} updateData={updateData} />
                  }

                  {state.isLoading && <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>}

                  <div className="row mt-4">
                     {
                        state.userData.map((eachData)=>{
                            const {id, name, email, website} = eachData;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-3">
                                       <p>{name}</p>
                                       <p>{email}</p>
                                       <p>{website}</p>
                                       <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                          <button className="btn btn-danger" onClick={()=> handleDelete(id)}>Delete</button>
                                          <button className="btn btn-info" onClick={()=> dispatch({type:"ONCLICK_EDIT", payload:({status:true, id:id, name, email, website})})}>Edit</button>
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
            <div className="shadow p-3">
            <form>
                <input type="text" className="form-control mb-2" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" id="website" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(id, name, email, website)} />
            </form>
            </div>
        </div>
    )
}

export default Usereducer6;