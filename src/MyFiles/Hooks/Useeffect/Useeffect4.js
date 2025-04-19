import React,{useState, useEffect} from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const Useeffect4 = () =>{

   const URL="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

   const [drink,setDrinks] = useState([]);
   const [seacrhing,setSearching]= useState('');
   const [loading,setLoading] = useState(false);


   const fetchapi = async (apiurl) =>{
       setLoading(true);
    try {
        const responsive = await fetch(apiurl);
        // console.log(responsive);
        const {drinks} = await responsive.json();
        console.log(drinks);
        setDrinks(drinks);
        setLoading(false);
    } catch (error) {
         console.log(error);
         setLoading(false);
    }
   
   }


   useEffect(()=>{
       const currectUrl = `${URL}${seacrhing}`;
       fetchapi(currectUrl)
   },[seacrhing]);

   if(loading){
    return <h4 className="text-center">Loading...</h4>
   }

    return(
        <div>
            <Header/>
             <div className="container">
                <div className="row mt-5">
                   <form>
                      <input type="text" className="form-control" id="search" name="search" value={seacrhing} onChange={(e)=> setSearching(e.target.value)} />
                   </form>
                </div>
                {/* { loading && <h3 className="text-center">Loading....</h3>} */}
                { !loading &&
                    <div className="row">
                    {
                        drink.map((eachDrink)=>{
                            const {idDrink,strDrink,strDrinkThumb} = eachDrink;
                           return(
                            <div key={idDrink} className="col-4 text-center mt-5">
                               <p><img src={strDrinkThumb} width="350px" alt={strDrinkThumb}/></p>
                               <p>{strDrink}</p>
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

export default Useeffect4;