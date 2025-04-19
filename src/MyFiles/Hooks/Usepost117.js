import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost117 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setwebsite] = useState('');
    const [validation, setValidation] = useState(false)

    // console.log({name, email, website})

    const allFields = {name, email, website}

    const formSubmit = async (e) =>{
        e.preventDefault();

         if(!name || !email || !website){
            setValidation('All input fields or Required')

            return
         }

         setValidation(false)

        console.log(allFields);

       const response = await fetch('http://localhost:3001/Users',{
          method:'POST',
          headers:{
            'Content-Type' : 'Application/json'
          },
          body: JSON.stringify(allFields)
       })
       if(response.ok){
          setName('');
          setEmail('');
          setwebsite('');
          alert('All Data save on Local API Successfully')
       }else{
        alert('All Data not save on Local API')
       }

    }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-4 mb-3">Usepost117 Component</h3>

                  <div className="shadow p-3 mt-3">
                    <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setwebsite(e.target.value)} />
                         {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                  </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Usepost117;