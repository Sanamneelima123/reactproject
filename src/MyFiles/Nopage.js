import {React} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const Nopage = ()=>{

  const navigate = useNavigate();

    return(
        <div>
            <Header/>
                <div className="container">
                    <h3 className="p-3 mt-5 text-center" style={{color:'#0070ad'}}>Page Under Working Please Go to Back</h3>
                    <link to="/"></link>
                    <button className="btn btn-primary rounded-0 btn-md" onClick={()=> navigate(`/`)}>Go To Home</button>
                </div>
            <Footer/>
        </div>
    )
}

export default Nopage;