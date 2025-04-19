import React,{useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestate4 = () =>{

    const newObj = {
        name: "Pavan",
        email: "Balu Naidu",
        password: 28
    };

   const [data, setData] = useState([newObj]);
   const [name,setFirstname] = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');

//    const namechange = (e) =>{
//     // console.log(e.target.value)
//     setFirstname(e.target.value);
//    }

//    const changeemail = (e) =>{
//     setEmail(e.target.value);
//    }

//    const changepassword = (e) =>{
//     setPassword(e.target.value);
//    }

// const handleall= (e,  name) =>{
//   if(name === "firstName"){
//     setFirstname(e.target.value);
//   }else if(name === "email"){
//     setEmail(e.target.value);
//   }else if(name === "password"){
//     setPassword(e.target.value)
//   }
// }

const handleDelete = (id) => {
  const deleteData = data.filter((eachData)=>{
    return eachData.id !== id
  })
  setData(deleteData);
};

const handleSubmit = (e) => {
    e.preventDefault();
  
    const formObj = {
      name: name,
      email: email,
      password: password
    };
  
    console.log(formObj);
  
    // Use the spread operator to add the new form data to the existing data array
    setData([...data, formObj]);
  
    // Optionally, clear the form fields after submission
    setFirstname('');
    setEmail('');
    setPassword('');
  };

    return(
        <>
          <Header/>
           <div className="container">
              <h3 className="mt-5">Form Handling</h3>

              <div className="row forms">
              <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                           <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e)=>setFirstname(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            {/* <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e)=>handleall(e, "email")} /> */}
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
              </div>

              <div className="row ">
                  {
                     data.map((eachData) => {
                      const {id, name, email, password} = eachData;
                        return (
                          <div key={id} className="col-4 mt-3">
                            <div className="shadow p-3">
                            <p>{name}</p>
                            <p>{email}</p>
                            <p>{password}</p>
                            <button className="btn btn-danger" onClick={()=> handleDelete(id)}>Delete</button>
                            </div>
                          </div>
                        );
                      })
                    }
              </div>

           </div>

           
         <Footer/>
        </>
    )
}

export default Usestate4;