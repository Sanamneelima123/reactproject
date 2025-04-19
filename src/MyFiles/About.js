// About.jsx
import React, { useEffect } from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './Hooks/Redux/MultiProductSlice';
import Loader from '../images/Loading-img.gif';
import { incrementAdd } from './Hooks/Redux/MultiCartSlice';

const About = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {myData, loading, error} = useSelector((state) => state.newProduct);

   const handleAddToCart = (user) => {
      dispatch(incrementAdd(user)); // Dispatch add to cart action
    };

  useEffect(()=>{
    dispatch(getUsers());
  },[dispatch]);

  if(loading){
    return <h4 className="text-center mt-5"><img src={Loader} alt="Loading" /></h4>
  }

  if(error){
    return <h4 className="text-center mt-5" style={{color:'red'}}>{error}</h4>
  }

  return(
       <>
        <Header/>
              <div className='container'>
                  <h3 className='p-3'>About Component</h3>
                  <button className='btn btn-primary' onClick={()=> navigate('/Navigation1')}>Navigation1</button>

                  <div className="row mt-4">
                    {myData && myData.length > 0 ? (
                      myData.map((user) => {
                        const { id, name, email, phone, address } = user;
                        return (
                          <div key={id} className="col-3 col-xs-12 mb-3">
                            <div className="card h-100">
                              <div className="card-body text-center">
                                <h5 className="card-title">{name.firstname} {name.lastname}</h5>
                                <p className="card-text">Email: {email}</p>
                                <p className="card-text">Phone: {phone}</p>
                                <p className="card-text">City: {address.city}</p>
                                <p className="card-text">Street: {address.street}</p>
                                <p className="card-text">Zipcode: {address.zipcode}</p>
                              </div>
                              <div className="card-footer text-center">
                                <button className="btn btn-primary" onClick={()=> handleAddToCart(user)}>
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No users available</p>
                    )}
                  </div>
              </div>
          <Footer/>
       </>
  ) 
};

export default About;
