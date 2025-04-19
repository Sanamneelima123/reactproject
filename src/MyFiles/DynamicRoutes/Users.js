import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import data from '../../data'
import { Link } from 'react-router-dom';

const Users = () =>{
    return(
        <div>
            <Header/>
              <div className='container'>
                <h3 className='mt-3 mb-3'>Users</h3>

               <div className='row'>
                  {
                    data.map((eachUser)=>{
                        const {id, name, email} = eachUser;
                        return(
                            <Link to={`/Users/${id}`} key={id} className='col-4 col-xs-12'>
                                <div className='shadow p-3 mb-3'>
                                    <h5>{name}</h5>
                                    <h6>{email}</h6>
                                </div>
                            </Link>
                        )
                    })
                  }
               </div>

              </div>
            <Footer/>
        </div>
    )
}

export default Users;