import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import "../Useeffect/Useeffect.css"

const Useeffect6 = () => {
  const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  const [drinksdata, setDrinksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seacrhing, setSearching] = useState('');

  const fetchapi = async (apiurl) => {
    setLoading(true);
    try {
      const responsive = await fetch(apiurl);
      const { drinks } = await responsive.json();
      setDrinksData(drinks); // Ensure drinks is an array or default to an empty array
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const currentapi = `${URL}${seacrhing}`
    fetchapi(currentapi);
  }, [seacrhing]);

  if(loading){
    return <h3 className="text-center mt-v">Loading...</h3>
  }

  return (
    <div>
      <Header />
      <div className="container mt-3">
         <div className="shadow p-3">
            <form>
              <input type="text" className="form-control" name="searching" id="searching" placeholder="Searching Data" value={seacrhing} onChange={(e)=> setSearching(e.target.value)} />
            </form>
         </div>

          {!loading && 
            <div className="row">
            {drinksdata.map((eachDrink) => {
                const { idDrink, strDrink, strDrinkThumb } = eachDrink;
                return (
                <div key={idDrink} className="col-4 text-center mt-5">
                    <div className="shadow p-3">
                    <p>
                    <img src={strDrinkThumb} width="350px" alt={strDrink} />
                    </p>
                    <p>{strDrink}</p>
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

export default Useeffect6;
