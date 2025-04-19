import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import data from "../data";


// const data=[
//     {
//             title:"first movie",
//             imgURL:"https://occ-0-2040-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTHF-xY5ufLTEzCYHFUgFdApC66lg-VcclLNoAxchjUS11R5iGX-P6Q-pYEiKZ2vOHNKJQf1FvnIMPwus3QqKXTrlK5vphSUBctmNbqT85FYwd4Q98_DdY_H_AoxMJh46MuX.jpg?r=476",
//             description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
//             },
//             {
//             title:"second movie",
//             imgURL:"https://occ-0-2040-2186.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABWfQ2g352fUmMSeLPPIeu9LIX-Lnvi75oWeyjZ55IHXFCCWyYLORl_Vbr40bDXJuJss8M5oouLolUJfUaPWQZ3wVpuTy1GF9uLs_AB7fw06zQnf40prQ_3BwNa5cSelmDOwEUOqGEYNOfjI340ffFIbMdC8sFKPPbiVDyokzSajcuESTrVAjEzh99nfeqF7g9EmqRSDS4rqqruswheiv-RPD5NTlZJPfuPC_Zi9uVoe-RkLL7U4oPqXgWrrvQTtnbXyk6SD1k6Wttm0NHh5reb-IpDeZx9IByYeI27YfFnsE52-O9_9ZI37l.jpg?r=a50",
//             description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
//             }
//   ]

                const Services = ()=>{

                    return(
                        <div>
                            <Header/>
                            <h3 className="p-3">Services Component</h3>
                            <section className="container">
                                <div className="row">
                                        {data.map((eachObj)=>{
                                        const {title, imgURL, description} = eachObj;
                                        return(
                                            <div className="col-6 text-center">
                                            <Movie title={title} imgURL={imgURL} description={description} />
                                            </div>
                                        )
                                    })}
                                </div>
                                    </section>
                            <Footer/>
                        </div>
                    )
                  }

                    const Movie = (props)=>{
                        const {title,imgURL, description} = props;
                        return(
                            <section>
                            <img src={imgURL} alt="netflix show" />
                            <h1>{title || "Rendom Title"}</h1> 
                            <p>{description || "alternative description for temporary"}</p>
                            </section>
                        )
                        }

export default Services;