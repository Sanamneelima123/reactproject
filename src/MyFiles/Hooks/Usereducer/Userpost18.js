import React, { useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Userpost18 = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    // console.log({name, email, website})

    const allData = {name, email, website}

    const formSubmit = async (e) =>{
       e.preventDefault();

    if(!name || !email || !website){

        setShowError('ALL Fields or Required');

        return ;
    }

       setShowError(false);

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
        alert('Data save to API Successfully');
      }else{
        alert('Data not save to API')
      }

    }

    return(
        <div>
            <Header/>
              <div className="container">
                <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer18`)}>Go Back</button>
                 <div className="shadow p-3 mb-4 mt-4">
                    <form onSubmit={formSubmit}>
                    <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                    {showError && <p style={{color:'red'}}>{showError}</p>}
                    <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                 </div>
              </div>
            <Footer/>
        </div>
    )
}

export default Userpost18;