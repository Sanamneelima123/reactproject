import React,{useState} from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const Usestate3 = () =>{

  const [showdata, setShowdata] = useState(false);

  const handleshow = () =>{
    // setShowdata(true);
    setShowdata(!showdata)
  }

    return(
        <>
        <Header/>
        <div className="container">
            <h3 className="mt-5">React Conditional Rendering</h3>

            <div className="row">
                                                                         {/* react trander operator */}
                <button className="btn btn-primary" onClick={handleshow}>{showdata ? 'hide' : 'show'}</button>
                {/* {showdata.length === 0 && <h4>Data is Hide</h4>} */}
                {/* {showdata &&
                <div className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
                } */}
                {
                    showdata ? <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </div> : <h3>Data is Hidden</h3>
                }
                </div>

        </div>
        <Footer/>
        </>
    )
}

export default Usestate3;