import React,{useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usesteexp = () =>{
  
//   const newArray = [
//       {
//         text:'Hello World',
//         id:'ncdjsnjs'
//       },
//       {
//         text:'Hello',
//         id:'dvdsgssewfe'
//       }
//   ]

  const [list,setList] = useState([]);
  const [messaga,setMessage] = useState({
    text:'',
    id:''
  });

  const [edit, setEdit] = useState({
    id:'',
    isEdit:false
  })

  const changeMessage = (e) =>{
      setMessage({
        ...messaga,
        text:e.target.value
      })
  }

  const handleDelete = (id) =>{
    //  console.log(id);
    const listfilter = list.filter((eachItem)=>{
        return eachItem.id !== id
    });
    // console.log(listfilter);
    setList(listfilter)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newObj={
        text:messaga.text,
        id:new Date().getTime().toString(),
    }
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
     const editValue = list.find((eachItem)=> eachItem.id === id)
    //  console.log(editValue);
    setMessage({
        ...messaga,
        text:editValue.text,
        id:editValue.id
    })
  }

  const handleEdits = (e) =>{
    e.preventDefault();
    const Todos = list.map((eachItem)=>{
        if(eachItem.id === edit.id){
            return{
                text:messaga.text,
                id:edit.id
            }
        }else{
            return eachItem;
        }
        
    })
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
             <div className="container">
                <h3 className="mt-5">Usesteexp Component</h3>

                <div className="">
                    <form>
                        <input type="text" className="form-control" id="message" name="message" value={messaga.text} onChange={changeMessage} />
                        {
                            edit.isEdit ? (<button type="submit" onClick={handleEdits} className="btn btn-primary">Edit</button>) :
                             (<button type="submit" onClick={handleSubmit} className="btn btn-primary">Add</button>)
                        }
                        
                    </form>
                    <hr/>
                    {
                        list.length === 0 && <h4>there is no Data in the List</h4>
                    }
                    <div className="mt-3">
                        {
                            list.map((eachItem)=>{
                                const {text, id} = eachItem;
                                return(
                                    <div key={id}>
                                        <p>{text}</p>
                                        <button className="btn btn-info" onClick={()=>handleEdit(id)}>Edit</button>
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

export default Usesteexp;