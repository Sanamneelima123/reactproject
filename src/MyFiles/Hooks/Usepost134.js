import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost134 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);

    // console.log({name, email, website})

    const allInputs = {name, email, website};

    const formSubmit = async (e) =>{
        e.preventDefault();
        console.log(allInputs);

        if(!name || !email || !website){
             setValidation('All input fields or Required');
             return
        }

        setValidation(false);

        try {
            const response = await fetch(`http://localhost:3001/Users`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allInputs)
            })
            if(response.ok){
                setName('');
                setEmail('');
                setWebsite('');
                alert('Data save to API Successfully');
            }
        } catch (error) {
                alert('Data not save to API');
        }

    }

    return(
        <div className="">
            <Header/>
             <div className="container">
                <h3 className="mt-3 mb-3">Usepost134</h3>

                <div className="form shadow p-3">
                    <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p className="text-danger">{validation}</p>}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

             </div>
            <Footer/>
        </div>
    )
}

export default Usepost134;