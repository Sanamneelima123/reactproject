import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { toast, ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Usepost123 = () =>{

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [website, setWebsite] = useState('');
 const [validation, setValidation] = useState(false);

 const navigate = useNavigate();

//  console.log({name, email, website})

const Mydetails = {name, email,website}

 const formSubmit = async (e) =>{
    e.preventDefault();

    if(!name || !email || !website){
        setValidation('All input fields or Required');
        return;
    }

    setValidation(false);

    console.log(Mydetails);

    const response = await fetch(`http://localhost:3001/Users`,{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(Mydetails)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setWebsite('');
        toast.success('Data save to API Successfully');
    }else{
        toast.error('Data not save to API')
    }

 }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-5">Usepost123 Component</h3>

                   <div className="shadow p-3">
                       <form onSubmit={formSubmit}>
                           <input type="text" className="form-control mb-2" value={name} onChange={(e)=> setName(e.target.value)} />
                           <input type="email" className="form-control mb-2" value={email} onChange={(e)=> setEmail(e.target.value)} />
                           <input type="text" className="form-control mb-2" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                           {validation && <p style={{color:'red'}}>{validation}</p>}
                           <input type="submit" className="btn btn-success mb-2" />
                       </form>
                       <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                          <button className="btn btn-info rounded-0" onClick={()=> navigate(`/Usestate123`)}>Go Back</button>
                       </div>
                   </div>
                   <ToastContainer />
               </div>
            <Footer/>
        </div>
    )
}

export default Usepost123;