import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost2 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [fromError, setFormError] = useState(false)

    // console.log(name, email, website);

    const allData = {name, email, website};

    const submitForm = async (e) =>{
        e.preventDefault();

        if(!name || !email || !website){
            setFormError('ALL Input Fields or Required');

            return;
        }

         // Email validation using regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setFormError('Please enter a valid email address');
                return false; // Indicates validation failure
            }

        setFormError(false);

        console.log(allData);

        const responsive = await fetch('http://localhost:3333/Users',{
            method:'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(allData)
        })
        if(responsive.ok){
            setName('');
            setEmail('');
            setWebsite('');
            alert('Data save Successfully');
        }else{
            alert('Data Failed Successfully')
        }
    }

    return(
        <div>
            <Header/>
              <div className="container">
                  <div className="shadow p-3 mt-4 mb-4">
                     <form onSubmit={submitForm}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {fromError && <p style={{color:'red'}}>{fromError}</p>}
                        <input type="submit" className="btn btn-primary rounded-0 mb-2" />
                     </form>
                  </div>
              </div>
            <Footer/>
        </div>
    )
}

export default Usepost2;