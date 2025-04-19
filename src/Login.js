import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../src/App.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/Users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json();

      // Validate credentials
      const foundUser = users.find(user => user.email === formData.email && user.password === formData.password);

      if (foundUser) {
        // Redirect to home page if login is successful
        navigate('/home');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch user data. Please try again later.');
    }
  };

  return (
   
    <div className="container">
      <div className='row mt-5 justify-content-center'>
      <div className='col-6 col-xs-12 shadow p-4 inside_container'>
      <h3 className='text-center' style={{color:'blue'}}>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button type="submit" className="btn btn-primary mt-2 rounded-0">Login</button>
          <Link className='btn btn-success mt-2 rounded-0' to='/register'>Register</Link>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
