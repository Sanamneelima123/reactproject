import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost1 = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [formError, setFormError] = useState(false);

    const alldata = { name, email, website };

    const submitform = async (e) => {
        e.preventDefault();

        if (!name || !email || !website) {
            setFormError('ALL Fields are Required');
            return;
        }

        setFormError(false);

        console.log(alldata);

        const response = await fetch('http://localhost:3333/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Corrected MIME type
            },
            body: JSON.stringify(alldata) // Removed unnecessary object wrapping
        });

        if (response.ok) {
            setName('');
            setEmail('');
            setWebsite('');
            alert('Form submitted successfully!');
        } else {
            alert('Form submission failed!');
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="shadow p-3 mt-5">
                    <form onSubmit={submitform}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        {formError && <p className="" style={{ color: 'red' }}>{formError}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Usepost1;
