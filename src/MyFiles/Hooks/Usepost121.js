import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Usepost121 = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    // console.log({name, email, website});

    const allFields = {name, email, website};

    const formSubmit = async (e) =>{
        e.preventDefault();

        if(!name || !email || !website){
            setValidation('All input fields or Required');
            return;
        }

        setValidation(false);

        console.log(allFields);

        try {
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
                alert('Data Submitted Successfully');
            }else{
                alert('Data Submission Failed');
            }
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-5">Usepost121 Component</h3>

                   <div className="shadow p-3">
                      <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" value={"Submit"} className="btn btn-primary rounded-0" />
                        <button className="btn btn-danger rounded-0" onClick={()=> navigate(`/Usestate121`)}>Go Back</button>
                      </form>
                   </div>

               </div>
            <Footer/>
        </div>
    )
};

export default Usepost121;