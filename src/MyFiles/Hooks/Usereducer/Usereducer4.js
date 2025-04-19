import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import loading from "../../../images/Loading-img.gif"


const reducer = (state, action) =>{
    if(action.type === "FETCH_DATA"){
        return{
            userData:action.payload
        }
    }
    if(action.type === "Loading"){
        return{
            ...state,
            isLoading:action.payload
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
    if(action.type === "ONCLICK_EDIT"){
        return{
            ...state,
            isEditing:action.payload
        }
    }
    if(action.type === "UPDATING_USER"){
        const newData = state.userData.map((eachUser)=>{
            if(eachUser.id === action.payload.id){
                return{
                    id:action.payload.id,
                    name:action.payload.name,
                    email:action.payload.email
                }
            }else{
                return eachUser;
            }
        })
        return{
            ...state,
            userData:newData
        }
     }

}

const Usereducer4 = () =>{

    const initialState={
        userData:[],
        isLoading:false,
        isError:{status:false, msg:''},
        isEditing: { status: false, id:'', name: '', email: '' },
    }

    const fetchApiData = async (URL) => {
          dispatch({type:"Loading", payload:true});
        try {
          const responsive = await fetch(URL);
          const data = await responsive.json();
          dispatch({ type: "FETCH_DATA", payload: data });
          dispatch({type:"Loading", payload:false});
        } catch (error) {
          console.error("Error fetching data:", error);
          dispatch({type:"Loading", payload:false});
          // Optionally handle the error (dispatch an error action, set an error state, etc.)
        }
      };
      

    useEffect(()=>{
       fetchApiData("https://jsonplaceholder.typicode.com/users");
    },[])

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = (id) =>{
       dispatch({type:"USER_DELETE", payload:id})
    }

    const upDateData = (id, name, email) =>{
         dispatch({type:"UPDATING_USER", payload:{id, name, email}});
         dispatch({type:"ONCLICK_EDIT", payload:({status:false, id:"", name:"", email:""})})
    }

    return(
        <div>
            <Header/>
            <div className="container mb-5">
                <h4 className="mt-5 mb-3">Usereducer4 Component</h4>
              
                <div className="row">
                    {
                        state.isEditing?.status && <Editform id={state.isEditing.id} comingTitle={state.isEditing.name} comingEmail={state.isEditing.email} upDateData={upDateData}/>
                    }
                    {
                        state.isLoading && <h4 className="text-center"><img className='logo_cg' src={loading} alt={"logo"}/></h4>
                    }
                    {
                        state.userData.map((eachUser)=>{
                            const {id, name, email} = eachUser;
                            return(
                                <div key={id} className="col-4">
                                    <div className="shadow p-3 mb-3" style={{background:"lightskyblue"}}>
                                        <h4>{name}</h4>
                                        <p>{email}</p>
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={()=> dispatch({type:"ONCLICK_EDIT", payload:({status:true, id:id, name, email})})}>Edit</button>
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

const Editform = ({id, comingTitle, comingEmail, upDateData}) =>{

    const [title, setTitle] = useState(comingTitle || '');
    const [email, setEmail] = useState(comingEmail || '');

    return(
        <div>
            <div className="container">
                <form className="mb-3">
                    <input className="col-5 p-1" type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                    <input className="col-5 p-1" type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button className="btn btn-primary border-0 col-2 rounded-0" onClick={() => upDateData(id, title, email)}>
                        update data
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Usereducer4;