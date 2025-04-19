import React,{useReducer} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const reducer = (state, action) =>{
    if(action.type === "PERSON_DELETE"){
        const newPerson = state.data.filter((eachData)=>{
            return eachData.id !== action.payLoad
        });
        return{
            ...state,
            data:newPerson,
            length:state.length -1,
        }
    }
    if(action.type === "PERSON_DELETE"){
        const deletePerson = state.data.filter((eachData)=>{
            return eachData.id !== action.payLoad
        })
        return{
            ...state,
            data:deletePerson,
        }
    }
}

const Usereducer = () =>{

   const initialState ={
        data:[
            {id:"sdbvjksbdjv", firstname:"pavan", email:"pawan.balla@gmail.com"},
            {id:"bdfgbdd", firstname:"balu", email:"balla@gmail.com"}
        ],
        length:2
    }

    const [state, dispatch]= useReducer(reducer,initialState);

    const handleDelete = (id) =>{
    //   console.log(id);
    dispatch({
        type:"PERSON_DELETE",
        payLoad:id
    })
    }

    const handleEdit = (id) =>{
        dispatch({
            type:"PERSON_UPDATE",
            payLoad:id
        })
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h3 className="mt-5">Usereducer component</h3>
                <p>Data count length : {state.length}</p>
                {
                    state.data.map((eachData)=>{
                        const {id, firstname, email} = eachData;
                        return(
                            <div key={id}>
                                <h3>{firstname}</h3>
                                <p>{email}</p>
                                <button onClick={()=> handleDelete(id)} className="btn btn-danger">Delete</button>
                                <button onClick={()=>handleEdit(id)} className="btn btn-info">Edit</button>
                            </div>
                        )
                    })
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Usereducer;