import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { toast, ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css';

const Usepost122 = () =>{

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [validation, setValidation] = useState(false)
 
//  console.log({name, email, website})

const formData = {name, email, website}

const formSaubmit = async (e) =>{
    e.preventDefault();
    if(!name || !email || !website){
        setValidation('All input fields or Required');
        return;
    }

    setValidation(false);

    console.log(formData);

    try {
        const response = await fetch(`http://localhost:3001/Users`,{
            method:'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        if(response.ok){
            setName('');
            setEmail('');
            setWebsite('');
            toast.success('Data Submitted Successfully');
        }else{
            toast.error('Data Submission Failed');
        }
    } catch (error) {
        
    }

}

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-5">Usepost122 Component</h3>

                   <div className="shadow p-3">
                       <form onSubmit={formSaubmit}>
                          <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                          <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                          <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                          {validation && <p style={{color:'red'}}>{validation}</p>}
                          <input type="submit" className="btn btn-primary rounded-0 mb-2" />
                       </form>
                   </div>

                   <ToastContainer />
               </div>
            <Footer/>
        </div>
    )
}

export default Usepost122;