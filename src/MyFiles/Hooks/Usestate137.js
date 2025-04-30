import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import loader from "../../images/Loading-img.gif"

const Usestate137 = () =>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({status:false, msg:''});
    const [showForm, setshowForm] = useState(false);
    const [validation, setValidation] = useState(false)

    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [city, setCity] = useState('');

    const fetchApi = async (apiUrl) =>{
        setError({status:false, msg:''});
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setItem(data);
            setError({status:false, msg:''});
            setLoading(false);
            if(response.status === 404){
                throw new Error('API Response 404: Data not Found');
            }
        } catch (error) {
            console.log(error);
            setError({status:true, msg:error.message || 'something went wrong'});
            setLoading(false);
        }
    }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'Application/json'
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed to Delete User');
            }
            setItem(item.filter(eachItem=> eachItem.id !== id))
        } catch (error) {
            console.log('error message ', error.message);
        }
    }

    const handleEdit = async (id, name, email, website, city) =>{

       setEditId(id);
       setName(name);
       setEmail(email);
       setWebsite(website);
       setCity(city);
       setshowForm(true);

        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({id, name, email, website, city})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Failed to Edit User');
            }
        })
        .catch(error=>{
            console.log('Error Message', error);
        })
    }

    const handleSubmit = async () =>{

        const Alldetails ={name, email, website, address: {city}};
    
        if(!name || !email || !website || !city){
            setValidation('All input fields are required')
            return
        }
    
        setValidation(false);
    
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(Alldetails)
            })
            if(!response.ok){
                const data = await response.json();
                 throw new Error(data.message || 'Failed to Update Data');
            }
            const UPDATEUSER = item.map((eachItem)=>{
                if(eachItem.id === editId){
                    return{...eachItem, ...Alldetails}
                }else{
                    return eachItem
                }
               
            })
            setItem(UPDATEUSER);
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setCity('');
            setshowForm(false);
        } catch (error) {
            console.log(error);
        }
     }

    useEffect(()=>{
       fetchApi(URL)
    },[])

    if(loading){
        return <h3 className="text-center mt-5"><img src={loader} alt={loader} /></h3>
    }

    if(error?.status){
        return <h3 className="text-center mt-5 text-danger">{error?.msg}</h3>
    }

    return(
        <div>
            <Header/>
               <div className="container">
                  
                  {showForm && (
                  <div className="shadow p-3 mt-3 mb-3">
                     <input type="text" className="form-control mb-2" placeholder="Search User" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                     <input type="email" className="form-control mb-2" placeholder="Search Email" name="name" value={email} onChange={(e)=> setEmail(e.target.value)} />
                     <input type="text" className="form-control mb-2" placeholder="Search Website" name="website" value={website} onChange={(e)=> setWebsite(e.target.value)} />
                     <input type="text" className="form-control mb-2" placeholder="Search City" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                     {validation && <p className="text-danger">{validation}</p>}
                     <button type="submit" className="btn btn-primary" onClick={()=> handleSubmit(editId)}>Submit</button>
                  </div>
                  )}

                   <div className="row">
                      {item.map((eachItem)=>{
                         const {id, name, email, website, address:{city}} = eachItem;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-3">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <p>{city}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website, city)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                      })}
                   </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Usestate137;