import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestate6 = () =>{
//  const newArray = [
//     {
//         text:"Hello",
//         id:"dncjnjsdnjv"
//      },
//      {
//         text:"Hello World",
//         id:"ncjsndjcnsd"
//      }
//  ]
 const [list,setList] = useState([]);
 const [message,setMessage] = useState({
    text:"",
    id:""
 });

 const [editItem,setEdititem]= useState({
    id:"",
    isEdite:false
 });

 const handleChange = (e) =>{
    setMessage({
        ...message,
        text:e.target.value,
    })
 }

 const handleSubmit = (e) =>{
    e.preventDefault();
    let listObj={
        text:message.text,
        id:new Date().getTime().toString(),
    }
    // console.log(listObj);
    setList([...list, listObj]);
    setMessage({
        text:'',
        id:''
    })
 }

 const handleDelete = (id) =>{
    const filterdata = list.filter((eachItem)=>{
        return eachItem.id !== id
    })
    // console.log(filterdata);
    setList(filterdata);
 }

//  console.log(list.length)

const handleEditStatus = (id) =>{
    console.log(id);
    setEdititem({
        ...editItem,
        id:id,
        isEdite:true
    });
    const editbuleItem = list.find ((eachItem)=> eachItem.id === id);
    setMessage({
        ...message,
        text:editbuleItem.text,
        id:editbuleItem.id
    });
    // console.log(editbuleItem);
    setMessage(editbuleItem)
}

const handleEdit = (e) =>{
    e.preventDefault();
    const Todos = list.map((eachItem)=>{
        if(eachItem.id === editItem.id){
             return{
                text:message.text,
                id:editItem.id
             }
        }else{
            return eachItem;
        }
    });
    setList(Todos);
    console.log(Todos);
    setEdititem({
        id:"",
        isEdite:false
    });
    setMessage({
        text:"",
        id:''
    })
}

   return(
    <>
       <Header />
       <div className="container">
           <h3 className="mt-5">React Form Handling and crud operations</h3>

         <div className="row">
            <form>
                <input type="text" className="form-control" id="name" name="name" value={message.text} onChange={handleChange} />
                {
                    editItem.isEdite ? (<button type="submit" className="btn btn-primary" onClick={handleEdit}>Edit</button>) : 
                    (<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>)
                }
            </form>
            {
                list.length === 0 && <h4>there is no data in the list</h4>
            }
            <hr/>
            <div>
                 {
                    list.map((eachItem)=>{
                        const {text, id} = eachItem;
                        return(
                            <div key={id}>
                                <p>{text}</p>
                                <button className="btn btn-info" onClick={()=>handleEditStatus(id)}>Edit</button>
                                <button className="btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
                            </div>
                        )
                    })
                 }
            </div>
         </div>
         

       </div>
       <Footer/>
    </>
   )
}

export default Usestate6;