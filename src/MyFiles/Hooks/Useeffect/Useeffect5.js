import React,{useState, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Useeffect5 = () =>{

   const URL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

   const [drinksData, setDrinksdata] = useState([]);
   const [searching, setSearching] = useState('');
   const [loading, setLoading] = useState(false);
   const [isError,setIsError] = useState({status:false, msg:''})

   const fetchapi = async (apiurl) =>{
        setLoading(true);
        setIsError({status:false, msg:''});
      try {
        const responsive = await fetch(apiurl)
        const {drinks} = await responsive.json();
     //    console.log(drinks);
        setDrinksdata(drinks);
     //    console.log(drinksdata);
          setLoading(false);
          setIsError({status:false, msg:''});
          if(!drinks){
            throw new Error('Date not Found')
          }
      } catch (error) {
        setLoading(false);
        setIsError({status:true, msg: error.message || 'some went wrong ....'});
      }
   }

//    useEffect(()=>{
//     const currectUrl = `${URL}${searching}`;
//     fetchapi(currectUrl)
//    },[searching]);

useEffect(()=>{
    const currectUrl = `${URL}${searching}`
    fetchapi(currectUrl)
},[searching]);

const handleDelete = (idDrink) =>{
    // console.log(idDrink);
    const deleteDrink = drinksData.filter((eachDrink)=>{
        return eachDrink.idDrink !== idDrink
    })
    setDrinksdata(deleteDrink)
}

    return(
        <div>
            <Header/>
            <div className="container">
                <h3 className="mt-5 mb-5">Useeffect5 Component{drinksData.length}</h3>

                <div className="row mb-3 align-items-end">
                    <form>
                        <input type="text" className="form-control w-25" id="search" name="search" value={searching} onChange={(e)=> setSearching(e.target.value)}/>
                    </form>
                </div>

                {loading && isError?.status && <h4>Loading ....</h4>}
                {isError?.status && <h3 style={{color:"red"}}>{isError.msg}</h3>}
                {
                    !loading && !isError?.status && 
                    <div className="row">
                    {
                    drinksData.map((eachDrink)=>{
                        const {idDrink,strDrink,strDrinkThumb} = eachDrink;
                       return(
                        <div key={idDrink} className="col-4 text-center mt-5">
                           <p><img src={strDrinkThumb} width="350px" alt={strDrinkThumb}/></p>
                           <p>{strDrink}</p>
                           <button className="btn btn-danger" onClick={()=>handleDelete(idDrink)}>Delete</button>
                           <button className="btn btn-info">Edit</button>
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

export default Useeffect5;