import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const reducer = (state, action) => {
  if (action.type === "UPDATE_DATA") {
    return {
      ...state,
      userData: action.payload,
    };
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
  if(action.type === "Loading"){
    return{
        ...state,
        isLoading:action.payload
    }
  }
  if(action.type === "DELETE_PERSON"){
    const newUser = state.userData.filter((eachUser)=>{
        return eachUser.id !== action.payload
    })
     return{
        ...state,
        userData:newUser
     }
  }
  
};

const Usereducer2 = () => {
  const fetchApiData = async (URL) => {
         dispatch({type:"Loading", payload:true});
      try {
        const responsive = await fetch(URL);
        const data = await responsive.json(); // Await the result
        dispatch({ type: "UPDATE_DATA", payload: data });
        dispatch({type:"Loading", payload:false});
      } catch (error) {
         console.log(error);
         dispatch({type:"Loading", payload:false});
      }
    
  };

  useEffect(() => {
    fetchApiData("https://jsonplaceholder.typicode.com/users");
  }, []);

  const initialState = {
    userData: [],
    isLoading: false,
    isError: { status: false, msg: "" },
    isEditing: { status: false, id: "", name: "", email: "" },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = (id) =>{
     dispatch({type:'DELETE_PERSON', payload:id})
  }

  const updateData = (id, name, email) =>{
    dispatch({type:"UPDATING_USER", payload:{id, name, email}});
    dispatch({type:"ONCLICK_EDIT", payload:{status:false, id:id, name, email}})
  }

//   if(state.isLoading){
//      return <h4 className="text-center">Loading...</h4>
//   }

  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="mt-5 mb-3">Usereducer2 component</h3>
        <div className="row">
            {
                state.isEditing?.status && <Formdatas id={state.isEditing.id} comingTitle={state.isEditing.name} comingEmail={state.isEditing.email} updateData={updateData} />
            }
            {
                state.isLoading && <h4 className="text-center">Loading...</h4>
            }
          {state.userData.map((eachUser) => {
            const { id, name, email } = eachUser;
            return (
              <div key={id} className="col-4">
                <div className="shadow p-3 mb-3" style={{background:"lightseagreen"}}>
                  <h4>{name}</h4>
                  <p>{email}</p>
                  <button className="btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
                  <button className="btn btn-primary" onClick={()=> dispatch({type:"ONCLICK_EDIT", payload:{status:true, id:id, name, email}})}>Edit</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Formdatas = ({id, comingTitle, comingEmail, updateData}) =>{

  const [title, setTitle] = useState(comingTitle || "");
  const [email, setEmail] = useState(comingEmail || "");

    return(
        <div className="mb-3">
            <form>
                <input type="text" className="col-4" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input type="email" className="col-4" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button className="btn btn-primary border-0 col-2 rounded-0" onClick={() => updateData(id, title, email)}>Updated Data</button>
            </form> 
        </div>
    )
}

export default Usereducer2;
