import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Loader from '../../images/Loading-img.gif'
import { Link, useNavigate } from "react-router-dom";

const Usestate66 = () =>{

 const URL='https://jsonplaceholder.typicode.com/photos';

 const [userPhotos, setUserPhotos] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState({status:false, msg:''});
 const [isEdit, setEditId] = useState(null);
 const [title, setTitle] = useState('');
 const [url, setUrl] = useState('');
 const [thumbnailUrl, setThumbnailUrl] = useState('');
 const [showForm, setShowForm] = useState(false);
 const [validation, setValidation] = useState(false);

 const navigate = useNavigate();
 

 const fetchApi = async (apiUrl)=>{
    setIsLoading(true);
    setIsError({status:false, msg:''});
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserPhotos(data);
        setIsLoading(false);
        setIsError({status:false, msg:''});
        if(response.status === 404){
            throw new Error('data not found')
        }
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError({status:true, msg: isError.message || 'something went wrong'});
    }
 }

//  const handleDelete = (id) =>{
//     const deletePhoto = userPhotos.filter((eachPhoto)=>{
//         return eachPhoto.id !== id
//     })
//     setUserPhotos(deletePhoto);
//  }

const handleDelete = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application.json'
            }
        });
        if(!response.ok){
            const data = await response.json();
            throw new Error(data.message || 'failed delete user');
        }
        setUserPhotos(userPhotos.filter(eachPhoto => eachPhoto.id !== id))
    } catch (error) {
        console.log('deleting user data', error.message);
    }
}

 const handleEdit = async (id, title, url, thumbnailUrl) =>{
    setEditId(id);
    setTitle(title);
    setUrl(url);
    setThumbnailUrl(thumbnailUrl);
    setShowForm(true);
    

    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({id,title,url,thumbnailUrl})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update data');
        }
        // Handle successful response if needed
    })
    .catch(error=>{
        console.log('Error Message ', error);
    })
 }

 const updateData = async () =>{
    const allData = {
        title:title,
        url:url,
        thumbnailUrl:thumbnailUrl
    }

    if(!title.trim() || !url.trim() || !thumbnailUrl.trim()){
        setValidation('All input fields or Required')
        return
    }

    setValidation(false)

    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${isEdit}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify(allData)
    })

    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message || 'Failed to update data');
    }

    const Todos = userPhotos.map((eachPhoto)=>{
        if(eachPhoto.id === isEdit){
            return{...eachPhoto, ...allData}
        }else{
            return eachPhoto
        }
    })
    setUserPhotos(Todos);
    setEditId(null);
    setTitle('');
    setUrl('');
    setThumbnailUrl('');
    setShowForm(false)
 }

 useEffect(()=>{
    fetchApi(URL);
 },[]);

 if(isLoading){
    return <h3 className="text-center mt-5"><img src={Loader} alt={Loader} /></h3>
 }

 if(isError?.status){
    return <h3 className="text-center mt-5" style={{color:'red'}}>{isError.msg}</h3>
 }

    return(
        <div>
            <Header/>
                <div className="container">

                    {showForm && (
                    <div className="shadow p-3 mt-3 mb-3">
                        <input type="text" className="form-control mb-2" id="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
                        <input type="text" className="form-control mb-2" id="url" value={url} onChange={(e)=> setUrl(e.target.value)} />
                        <input type="text" className="form-control mb-2" id="thumbnailUrl" value={thumbnailUrl} onChange={(e)=> setThumbnailUrl(e.target.value)} />
                        {validation && <p style={{color:'red'}}>{validation}</p>}
                        <input type="submit" className="btn btn-primary mb-2" onClick={()=> updateData(isEdit)} />
                    </div>
                    )}

                    <div className="row mt-4 mb-4">
                        {userPhotos.map((eachPhoto)=>{
                            const {id, title, url, thumbnailUrl} = eachPhoto;
                            return(
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-3 text-center">
                                        <p>{title}</p>
                                        <p>{url}</p>
                                        <p><img src={thumbnailUrl} alt={thumbnailUrl} /></p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button className="btn btn-danger rounded-0" onClick={()=> handleDelete(id)}>Delete</button>
                                            <button className="btn btn-info rounded-0" onClick={()=> handleEdit(id, title, url, thumbnailUrl)}>Edit</button>
                                            <Link className="btn btn-primary rounded-0" to={`/Usestate66/${eachPhoto.id}`}>Details</Link>
                                            <button className="btn btn-success rounded-0" onClick={()=> navigate('/Usepost66')}>Post</button>
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

export default Usestate66;