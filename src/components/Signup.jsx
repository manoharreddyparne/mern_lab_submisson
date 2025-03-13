import React, { useState } from 'react'
import "./signup.css";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [FromData,setFormData] =useState({
        username:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("Values Submitted!");
        alert("values submitted");
        navigate("/login");
    }
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
  return (

    <div className='parent'>
        <form onSubmit={handleSubmit}>
        <label htmlFor="">Name:</label>

        <input type="text" name='name' placeholder='Enter your name:' required  value={FormData.name} onChange={handleChange}/>
        <br />
        
        <label htmlFor="">Email:</label>
        <input type="email" name='email' placeholder='Enter your email' required value={FormData.email} onChange={handleChange}/>
        <br/>
        <label htmlFor="">password</label>
        <input type="password" placeholder='Enter your password' required name='password'  onChange={handleChange}/>
        <br />
        <button >Submit</button>
        </form>
    </div>
  )
}

export default Signup