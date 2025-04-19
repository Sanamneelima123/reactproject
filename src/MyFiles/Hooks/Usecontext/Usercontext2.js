import React,{useContext} from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import { Usercontext } from './Usercontext';

const UseContext2 = () =>{

  const data = useContext(Usercontext);
  console.log(data);
   

    return(
        <div>
            <Header/>
            <div className='container'>

            </div>
            <Footer/>
        </div>
    )
}

export default UseContext2;