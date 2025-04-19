import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestate5 = () =>{
    // const newArray=[
    //     {
    //         name:"Hello",
    //         id:"dcjd bcjdsbj"
    //     },
    //     {
    //         name:"Hello World",
    //         id:"cnsdjcnsdjncj"
    //     }
    // ]
    const [list,setList]= useState([]);
    const [message,setMessage] = useState({
        name:"",
        id:""
    });

    useEffect(() => {
        // Fetch data from JSONPlaceholder API
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((data) => {
            // Update the message state with the fetched data
            setMessage({
              name: data.name,
              id: data.id,
            });
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, []); // Empty dependency array ensures the effect runs only once on component mount
    

    const [edit, setedits] = useState({
        id:'',
        isEdit:false
    })

    const handleMessage = (e) =>{
        setMessage({
            ...message,
            name:e.target.value
        })
    }

    const handleDelete = (id) =>{
       const listfilter = list.filter((eachItem)=>{
          return eachItem.id !== id
       })
    //    console.log(listfilter);
          setList(listfilter)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newObj={
            name:message.name,
            id:new Date().getTime().toString(),
        }
        console.log(newObj);
        setList([...list, newObj]);
        setMessage({
            ...message,
            name:'',
            id:''
        })
    }

    const handleEdit = (id) =>{
        setedits({
            ...edit,
            id:id,
            isEdit:true
        });
        const editvalue = list.find((eachItem)=> eachItem.id === id)
        console.log(editvalue);
        setMessage({
            ...message,
            name:editvalue.name,
            id:editvalue.id
        })
    }

    const handleEditing = (e) =>{
        e.preventDefault();
        const Todos = list.map((eachItem)=>{
            if(eachItem.id === edit.id){
                 return{
                    name:message.name,
                    id:edit.id
                 }
            }else{
                return eachItem;
            }
        });
        console.log(Todos);
        setList(Todos);
        setMessage({
            name:'',
            id:''
        })
        setedits({
            id:'',
            isEdit:false
        })
    }


    return(
        <>      
         <Header/>
         <div className="container">
            <h3 className="mt-5">useState 5 </h3>
            
            <div className="">
               <form>
                  <input type="name" className="form-control" id="message" name="message" value={message.name} onChange={handleMessage} />
                  {
                    edit.isEdit ? (<button className="btn btn-primary" onClick={handleEditing}>Edit</button>) :
                     (<button className="btn btn-info" onClick={handleSubmit}>Add</button>)
                  }
                  
               </form>
               <hr/>
               {
                list.length === 0 && <h4>there is no data in the list</h4>
               }
               <div className="row">
                  {
                    list.map((eachItem)=>{
                        const {name, id} = eachItem;
                        return(
                            <div key={id} className="">
                                <p>{name}</p>
                                <button className="btn btn-info" onClick={()=>handleEdit(id)}>Edit</button>
                                <button className="btn btn-danger" onClick={()=>handleDelete(id)}>Danger</button>
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

export default Usestate5;