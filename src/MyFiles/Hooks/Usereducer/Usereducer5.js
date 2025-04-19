import React,{useEffect, useReducer, useState} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"

const Usereducer5 = () =>{

    const reducer = (state, action) =>{
        if(action.type === "FETCH_DATA"){
            return{
                ...state,
                userData:action.payload
            }
        }
        if(action.type === "USER_DELETE"){
            const deleteUser = state.userData.filter((eachUser)=>{
                return eachUser.id !== action.payload
            })
            return{
                ...state,
                userData:deleteUser
            }
        }
        if(action.type === "Loading"){
            return{
                ...state,
                isLoading:action.payload
            }
        }
        if(action.type === "ONCLICK_EDIT"){
            return{
                ...state,
                isEditing:action.payload
            }
        }
        if(action.type === "UPDATE_USER"){
            const updateData = state.userData.map((eachUser)=>{
                if(eachUser.id === action.payload.id){
                    return{
                        id:action.payload.id,
                        name:action.payload.name,
                        email:action.payload.email,
                        website:action.payload.website
                    }
                }else{
                    return eachUser
                }
            })
            return{
                ...state,
                userData:updateData
            }
        }

       return state;
    }

    const initnalstate ={
       userData:[],
       isLoading:false,
       isEditing:{status:false, id:'', name:'', email:'', website:''}
    }

    const apifetch = async (URL)=>{
        dispatch({type:"Loading", payload:true});
        try {
            const response = await fetch(URL);
            const data = await response.json();
            dispatch({type:"FETCH_DATA", payload:data});
            dispatch({type:"Loading", payload:false});
        } catch (error) {
             console.log(error);
             dispatch({type:"Loading", payload:false});
        }
       
    }

    const handleDelete = (id) =>{
        dispatch({type:"USER_DELETE", payload:id})
    }

    const upDateData = (id, name, email, website) =>{
        dispatch({type:"UPDATE_USER", payload:{id:id, name, email, website}});
        dispatch({type:"ONCLICK_EDIT", payload:({status:false, id:'', name:'', email:'', website:''})})
    }

    const [state, dispatch] = useReducer(reducer, initnalstate);

    useEffect(()=>{
        apifetch("https://jsonplaceholder.typicode.com/users")
    },[])

    return(
        <div>
            <Header/>
              <div className="container mt-5 mb-5">
                  <h3 className="mt-3 mb-3">Usereducer5 Component</h3>                   
                   <div className="row">
                   {
                        state.isEditing?.status && <EditForm id={state.isEditing.id} comingName={state.isEditing.name} comingEmail={state.isEditing.email} comingWebsite={state.isEditing.website} upDateData={upDateData}/>
                    }

                  {state.isLoading && <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>}
                  {
                    state.userData.map((eachUser)=>{
                        const {id, name, email, website} = eachUser;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
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

const EditForm = ({id, comingName, comingEmail, comingWebsite, upDateData}) =>{

    const [name, setName] = useState(comingName || '');
    const [email, setEmail] = useState(comingEmail || '');
    const [website, setWebsite] = useState(comingWebsite || '')

    return(
        <div className="container">
            <div className="shadow p-3 mb-4">
            <form>
                <input type="text" className="form-control mb-2" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" name="website" id="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <button type="submit" className="btn btn-primary mb-2" onClick={()=> upDateData(id, name, email, website)}>Update Data</button>
            </form>
            </div>
        </div>
    )
}

export default Usereducer5;