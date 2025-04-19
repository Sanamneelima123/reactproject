import React, { useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { useNavigate } from "react-router-dom";

const Userpost23 = () =>{

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [errorForm, setErrorForm] = useState(false);

  const navigate = useNavigate();

//   console.log({name, email, website})

 const allData = {name, email, website}

 const formSubmit = async (e) =>{
    e.preventDefault();

    if(!name || !email || !website){
        setErrorForm('ALL fields or RFequired');
        return
    }
    setErrorForm(false);

    console.log(allData);

    const responsive = await fetch('http://localhost:3001/Users',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allData)
    })
    if(responsive.ok){
        setName('');
        setEmail('');
        setWebsite('');
        alert('All Data save on Local API Successfully')
    }else{
        alert('ALL Data not save on Local API')
    }

 }

    return(
        <div>
            <Header/>
               <div className="container">

                  <h3 className="mt-4">Userpost23 Component</h3>

                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary rounded-0" onClick={()=> navigate(`/Usereducer23`)}>Go To Usereducer23</button>
                </div>

                <div className="shadow p-3 mt-4">
                    <form onSubmit={formSubmit}>
                        <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                         {errorForm && <p style={{color:'red'}}>{errorForm}</p>}
                        <input type="submit" className="btn btn-primary mb-2" />
                    </form>
                </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Userpost23;