import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useNavigate } from "react-router-dom";

const Usepost131 = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false)

    const Navigation = useNavigate();

    console.log({name, email, website});

    const UserDetails = {name, email, website};

    const formSubmit = async (e) =>{
        e.preventDefault();
        console.log(UserDetails);

        if(!name || !email || !website){
            setValidation('ALL input fields or Required');
            return
        }

        setValidation(false);

        const response = await fetch('http://localhost:3001/Users',{
            method:'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(UserDetails)
        });
        if(response.ok){
            setName('');
            setEmail('');
            setWebsite('');
            toast.success('🦄 Data saved on API successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: "slide",  // Slide is one of the default transitions
            });
            
        }else{
            toast.error('🦄 Data Not saved on API', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: "slide",  // Slide is one of the default transitions
            });
        }

    }

    return(
        <div>
            <Header/>
                 <div className="container">
                     <h3 className="mt-3 mb-3">Usepost131 Component</h3>

                     <div className="shadow p-3">
                        <form onSubmit={formSubmit}>
                            <h4 style={{color:'#12abdb'}}>User Form</h4>
                            <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                            <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                            <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                            {validation && <p className="text-danger">{validation}</p>}
                            <button className="btn btn-primary" onClick={()=> Navigation(`/Usestate131`)}>Submit</button>
                        </form>
                     </div>

                 </div>
                 <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition="slide" // Use a valid transition type like 'slide'
                />
            <Footer/>
        </div>
    )
}

export default Usepost131