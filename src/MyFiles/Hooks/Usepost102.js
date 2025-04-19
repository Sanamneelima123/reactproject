import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Usepost102 = () =>{

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [errorForm, setErrorForm] = useState(false);

 const navigate = useNavigate();

//  console.log({name, email, website});

const allmydata ={name, email, website}

 const formSubmit = async (e) =>{
    e.preventDefault();

     if(!name || !email || !website){
        setErrorForm('ALL Input Fields or Required');
        return;
     }

     setErrorForm(false);

    console.log(allmydata);
    
    const response = await fetch('http://localhost:3001/Users',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allmydata)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('Usepost102 Data save to API Successfully');
    }else{
        alert('Usepost102 Data not save to API');
    }

 }

    return(
        <div>
            <Header/>
              <div className="container">
                 <h3 className="mt-4 mb-4">Usepost102 Component</h3>

                 <div className="shadow p-3">
                    <form onSubmit={formSubmit}>
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {errorForm && <p style={{color:'red'}}>{errorForm}</p>}
                    <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                      <button className="btn btn-info rounded-0" onClick={()=> navigate(`/Usestate102`)}>Go Back</button>
                    </div>
                 </div>

              </div>
            <Footer/>
        </div>
    )
}

export default Usepost102;