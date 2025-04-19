import React from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "./CartSlice";
import emptycart from '../../../images/dog.gif';

const Cartitem = () => {

    const products = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const removeToCart = (id) =>{
        // dispatch remove an action
        dispatch(remove(id))
    }

    return(
        <div>
            <Header/>
               <div className="container">
                   <h3 className="mt-3 mb-3">Cart Component</h3>

                   <div className="row">
                   {
                    products.length === 0 ? (
                        <div className="text-center">
                        <img src={emptycart} alt={emptycart} style={{ width: '100%', height: '500px' }} />
                        </div>
                    ) : (
                        // Otherwise, map through the products and display them
                        products.map((eachProducts) => {
                        const { id, image, title, price } = eachProducts;
                        return (
                            <div key={id} className="col-3 col-xs-12 mb-3">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                <div className="text-center">
                                    <img 
                                    src={image} 
                                    className="mb-3" 
                                    style={{ width: '150px', height: '120px' }} 
                                    alt={title}
                                    />
                                </div>
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">${price}</p>
                                </div>
                                <div className="card-footer text-center">
                                <button 
                                    className="btn btn-danger rounded-0" 
                                    onClick={() => removeToCart(eachProducts.id)}
                                >
                                    Remove Item
                                </button>
                                </div>
                            </div>
                            </div>
                        );
                        })
                    )
                    }

                  </div>

               </div>
            <Footer/>
        </div>
    )
}

export default Cartitem;