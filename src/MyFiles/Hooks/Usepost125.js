import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Usepost125 = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState(''); 
    const [validation, setValidation] = useState(false);

    // console.log({name, email, website});

    const allDetails = { name, email, website };

    const formSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !website){
            setValidation('All input fields or Required');
            return
        }

        setValidation(false);

        console.log(allDetails);

        try {
            const response = await fetch(`http://localhost:3001/Users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allDetails)
            });
            if (response.ok) {
                setName('');
                setEmail('');
                setWebsite('');
                toast.success('Data saved to API successfully'); // Show success toast
            } else {
                toast.error('Data not saved to API'); // Show error toast
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred'); // Show error toast
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <h3 className="mt-5">Usepost125 Component</h3>

                <div className="shadow p-3 mt-3 ">
                    <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        {validation && <p style={{ color: 'red' }}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                </div>

            </div>
            <Footer />
            <ToastContainer /> {/* Add ToastContainer to the component */}
        </div>
    );
}

export default Usepost125;
