import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "../Hooks/Usestate.css";
import loader from '../../images/Loading-img.gif';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Usestate11 = () => {
  const URL = "https://jsonplaceholder.typicode.com/users";

  const [list, setList] = useState([]);
  const [editid,setEditId] = useState(null);
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchapi = async (apiurl) => {
    setLoading(true);
    try {
      const response = await fetch(apiurl);
      const data = await response.json(); // await the JSON parsing process
      setList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) =>{
    const deleteList = list.filter((eachList)=>{
        return eachList.id !== id
    })
      setList(deleteList);
  }

  const handleEdit = (id, name, email, website) =>{
       setEditId(id);
       setName(name);
       setEmail(email);
       setWebsite(website);
       setShowEditForm(true)
  }

  const handleUpdate = () => {
    // Simple form validation
    if (!name || !email || !website) {
      toast.error('Please fill in all fields.');
      return;
    }

     // Email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
  
    // Your update logic here
  
    // Update the list with the edited data
    const updateData = list.map((eachList) => {
      if (eachList.id === editid) {
        return { ...eachList, name, email, website };
      } else {
        return eachList;
      }
    });
  
    setList(updateData);
    setEditId(null);
    setName('');
    setEmail('');
    setWebsite('');
    setShowEditForm(false);
  
    toast.success('Form updated successfully.');
  };

  useEffect(() => {
    fetchapi(URL);
}, []);

  if(loading){
    return <h4 className="text-center mt-5"><img src={loader} alt={loader} /></h4>
  }


  return (
    <div>
      <Header />
      <div className="container">

        {showEditForm && (
       <div className="shadow p-3 mb-3 mt-3">
          <h4 className="mb-3">Updating the Form User Details</h4>
          <input type="text" className="form-control mb-2" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} required />
          <input type="email" className="form-control mb-2" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <input type="text" className="form-control mb-2" id="website" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
          <input type="submit" className="btn btn-primary mb-2" onClick={()=> handleUpdate(editid)}/>
       </div>
       )}
       <ToastContainer />
    
       {!loading &&
        <div className="row mt-5">
          {list.map((eachList) => {
            const { id, name, email, website } = eachList;
            return (
              <div key={id} className="col-12 col-md-4">
                <div className="shadow p-3 mb-3 border-r">
                  <p>{name}</p>
                  <p>{email}</p>
                  <p>{website}</p>
                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                        <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                        <Link className='btn btn-primary rounded-0' to={`/Usestate11/${eachList.id}`}>Details</Link>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
        }


      </div>
      <Footer />
    </div>
  );
};

export default Usestate11;
