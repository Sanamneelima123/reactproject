import React from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import {NavLink, useNavigate, Outlet} from 'react-router-dom'

const NavigationOtherPage = () =>{

 const navigate = useNavigate();

 const goOtherPage = () =>{
    navigate('/')
 }

    return(
        <div>
            <Header/>
                <div className='container'>
                    <h3 className='mt-3 mb-3'>Navigation Other Page </h3>

                    <button className='btn btn-primary mt-5 mb-5' onClick={goOtherPage}>Go to Home page</button>

                    <div className='row justify-content-between shadow p-3'>
                        <NavLink className="col-4" to="/NavigationOtherPage/nastedexp1">Nested Experience 1</NavLink>&nbsp;&nbsp;
                        <NavLink className="col-4" to="/NavigationOtherPage/nastedexp2">Nested Experience 2</NavLink>
                    </div>

                    <Outlet />

                </div>
            <Footer/>
        </div>
    )
}

export default NavigationOtherPage;