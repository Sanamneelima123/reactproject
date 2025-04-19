import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

const Navigation1 = () =>{

    return(
        <div>
            <Header/>
                <div className='container'>
                    <h4 className='mt-3 mb-3'>Navigation1</h4>
                   

                   <div className='row justify-content-between shadow p-3'>
                        <NavLink className="col-4" to="/Navigation1/About1">About1</NavLink>&nbsp;&nbsp;
                        <NavLink className="col-4" to="/Navigation1/About2">About2</NavLink>
                    </div>

                </div>
                <Outlet/>
            <Footer/>
        </div>
    )
}

export default Navigation1;