import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from '../../images/Loading-img.gif';

const Usesatet88 = () => {
    const URL = "https://jsonplaceholder.typicode.com/users";
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({status:false, msg:''});
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchApi = async (apiUrl) => {
        setLoading(true);
        setIsError({status:false, msg:''});
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setList(data);
            setLoading(false);
            setIsError({status:false, msg:''});
            if(response.status === 404){
                throw new Error('Response Failed 404 API')
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setIsError({status:true, msg: error.message || 'something went wrong'});
        }
    }

    // const handleDelete = (id) => {
    //     const delteItem = list.filter((item)=>{
    //         return item.id !== id
    //     })
    //     setList(delteItem)
    // }

    const handleDelete = async (id) =>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'Application/json'
                },
            });
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message || 'Failed List Delete')
            }
            setList(list.filter(item=> item.id !== id));
        } catch (error) {
            console.log('Error Message', error);
        }
    }

    const handleEdit = async (id, name, email, website, address) => {
        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setAddress(address); // Extracting city from the address object
        setShowForm(true);
         
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({id, name, email, website, address})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Failed List Edit');
            }
        })
        .catch(error=>{
            console.log('Error Message', error);
        })

    }
    
    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: editId,
                    name: name,
                    email: email,
                    website: website,
                    address: {
                        city: address
                    }
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update list item');
            }
    
            const updatedItem = await response.json();
    
            const updatedList = list.map((item) => {
                if (item.id === editId) {
                    return {
                        ...item,
                        name: updatedItem.name,
                        email: updatedItem.email,
                        website: updatedItem.website,
                        address: {
                            ...item.address,
                            city: updatedItem.address.city
                        }
                    };
                }
                return item;
            });
    
            setList(updatedList);
            setEditId(null);
            setName('');
            setEmail('');
            setWebsite('');
            setAddress('');
            setShowForm(false);
        } catch (error) {
            console.error('Error updating list item:', error);
        }
    }
    

    useEffect(() => {
        fetchApi(URL);
    }, []);

    const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <h3 className="text-center"><img src={Loader} alt="Loading" /></h3>;
    }

    if(isError?.status){
        return <h3 className="text-center mt-5" style={{color:'red'}}>{isError?.msg}</h3>
    }

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h3>useState88 Component</h3>
                {showForm && (
                    <div className="shadow p-3 mt-3 mb-3">
                        <h4 className="mb-3">Update form Data</h4>
                        <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type="text" className="form-control mb-2" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
                        <input type="text" className="form-control mb-2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                        <input type="submit" className="btn btn-primary mb-2" onClick={handleUpdate} value="Update" />
                    </div>
                )}
                <div className="row mt-4">
                    <div className="col-md-12">
                        <input type="text" className="form-control" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name" />
                    </div>
                </div>
                <div className="row mt-4">
                    {filteredList.map((item) => (
                        <div key={item.id} className="col-md-4 col-sm-12">
                            <div className="shadow p-3 mb-3">
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p>{item.website}</p>
                                <p>{item.address.city}</p>
                                <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                    <button className="btn btn-danger rounded-0" onClick={() => handleDelete(item.id)}>Delete</button>
                                    <button className="btn btn-info rounded-0" onClick={() => handleEdit(item.id, item.name, item.email, item.website, item.address.city)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Usesatet88;
