import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Loader from '../../images/Loading-img.gif'

const Usestate15 = () =>{

    const URL = 'https://jsonplaceholder.typicode.com/users';

    const [newData,setNewData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [website, setWebsite] = useState();
    const [loading, setLoading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false)

    const apiFetch = async (apiURL)=>{
            setLoading(true);
        try {
            const responsive = await fetch(apiURL);
            const data = await responsive.json();
            setNewData(data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (id) =>{
        const deleteData = newData.filter((eachData)=>{
            return eachData.id !== id
        })
        setNewData(deleteData)
    }

    const handleEdit = (id, name, email, website) =>{
        setEditId(id);
        setName(name);
        setEmail(email);
        setWebsite(website);
        setShowEditForm(true)
    }

    const upDateData = () =>{
        const Todos = newData.map((eachData)=>{
            if(eachData.id === editId){
                return{...eachData, name, email, website}
            }else{
                return eachData
            }
        })
        setNewData(Todos);
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
        setShowEditForm(false)
    }

    useEffect(()=>{
        apiFetch(URL)
    },[])

    if(loading){
        return <h3 className='text-center mt-5'><img src={Loader} alt={Loader} /></h3>
    }

    return(
        <div>
            <Header/>
                 <div className='container'>

                   {showEditForm && (
                    <div className='shadow p-3 mb-3 mt-5'>
                        <h5 className='mb-3 '>Data Update Form</h5>
                        <input type='text' className='from-control col-12 mb-2' id='name' value={name} onChange={(e)=> setName(e.target.value)} />
                        <input type='email' className='from-control col-12 mb-2' id='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <input type='text' className='from-control col-12 mb-2' id='website' value={website} onChange={(e)=> setWebsite(e.target.value)} />
                        <input type='submit' className='btn btn-primary col-12 mb-2' onClick={()=> upDateData(editId)}/>
                    </div>
                    )}
                  
                  {!loading &&
                    <div className='row mt-5'>
                        {
                            newData.map((eachData)=>{
                                const {id, name, email, website} = eachData;
                                return(
                                    <div key={id} className='col-md-4 col-sm-6 col-12'>
                                        <div className='shadow p-3 mb-3'>
                                            <p>{name}</p>
                                            <p>{email}</p>
                                            <p>{website}</p>
                                            <div className='d-grid gap-0 d-md-flex justify-content-md-end'>
                                                <button className='btn btn-danger rounded-0' onClick={()=> handleDelete(id)}>Delete</button>
                                                <button className='btn btn-info rounded-0' onClick={()=> handleEdit(id, name, email, website)}>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    }

                 </div>
            <Footer/>
        </div>
    )
}

export default Usestate15;