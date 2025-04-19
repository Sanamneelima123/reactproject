import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost101 = () =>{

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [errorForm, setErrorForm] = useState(false)

//  console.log({name, email, website})

const vendorData = {name, email, website}

const formSubmit = async (e) =>{
    e.preventDefault();
    if(!name || !email || !website){
        setErrorForm('All Input Fields or Required');

        return;
    }
    setErrorForm(false);
    console.log(vendorData)

    const response = await fetch('http://localhost:3001/Users',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(vendorData)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('Data save API Successfully')
    }else{
        alert('Data not save API')
    }
}

    return(
        <div>
            <Header/>
              <div className="container">
                 <h3 className="mt-4">Usepost101 Component</h3>

                <div className="shadow p-3 mb-4 mt-4">
                    <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                         {errorForm && <p style={{color:'red'}}>{errorForm}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                </div>

              </div>
            <Footer/>
        </div>
    )
}

export default Usepost101;