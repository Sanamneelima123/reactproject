import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"
import { Link } from "react-router-dom";

const Usereducer16 = () => {
  const URL = "https://jsonplaceholder.typicode.com/users";

  // Define reducer function
  const reducer = (state, action) => {
    if (action.type === "FETCH_API") {
      return {
        ...state,
        myData: action.payload,
        isLoading: false, // Set isLoading to false after data is fetched
      };
    }

    if(action.type === "IS_ERROR"){
        return{
            ...state,
            isError:action.payload
        }
    }
    if(action.type === "DELETE"){
        const deleteData = state.myData.filter((eachData)=>{
            return eachData.id !== action.payload
        })
        return{
            ...state,
            myData:deleteData
        }
    }
    if(action.type === "ONCLICK_EDIT"){
        return{
            ...state,
            isEdit:action.payload
        }
    }
    if(action.type === "UPDATE_DATA"){
        const Todos = state.myData.map((eachData)=>{
            if(eachData.id === action.payload.id){
                return{
                    id:action.payload.id,
                    name:action.payload.name,
                    email:action.payload.email,
                    website:action.payload.website
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
  };

  // Define fetchApiData function
  const fetchApiData = async (apiUrl) => {
    dispatch({type:"IS_ERROR", payload:{status:false, msg:''}});
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      dispatch({ type: "FETCH_API", payload: data });
      dispatch({type:"IS_ERROR", payload:{status:false, msg:''}});
      if(response.status === 404){
        throw new Error('Data not Found')
      }
    } catch (error) {
      console.log(error);
      dispatch({type:"IS_ERROR", payload:{status:true, msg: error.message || 'something went wrong'}});
      // Handle error state if needed
    }
  };

  // Define initial state
  const initialState = {
    myData: [],
    isLoading: true, // Set isLoading to true initially
    isError: { status: false, msg: "" },
    isEdit:{status:false, id:'', name:'', email:'', website:''}
  };

  // Use useReducer hook to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateData = (id, name, email, website) =>{
    dispatch({type:"UPDATE_DATA", payload:{id:id, name:name, email:email, website:website}});
    dispatch({type:"ONCLICK_EDIT", payload:({status:false, id:'', name:'', email:'', website:''})})
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type' : 'Application/json'
        }
      })
      if(!response.ok){
        const data = await response.json();
        throw new Error(data.message || 'Failed to Delete User');
      }
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
       console.log('Error Message Delete', error)
    }
  }

  // Fetch data from API on component mount
  useEffect(() => {
    fetchApiData(URL);
  }, []);

  if(state.isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{state.isError.msg}</h3>
  }

  return (
    <div>
      <Header />
      <div className="container">

        {state.isEdit.status && <EditForm id={state.isEdit.id} comingName={state.isEdit.name} comingEmail={state.isEdit.email} comingWebsite={state.isEdit.website} updateData={updateData} />}
        
        <div className="row">
          {state.isLoading ? (
            <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
          ) : (
            state.myData.map((eachData) => {
              const { id, name, email, website } = eachData;
              return (
                <div key={id} className="col-4 col-xs-12">
                  <div className="shadow p-3 mb-3">
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{website}</p>
                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                      <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                      <button className="btn btn-info rounded-0" onClick={()=> dispatch({type:"ONCLICK_EDIT", payload:({status:true, id:id, name, email, website})})}>Edit</button>
                      <Link className="btn btn-primary rounded-0" to={`/Usereducer16/${eachData.id}`}>Details</Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};


const EditForm = ({id, comingName, comingEmail, comingWebsite, updateData}) =>{

  const [name, setName] = useState(comingName || '');
  const [email, setEmail] = useState(comingEmail || '');
  const [website, setWebsite] = useState(comingWebsite || '');

    return(
        <div className="shadow p-3 mt-3 mb-3">
            <form>
                <input type="text" className="form-control mb-2" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" className="form-control mb-2" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="text" className="form-control mb-2" id="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(id, name, email, website)} />
            </form>
        </div>
    )
}

export default Usereducer16;
