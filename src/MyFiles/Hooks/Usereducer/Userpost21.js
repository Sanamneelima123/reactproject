import React, { useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Userpost21 = () =>{

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [errorForm, setErrorForm] = useState(false)

//  console.log({name, email, website});

const vendorDetails = {name, email, website}

const formSubmit = async (e) =>{
    e.preventDefault();
    if(!name || !email || !website){
        setErrorForm('All Input Fields or Required');

        return
    }
    setErrorForm(false);
    console.log(vendorDetails);

    const response = await fetch('http://localhost:3001/Users',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(vendorDetails)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('Data save on Local API Successfully')
    }else{
        alert('Data not save on Local API')
    }
}

    return(
        <div>
            <Header/>
               <div className="container">
                  <h3 className="mt-4 mb-3">Userpost21 Component</h3>

                  <div className="shadow p-3 mt-4 mb-3">
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

export default Userpost21;