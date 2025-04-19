import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost119 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false)

    // console.log({name, email, website})

    const allfiles = {name, email, website}

    const formSubmit = async (e) =>{
        e.preventDefault();

        if(!name || !email || !website){
            setValidation('All input fields or Required')

            return
        }

        setValidation(false)

        console.log(allfiles)

        try {
            const response = await fetch(`http://localhost:3001/Users`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allfiles)
            })
            if(response.ok){
                setName('');
                setEmail('');
                setWebsite('');
                alert('Data save on Local API Successfully')
            }else{
                alert('Data not save on Local API')
            }
        } catch (error) {
            
        }
        
    }

    return(
        <div>
            <Header/>
                <div className="container">
                    <h3 className="mt-3">Usepost119 Component</h3>

                   <div className="shadow p-3 mt-4 mb-3">
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

export default Usepost119;