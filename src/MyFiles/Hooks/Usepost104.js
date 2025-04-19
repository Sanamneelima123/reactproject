import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Usepost104 = () =>{

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [webiste, setWebsite] = useState('');
 const [errorForm, setErrorForm] = useState(false)

//  console.log({name, email, webiste});

const navigate = useNavigate();

 const allData={name, email, webiste}

 const formSubmit = async (e) =>{
    e.preventDefault();

    if(!name || !email || !webiste){
        setErrorForm('ALL Input Fields or Required');

        return;
    }

    setErrorForm(false);

    console.log(allData);

    const response = await fetch(`http://localhost:3333/Users`,{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allData)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('Data save on User API Successfully');
    }else{
        alert('Data not save on User API');
    }

 }


    return(
        <div>
            <Header/>
              <div className="container">
                  <div className="shadow p-3 mb-4 mt-4">
                     <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={webiste} onChange={(e)=> setWebsite(e.target.value)} />
                        {errorForm && <p style={{color:'red'}}>{errorForm}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                        <button className="btn btn-info mb-2" onClick={()=> navigate(`/Usestate104`)}>Go Back</button>
                     </form>
                     
                  </div>
              </div>
            <Footer/>
        </div>
    )
}

export default Usepost104;