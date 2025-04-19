import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usepost130 = () => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [website, setWebsite] = useState('');

   console.log({name, email, website})

   const AllData = {name, email, website}

   const formSubmit = async (e) =>{
       e.preventDefault();
       console.log(AllData);

       const response = await fetch('http://localhost:3001/Users',{
          method:'POST',
          headers:{
               'Content-Type' : 'Application/json'
          },
          body : JSON.stringify(AllData)
       });
       if(response.ok){
          setName('');
          setEmail('');
          setWebsite('');
          alert('Data save to API Successfully');
       }else{
          alert('Data not save to API');
       }

   }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-3 mb-3">Usepost130</h3>

                   <form onSubmit={formSubmit}>
                       <input type="text" placeholder="Name" className="form-control mb-3" value={name} onChange={(e)=> setName(e.target.value)} />
                       <input type="text" placeholder="Email" className="form-control mb-3" value={email} onChange={(e)=> setEmail(e.target.value)} />
                       <input type="text" placeholder="Website" className="form-control mb-3" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                       <button type="submit" className="btn btn-primary rounded-0">Submit</button>
                   </form>

               </div>
            <Footer/>
        </div>
    )
}

export default Usepost130;