import React, { useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Userpost25 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    // console.log({name, email, website})

    const allData = {name, email, website}

    const formSubmit = async (e) =>{
        e.preventDefault();

        if(!name || !email || !website){
            setValidation('ALL input fields or Required');

            return
        }

        setValidation(false);

        console.log(allData);

        const response = await fetch('http://localhost:3001/Users',{
            method:'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(allData)
        })
        if(response.ok){
            setName('');
            setEmail('');
            setWebsite('');
            alert('ALL Data save on local API Successfully')
        }else{
            alert('All Data not save on local API')
        }

    }

    return(
        <div>
            <Header/>
                <div className="container">
                    <h3 className="mt-4">Userpost25 Component</h3>

                    <div className="d-grid gap-0 mt-3 mb-2 d-md-flex justify-content-md-end">
                       <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer25`)} >Go Back</button>
                    </div>

                   <div className="shadow p-3 mt-2 mb-2">
                       <form onSubmit={formSubmit}>
                          <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                          <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                          <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                          {validation && <p style={{color:'red'}}>{validation}</p>}
                          <input type="submit" className="btn btn-primary mb-2" />
                       </form>
                   </div>

                </div>
            <Footer/>
        </div>
    )
}

export default Userpost25;