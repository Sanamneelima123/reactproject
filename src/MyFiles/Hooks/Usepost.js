import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [errorform, setErrorForm] = useState(false);

    const allData = { name, email, website };

    const formsubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !website) {
            setErrorForm('All inputs are required');
            return;
        }

        setErrorForm(false); // Reset error message

        console.log(allData);

        const response = await fetch('http://localhost:3333/Users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({allData}),
        });

        if (response.ok) {
            setName('');
            setEmail('');
            setWebsite('');
            // Show alert message
            alert('Form submitted successfully!');
        } else {
            // Handle error cases if needed
            alert('Form submission failed!');
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h3 className="mt-3 mb-3">Usepost Component</h3>

                <div className="shadow p-3 mt-4 mb-4">
                    <form onSubmit={formsubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        {errorform && <p style={{ color: "red" }}>{errorform}</p>}
                        <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Usepost;
