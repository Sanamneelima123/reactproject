// Home.jsx
import React, { useState } from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { increment } from './Hooks/Redux/CounterSlice';
import { addUsers } from './Hooks/Redux/UserSlice';
import UserForm from './Hooks/Redux/userForm';

const Home = () => {

  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState('');

  const handleUser = (e) =>{
      setNewUser(e.target.value);
  }

  const formSubmmit = (e) => {
      e.preventDefault();
      // console.log("this is newuser", newUser);
      dispatch(addUsers(newUser))
      setNewUser('');
  }

  const likeHandler = () => {
      dispatch(increment())
  }

const navigate = useNavigate();

  return(
      <>
        <Header/>
           <div className='container'>
             <h3 className='p-3'>Home Component</h3>
             <button className="btn btn-info rounded-0 text-white" onClick={()=> navigate('/NavigationOtherPage')}>Back to Navigation Page</button>&nbsp;
             <button className="btn btn-success rounded-0" onClick={likeHandler}>Like</button>

             <div className='mt-5'>
               <UserForm/>
             </div>

             <div className='mt-5 mb-5'>
                 <form className='newUser' onSubmit={formSubmmit}>
                    <input type='text' className='form-control mb-2' value={newUser} onChange={handleUser} />
                    <button type='submit' className='btn btn-primary'>Submit</button>
                 </form>
             </div>

           </div>
        <Footer/>
      </>
   )
};

export default Home;
