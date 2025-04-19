import React,{useReducer, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const reducer = (state, action) =>{
    if(action.type === "PERSON_UPDATE"){
        return{
            ...state,
            userData:action.payload
        }
    }
    if(action.type === "Loading"){
        return{
            ...state,
            isLoading:action.payload
        }
    }
    if(action.type === "DELETE_USER"){
        const newUser = state.userData.filter((eachUser)=>{
            return eachUser.id !== action.payload
        });
        return{
            ...state,
            userData:newUser
        }

    }
    // if(action.type === "Error"){
    //     return{
    //         ...state,
    //         Error:action.payload
    //     }
    // }
   return state;
}

const Usereducer1 = () =>{

    const fetchApiData = async (URL) =>{
          dispatch({type:"Loading", payload:true});
          dispatch({type:"Error", payload:{status:false, msg:''}});
        try {
            const responsive = await fetch(URL);
            const data = await responsive.json();
            dispatch({type:"PERSON_UPDATE", payload:data});
            dispatch({type:"Loading", payload:false});
            dispatch({type:"Error", payload:{status:false, msg:''}});
        } catch (error) {
            console.log(error);
            dispatch({type:"Loading", payload:false});
            dispatch({type:"Error", payload:{status:true, msg:error.message}});
        }
    }

    const initialState = {
        userData:[],
        isLoading:false,
        isError:{status:false, msg:''}
   }

    useEffect(()=>{
          fetchApiData("https://jsonplaceholder.typicode.com/users");
    },[])

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleDelete = (id) =>{
       dispatch({type:"DELETE_USER", payload:id})
    }

    if(state.isLoading){
        return <h3 className="text-center">Loading...</h3>
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h3 className="mt-5 mb-3">Usereducer1 Component</h3>
                <div className="row">
                    {/* {
                        state.isLoading && <h4 className="text-center">Loading...</h4>
                    } */}
                {
                    state.userData.map((eachUser)=>{
                        const {id, name, email} = eachUser;
                        return(
                            <div className="col-4 text-black" key={id}>
                                <div className="shadow p-3 mb-3" style={{background:"lightskyblue"}}>
                                <h4>{name}</h4>
                                <p>{email}</p>
                                <button className="btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
                                <button className="btn btn-primary">Edit</button>
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

export default Usereducer1;