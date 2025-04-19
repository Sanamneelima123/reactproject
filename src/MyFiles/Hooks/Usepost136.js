import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Usepost136 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);

    // console.log({name, email, password, website});


    const allFields = {name, email, password, website};

const formSubmit = async (e)=>{
    e.preventDefault();

    if(!name || !email || !password || !website){
        setValidation('All Fields or Required');
        return
    }

    setValidation(false);

    const response = await fetch(`http://localhost:3001/Users`,{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allFields)
    })
    if(response.ok){
        setName('');
        setEmail('');
        setPassword('');
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
                   <h3 className="mt-3 mb-3">Usepost136 Component</h3>

                   <div className="shadow p-3 mb-2">
                      <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="search name" />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="search email" />
                        <input type="password" className="form-control mb-2" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="search password" />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} placeholder="search website" />
                        {validation && <span className="text-danger">{validation}</span>}
                        <input type="submit" className="btn btn-primary mb-2"/>
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

export default Usepost136;