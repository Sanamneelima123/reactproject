import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Usepost129 = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);
    

    const navigate = useNavigate();

    // console.log({name, email, website})

    const UserData = {name, email, website};

    const formSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        if (!name || !email || !website) {
            setValidation('All input fields are required');
            return;
        }
    
        setValidation(false);
    
        // Log UserDta to check its content
        console.log("Submitting Data: ", UserData);
    
        try {
            const response = await fetch(`http://localhost:3001/Users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(UserData)
            });
    
            if (response.ok) {
                // Clear the form fields
                setName('');
                setEmail('');
                setWebsite('');

                // Navigate to Login
                navigate('/Login');
    
                // Show success toast
                toast.success('Data saved to Local API successfully');
                
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            // Handle errors (network issues, response errors)
            console.error("Error: ", error);
            toast.error('Data not saved to Local API');
        }
    };
    

    return(
        <div>
            <Header/>
               <div className="container">
                   <h4 className="mt-4 mb-3" style={{color:"#0070ad"}}>Usepost129</h4>

                   <div className="shadow p-3 mt-4 ">
                    <form className="" onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Name"/>
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email"/>
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} placeholder="Enter Website"/>
                        {validation && <p style={{color:"red"}} className="">{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                    <div className="d-grid gap-0 d-md-flex justify-content-md-end mt-4">
                       <button className="btn btn-info rounded-0" onClick={()=> navigate(`/Usestate129`)}>Go Back</button>
                    </div>
                   </div>


               </div>
               <ToastContainer/>
            <Footer/>
        </div>
    )
}

export default Usepost129;