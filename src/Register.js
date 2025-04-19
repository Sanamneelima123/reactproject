import React, { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [password, setPassword] = useState();

    // console.log({name, email, website, password});
    
     const allData = {name, email, website, password};
    const formSubmit = async (e) => {
        e.preventDefault();

         const response = await fetch('http://localhost:3001/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(allData)
        });
        if(response.ok){
            setName('');
            setEmail('');
            setWebsite('');
            setPassword('');
            alert("Form Data Submitted Successfully");
            navigate('/login');
        }else{
            alert("Form Submission Failed");
        }

        console.log("Form Submitted");
    }

    const navigate = useNavigate();

    return(
    <div>
        <Header/>
           <div className="container">
              

                <div className="col-6 offset-3 shadow p-3 mt-5" id="form_data">
                    <form className="" onSubmit={formSubmit}>
                      <h4 className="mb-3" style={{color:'blue'}}>Register Component</h4>
                        <input type="text" className="form-control mb-2" name="name" id="name" placeholder="Enter Your Name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" id="email" placeholder="Enter Your Email" value={email} onChange={(e)=> setEmail(e.target.value)} /> 
                        <input type="text" className="form-control mb-2" name="website" id="website" placeholder="Enter Your Website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        <input type="password" className="form-control mb-2" name="password" id="password" placeholder="Enter Your Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                        <input type="submit" className="btn btn-primary rounded-0 btn-block" value="Register" />
                        <button className="btn btn-success rounded-0" style={{color:'white'}} onClick={() => navigate('/login')}>Go To Login</button>
                      </div>
                    </form>
                </div>

              
           </div>
        <Footer/>
    </div>
    )
};

export default Register;