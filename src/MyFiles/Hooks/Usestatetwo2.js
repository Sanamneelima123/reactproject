import React, {useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Usestatetwo = () =>{

    const alldata =[
        {
            id:"ncjnjdnsdjcn",
            name:'Pavan',
            email:'baluangular225@gmail.com',
            mobile:9000149485
        },
        {   
            id:"rjihjigwsvl",
            name:'Balu',
            email:'reactmyself@gmail.com',
            mobile:93466489812
        },
        {
            id:"nvksnvlkfk",
            name:'Kishor',
            email:'nodejsmyself@gmail.com',
            mobile:9912399123
        },
    ]

    const [data,setData] = useState(alldata);

    const handledelete = (comingid) =>{
        //  console.log(comingid)
        const filterdata = data.filter((eachitem)=>{
            return eachitem.id !== comingid;
        })
        // console.log(filterdata)
        setData(filterdata)
    }


    return(
        <>
        <Header/>
        <div className="container">

            <div className="row">
                {
                    data.map((eachitem, index)=>{
                        const {name, id, email, mobile}= eachitem;
                        return(
                            <div key={index} className="col-4 shadow mt-5 p-5">
                                <h5>My name is {name}</h5>
                                <h5>My email {email}</h5>
                                <h5>My mobile {mobile}</h5>
                                <button className="btn btn-danger" onClick={()=> handledelete(id)}>Delete</button>
                            </div>
                        )
                    })
                }
                {/* <div className="col-sm-4 mt-5 shadow p-5">
                    <h3>My name is Pavan</h3>
                    <h3>My email id **************</h3>
                    <h3>My mobile number</h3>
                </div> */}
            </div>
            
        </div>
        <Footer/>
        </>
    )
}

export default Usestatetwo;