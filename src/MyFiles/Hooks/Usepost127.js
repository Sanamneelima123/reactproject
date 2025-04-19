import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useNavigate } from "react-router-dom";

const Usepost127 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    // console.log({name, email, website, password});

    const allFields = {name, email, website, password}

    const formSubmit = async (e) =>{
        e.preventDefault();
        if(!name || !email || !website || !password){
            setValidation('Please fill all the fields');
            return
        }
        setValidation(false);
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
          setWebsite('');
          setPassword('');
          toast.success('Form Data Submitted Successfully');
       }else{
          toast.error('Form Submission Failed');
       }

    }

    return(
        <div>
            <Header/>
                 <div className="container">
                     <h3 className="mt-2">Usepost127 Component</h3>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                       <button className="btn btn-info rounded-0 justify-content-end" onClick={() => navigate(`/Usestate127`)}>Go Back</button>
                    </div>

                    <div className="shadow p-3 mt-4">
                        <form onSubmit={formSubmit}>
                            <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                            <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                            <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                            <input type="text" className="form-control mb-2" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                            {validation && <p style={{color:'red'}}>{validation}</p>}
                            <input type="submit" className="btn btn-primary mb-2" />
                        </form>
                    </div>

                 </div>
            <Footer/>
            <ToastContainer />
        </div>
    )
}

export default Usepost127;
