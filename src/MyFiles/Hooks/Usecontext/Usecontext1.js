import React,{useState} from "react"; 
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

const UseContext1 = () =>{

   const [userDetails,setUserDetails] = useState({
       FirstName:'Balu',
       Email:'baluangular225@gmail.com',
       password:'225225'
   });

    return(
        <div>
            <Header/>
            <div className="container">
                <h3 className="mt-5">Parent Component</h3>
                {/* <p>this is Prop Drilling</p> */}
                <Childcomponent userDetails={userDetails} />
            </div>
            <Footer/>
        </div>
    )
}

const Childcomponent = (props) =>{
    console.log(props);
    return(
        <div>
            <h3>Child Component</h3>
            <SubChildcomponent userDetails={props.userDetails} />
        </div>
    )
}

const SubChildcomponent = ({userDetails}) =>{
    const {FirstName, Email, password} = userDetails;
    return(
        <div>
            <h3>Sub Child Component</h3>
            <p>{FirstName}</p>
            <p>{Email}</p>
            <p>{password}</p>
        </div>
    )
}


export default UseContext1;