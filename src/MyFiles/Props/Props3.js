import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import data1 from "../../data1";
import "../Props/Props.css"
// console.log(data1)

const Props3 = () =>{
    return(
        <div>
        <Header/>
        <div className="container mt-5">
            <div class="row">
                {data1.map((eachComment)=>{
                    const {id,name,website,email} = eachComment;
                    return(
                        <Itemlist key={id} id={id} name={name} email={email} website={website}/>
                    )
                })}
            </div>
        </div>
        <Footer/>
        </div>
    )
}

// const Itemlist = ({id,name,email,body}) =>{
    const Itemlist = (props) =>{
    // const {id, name, email, body} = props;
    return(
                    <div class="col-sm-4 mb-2 mt-2">
                        <div class="card_main">
                        <div class="card_body p-4 position-relative">
                            <h4 className="position-absolute">{props.id}</h4>
                            <h3 class="card_title">{props.name}</h3>
                            <p className="email">{props.email}</p>
                            <small class="card_text">{props.website}</small>
                        </div>
                        </div>
                    </div>
    )
}

export default Props3;