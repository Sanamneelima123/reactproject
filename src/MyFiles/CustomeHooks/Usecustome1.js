import React, {  } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Useexp1 from '../../MyFiles/CustomeHooks/Useexp1'

const Usecustome1 = () =>{

      const [count, inc, dec, reset] = Useexp1(25);

    return(
        <div>
            <Header/>
                <div className='container'>
                    <h3 className='mt-3 mb-3'>Custome Hook 1</h3>

                    <div>
                        <p>Count == {count}</p>
                        <button className='btn btn-primary' onClick={inc}>Inc</button>&nbsp; | &nbsp;
                        <button className='btn btn-primary' onClick={dec}>dec</button>&nbsp; | &nbsp;
                        <button className='btn btn-primary' onClick={reset}>reset</button>
                    </div>

                </div>
            <Footer/>
        </div>
    )
}

export default Usecustome1;