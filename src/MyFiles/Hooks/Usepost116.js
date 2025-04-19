import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost116 = () =>{

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [website, setWebsite] = useState('');
   const [validation, setValidation] = useState(false);

//    console.log({name, email, website})

   const allfields = {name, email, website}

   const formSubmit = async (e) =>{
      e.preventDefault();

       if(!name || !email || !website){
            setValidation('ALL input fields or Required');

            return
       }

       setValidation(false)

      console.log(allfields)

    const response = await fetch('http://localhost:3001/Users',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allfields)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('All Data save on Local API Successfully')
    }else{
        alert('All Data not save on Local API')
    }

   }

    return(
        <div>
            <Header/>
               <div className="container">
                  <h3 className="mt-3">Usepost116 Component</h3>

                 <div className="shadow p-3 mb-3 mt-4">
                    <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                 </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Usepost116;