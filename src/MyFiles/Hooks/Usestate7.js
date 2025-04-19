import React, {useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestate7 = () =>{
//  const newArray=[
//     {
//         text:'Hello',
//         id:'cjsdncjns'
//      },
//      {
//         text:'Hello World',
//         id:'njvfnjvnjfnd'
//      }
//  ]
 const [list, setList] = useState([]);
 const [message, setMessage] = useState({
    text:'',
    id:''
 });

  const [edit, setEdit] = useState({
    id:'',
    isEdit:false
  })

 const changemessage = (e) =>{
    setMessage({
        ...message,
        text:e.target.value
    })
 }

 const handleDelete = (id) =>{
    console.log(id);
    const listdata = list.filter((eachItem)=>{
        return eachItem.id !== id
    })
    console.log(listdata);
    setList(listdata);
 }

 const handleSubmit = (e) =>{
    e.preventDefault();
     const newObj={
        text:message.text,
        id:new Date().getTime().toString(),
     }
     console.log(newObj);
     setList([...list, newObj]);
     setMessage({
        text:'',
        id:''
     })
 }

 const handleEdit = (id) =>{
    setEdit({
        ...edit,
        id:id,
        isEdit:true
    });
    const editvalue = list.find((eachItem)=> eachItem.id === id)
    console.log(editvalue);
    setMessage({
        ...message,
        text:editvalue.text,
        id:editvalue.id
    })
 }

 const handleEditing = (e) =>{
    e.preventDefault();
    const Todos = list.map((eachItem)=>{
        if(eachItem.id === edit.id){
            return{
                text:message.text,
                id:edit.id
            }
        }else{
            return eachItem;
        }
    });
    console.log(Todos);
    setList(Todos);
    setMessage({
        text:'',
        id:''
    })
    setEdit({
        id:'',
        isEdit:false
    })
 }


    return(
        <div>
            <Header/>
            <div className="container mt-5">
                <h3>Usestate 7 component</h3>

                 <div className="">
                    <form>
                        <input type="text" className="form-control" id="message" name="message" value={message.text} onChange={changemessage} required />
                        {
                            edit.isEdit ? (<button  type="button" onClick={handleEditing} className="btn btn-primary mt-2">Edit</button>) : (<button  type="button" onClick={handleSubmit} className="btn btn-primary mt-2">Add</button>)
                        }
                        
                    </form>
                    <hr/>
                    {
                        list.length === 0 && <h4>there are no data in the List</h4>
                    }
                    <div className="">
                        {
                            list.map((eachItem)=>{
                                const {text, id} = eachItem;
                                return(
                                    <div key={id}>
                                        <p>{text}</p>
                                        <button className="btn btn-primary" onClick={()=>handleEdit(id)}>Edit</button>
                                        <button className="btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
                                    </div>
                                )
                            })
                        }
                    </div>

                 </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Usestate7;