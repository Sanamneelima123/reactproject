import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import loader from "../../images/Loading-img.gif"

const Usestate128 = () => {

    const [food, setFood] = useState([]);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    const fetchApi = async (apiUrl) =>{
        setLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setFood(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('API Response 404: Please check API');
            }
        } catch (error) {
            console.log(error);
            setIsError({status:true, msg: error.message || 'something went wrong'});
            setLoading(false);
        }
    }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type' : 'Application/json'
                }
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Food not deleted');
            }
            setFood(food.filter(eachFood=> eachFood.id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id, name, email, website) =>{

        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setShowForm(true);

            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body : JSON.stringify({id, name, email, website})
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error( 'Food not Edited');
                }
            })
            .catch(error=>{
                console.log(error);
            })
    }

    const handleUpdate = async () => {
        const allData = { name, email, website };
    
        if (!name || !email || !website) {
            setValidation('All input fields are required');
            return;
        }
    
        setValidation(false);
    
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allData)
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Food not updated');
            }
    
            const updatedFood = food.map((eachFood) => {
                if (eachFood.id === editId) {
                    return { ...eachFood, ...allData };
                }
                return eachFood;
            });
    
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setFood(updatedFood);
            setShowForm(false);
            
        } catch (error) {
            console.error(error);
            setValidation(error.message); // Display the error message to the user
        }
    };
    

    useEffect(()=>{
        fetchApi('https://jsonplaceholder.typicode.com/users')
    },[])

    if(loading){
        return <h3 className="text-center mt-5"><img src={loader} alt="loader" /></h3>
    }

    if(isError?.status){
        return <h3 className="text-center mt-5" style={{color:"red"}}>{isError?.msg}</h3>
    }

    return(
        <div>
            <Header/>
               <div className="container">
                  
               {showForm && (
    <div className="shadow p-3 mt-3 mb-3">
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editId); }}>
            <input type="text" className="form-control mb-2" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" className="form-control mb-2" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" className="form-control mb-2" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            {validation && <p style={{ color: 'red' }}>{validation}</p>}
            <input type="submit" className="btn btn-primary mb-2" value="Update" />
        </form>
    </div>
)}


                   <div className="row mt-3">
                      {food.map((eachFood)=>{
                        const {id, name, email, website} = eachFood;
                        return(
                            <div key={id} className="col-4 col-xs-12">
                                <div className="shadow p-3 mb-2">
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{website}</p>
                                    <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                        <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                        <button className="btn btn-primary rounded-0" onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                        <button className="btn btn-success rounded-0" onClick={()=> navigate(`/Usepost128`)}>Post</button>
                                        <NavLink className="btn btn-warning rounded-0" to={`/Usestate128/${id}`}>Details</NavLink>
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

export default Usestate128;