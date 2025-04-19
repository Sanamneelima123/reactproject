import React,{useState, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Useeffect3 = () =>{

   const URL ="https://jsonplaceholder.typicode.com/users";
 
   const [userdata, setUserData] = useState([]); 
   const [loading,setLoading] = useState(false);
   const [iserror,setError] = useState({status:false, msg:''})

   const fetchApiData = async (apiurl) =>{
        setLoading(true);
        setError({status:false, mes:''})
    try {
        const responsive = await fetch(apiurl)
        const data = await responsive.json();
     //    console.log(data);
           setUserData(data);
        //    console.log(userdata);
           setLoading(false);
           setError({status:false, msg:''})
           if(responsive.status === 404){
             throw new Error('Data not Found');
           }
    } catch (iserror) {
        setLoading(false);
        setError({status:true, msg: iserror.message || 'Something went wrong please try Again'})
    }
   }

   useEffect(()=>{
        fetchApiData(URL)
   },[]);

   if(loading){
     return <h3 className="text-center">Loading Data....</h3>
   }

   if(iserror?.status) {
      return <h4 className="text-center" style={{color:"red"}}>{iserror?.msg}</h4>
   }

   const headingStyle = {
      marginBottom: '85px',
      marginTop:'100px'
  };
    
    return(
        <div>
            <Header/>
                    <div className="container" style={headingStyle}>
                        <h3 className="mt-3 mb-3 mb-5">Hooks API Fetch Data</h3>

                         <div className="row">
                          {
                            userdata.map((eachUser)=>{
                                const {id, name, email,address} = eachUser;
                                return(
                                  <div className="col-sm-4">
                                    <div className="list-group card p-3 mb-3 shadow" key={id}>
                                        <li className="list-group-item"><strong>{id}</strong></li>
                                        <li className="list-group-item">{name}</li>
                                        <li className="list-group-item">{email}</li>
                                        <li className="list-group-item">{address.city}</li>
                                    </div>
                                    </div>
                                )
                            })
                          }
                         </div>

                    </div>
            <Footer/>
        </div>
    )
}

export default Useeffect3;