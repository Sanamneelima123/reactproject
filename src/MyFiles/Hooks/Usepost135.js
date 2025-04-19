import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Usepost135 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);

    // console.log({name, email, website});

    const allFields={name, email, website};

    const formSubmit = async (e) =>{
        e.preventDefault();

        console.log(allFields);

        if(!name || !email || !website){
            setValidation('All Fields or Required');
            return
        }

        setValidation(false)

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
            setWebsite('');
            toast.success('Data saved to Local API successfully');
        }else{
            toast.error('Data not save on Local API');
        }

    }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-3 mb-3">Usepost135</h3>

                   <div className="shadow p-3 mb-3">
                      <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p className="text-danger">{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                      </form>
                   </div>

               </div>
               <ToastContainer/>
            <Footer/>
        </div>
    )
}

export default Usepost135;