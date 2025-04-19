import React,{useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestate2 = () =>{

//  const newObj={
//     firstName:"Pavan",
//     lastName:"Balu Naidu",
//     age:28
//  }

// function newObj(){
//         return{
//             firstName:"Pavan",
//             lastName:"Balu Naidu",
//             age:28
//         }
// }

//   const [data,setData] = useState(newObj);
//   const [data,setData] = useState({
//     firstName:"Pavan",
//     lastName:"Balu Naidu",
//     age:28
//  });

const [firstName, setfirstName] = useState('Pavan');
const [lastName, setlastName] = useState('Capgemini');
const [age, setAge] = useState('30');

const chagefirstname = () =>{
    setfirstName('Balla Pavan Kumar')
}

const chagelastname = () =>{
    setlastName('Capgemini Employess')
}

const chageage = () =>{
    setAge(29)
}

//   const chagefirstname = () =>{
//     setData({
//         ...data,
//         firstName:"Balu"
//     })
//   }

//   const chagelastname = () =>{
//     setData({
//         ...data,
//         lastName:"I am using React useState"
//     })
//   }

//   const chageage = () =>{
//     setData({
//         ...data,
//         age:29
//     })
//   }



    return(
    <div>
     <Header/>
        <div className="container">
            <div className="row mt-5">
             <h3>Hello My Name is {firstName}</h3>
             <button className="btn btn-primary" onClick={chagefirstname}>Change First Name</button>
             <h3>Hello My Name is {lastName}</h3>
             <button className="btn btn-info" onClick={chagelastname}>Change Last Name</button>
             <h3>My Age {age}</h3>
             <button className="btn btn-warning" onClick={chageage}>Age</button>
             </div>
        </div>
        <Footer/>
    </div>
    )
}

export default Usestate2;