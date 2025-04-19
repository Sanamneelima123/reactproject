import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useNavigate } from "react-router-dom";

const Usepost66 = () => {

     const [title, setTitle] = useState('');
     const [url, setUrl] = useState('');
     const [thumbnailUrl, setThumbnailUrl] = useState('');
     const [validation, setValidation] = useState(false);

     const navigate = useNavigate();

    // console.log({title, url, thumbnailUrl})

    const allfields = {title, url, thumbnailUrl};

    const formSubmit = async (e) =>{
        e.preventDefault();
        if(!title || !url || !thumbnailUrl){
            setValidation('All input fields or Required');
            return
        }

        setValidation(false);
        console.log(allfields);

        try {
            const response = await fetch(`http://localhost:3001/Posts`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify(allfields)
            })
            if(response.ok){
                setTitle('');
                setUrl('');
                setThumbnailUrl('');
                toast.success('Data save on Local API Successfully');
            }
        } catch (error) {
            toast.error('Data not save on Local API');
        }
    }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="p-3">Usepost66 Component</h3>

                    <div className="mt-5 p-3 shadow">
                    <button className="btn btn-success mb-2" onClick={()=> navigate('/Usestate66')}>Go Back</button><hr/>
                        <form onSubmit={formSubmit}>
                            <input type="text" className="form-control mb-2" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
                            <input type="text" className="form-control mb-2" name="url" value={url} onChange={(e)=> setUrl(e.target.value)} />
                            <input type="text" className="form-control mb-2" name="thumbnailUrl" value={thumbnailUrl} onChange={(e)=> setThumbnailUrl(e.target.value)} />
                             {validation && <p style={{color:'red'}}>{validation}</p>}
                            <input type="submit" className="btn btn-primary mb-2" />
                        </form>
                       
                    </div>

               </div>
            <Footer/>
            <ToastContainer />
        </div>
    )
}

export default Usepost66;