import React from "react";

const Props2 = (props) =>{

    // const styles = {
    //     new_c: {
    //       display: "grid",
    //       gridTemplateColumns: "repeat(3, 1fr)",
    //       gap: "2rem"
    //     },
    //   };

    return(
                <div className="container">
                    <div className="row">
                        <div className="mt-5">
                            <div className="card">
                            <div className="card-body">
                                <small>{props.id}</small>
                                <h5 className="card-title">{props.title}</h5>
                                <img src={props.thumbnailUrl} alt="" />
                                <p>{props.url}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>
    )
}

export default Props2;