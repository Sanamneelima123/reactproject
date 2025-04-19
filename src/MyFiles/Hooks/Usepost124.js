import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { toast, ToastContainer } from 'react-toastify'; // Import the toast function
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const Usepost124 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false)

    // console.log({name, email, website})

    const myFields = ({name, email, website})

    const formSubmit = async (e) =>{
        e.preventDefault();

        if(!name || !email || !website){
            setValidation('All input fields or Required');
            toast.error('All input fields are required');
            return
        }

        setValidation(false)

        console.log(myFields);

        try {
            const response = await fetch(`http://localhost:3001/Users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myFields)
            });

            if (response.ok) {
                setName('');
                setEmail('');
                setWebsite('');
                toast.success('Data saved to API successfully'); // Show success toast
            } else {
                toast.error('Failed to save data to API'); // Show error toast
            }
        } catch (error) {
            toast.error('An unexpected error occurred'); // Show error toast for network issues
        }

    }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-5">Usepost124 Component</h3>

                   <div className="shadow p-3 mt-3">
                      <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-success rounded-0 mb-2" />
                      </form>
                   </div>

                   <ToastContainer/>

               </div>
            <Footer/>
        </div>
    )
}

export default Usepost124;