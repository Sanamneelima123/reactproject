import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from '../../../images/Loading-img.gif';
import { add } from "./CartSlice";  // Importing the add action to dispatch for Cart

import { getProducts } from "../Redux/ProducsSlice";  // Importing the getProducts thunk

const Products = () => {
  
  const dispatch = useDispatch();

  // Access the state from Redux
  const { myData , loading, error } = useSelector((state) => state.products);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    dispatch(add(product)); // Dispatch add to cart action
  };

  if (loading) {
    return <h4 className="text-center mt-5"><img src={Loader} alt="Loading" /></h4>;
  }

  if (error) {
    return <h4 className="text-center mt-5" style={{ color: 'red' }}>{error}</h4>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="mt-3 mb-3">Products</h3>

        <div className="row">
          {myData.map((product) => {
            const { id, images, title, url } = product;
            return (
              <div key={id} className="col-3 col-xs-12 mb-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <div className="text-center">
                      <img
                        src={images}
                        className="mb-3"
                        style={{ width: '150px', height: '120px' }}
                        alt={title}
                      />
                    </div>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">${url}</p>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
