import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost3 = () =>{

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [website, setWebsite] = useState('');
const [errorForm, setErrorForm] = useState(false)

// console.log({name, email, website})

const empData={name, email, website}

const formSubmit = async (e) =>{
    e.preventDefault();

    if(!name || !email || !website){
        setErrorForm('ALL Input Fields or Required');

        return;
    }
    setErrorForm(false);

    console.log({empData});

    const responsive = await fetch('http://localhost:3333/Users',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(empData)
    })
    if(responsive.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('Employee Data save on API Successfully');
    }else{
        alert('Employee Data not save on API');
    }
}

    return(
        <div>
            <Header/>
              <div className="container">
                  <h3 className="mt-4 mb-4">Usepost3 Component</h3>

                  <div className="shadow p-3 mt-4">
                    <form onSubmit={formSubmit}>
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {errorForm && <p style={{color:'red'}}>{errorForm}</p>}
                    <input type="submit" className="btn btn-primary rounded-0 mb-2" />
                    </form>
                  </div>

              </div>
            <Footer/>
        </div>
    )
}

export default Usepost3;