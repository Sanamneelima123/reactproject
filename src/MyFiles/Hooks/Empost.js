import React, { useState } from "react";
import Header from "../../Components/Header"
import Footer from "../../Components/Footer";

const Empost = () =>{

   const [month, setMonth] = useState('');
   const [dataset1, setDataset1] = useState('');
   const [dataset2, setDataset2] = useState('');
   const [dataset3, setDataset3] = useState('');
   const [validation, setValidation] = useState(false)

//    console.log({month, dataset1, dataset2, dataset3})
   const allFields = {month, dataset1, dataset2, dataset3}

   const formSubmit = async (e) =>{
      e.preventDefault();
      if(!month || !dataset1 || !dataset2 || !dataset3){
        setValidation('All fileds or Required')
        return
      }
      setValidation(false)

      const response = await fetch(`http://localhost:3001/Employes`,{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allFields)
      })
      if(response.ok){
        alert('Employee New User Adding Successfully!')
        setMonth('');
        setDataset1('');
        setDataset2('');
        setDataset3('');
      }else{
        alert('Employee New User Adding Unsuccessfully!')
      }
   }

    return(

        <div>
            <Header/>
             <div className="container">
                 {/* <h3 className="mt-4 mb-3">Empost Employes</h3> */}

                <div className="row shadow p-3 mt-5 mb-3">
                    <h3 className="mb-3" style={{color:'#12abdb'}}>Employee Register Form</h3>
                 <form onSubmit={formSubmit}>
                    <input type="text" className="form-control mb-2" name="month" onChange={(e)=> setMonth(e.target.value)}  />
                    <input type="number" className="form-control mb-2" name="dataset1" onChange={(e)=> setDataset1(e.target.value)} />
                    <input type="number" className="form-control mb-2" name="dataset2" onChange={(e)=> setDataset2(e.target.value)} />
                    <input type="number" className="form-control mb-2" name="dataset3" onChange={(e)=> setDataset3(e.target.value)} />
                    {validation && <p className="text-danger">{validation}</p>}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <input type="submit" className="btn btn-primary rounded-0" />
                    </div>
                 </form>
                 </div>

             </div>
            <Footer/>
        </div>
    )
}

export default Empost;