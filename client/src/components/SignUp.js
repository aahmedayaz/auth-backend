import React from 'react'
import { NavLink } from 'react-router-dom'
import SignInExtra from './SignInExtra'
import { useState } from 'react'


const SignUp = () => {

  let [name , setName] = useState('')
  let [email , setEmail] = useState('')
  let [password , setPassword] = useState('')
  let [nameError , setNameError] = useState('')
  let [emailError , setEmailError] = useState('')
  let [passwordError , setPasswordError] = useState('')

  let handleInput = (e) => {
    console.log(e.target.value);
    if((e.target.value).trim() === '' || null){
      let text = (e.target.value).trim()
      e.target.value = text;
    }
    else {
      let email , password , name
      if(e.target.name === 'name'){
        name = e.target.value
      }
      else if(e.target.name === 'email'){
        email = e.target.value
      }
      else{
        password = e.target.value
      }
      if(e.target.name === 'email'){
        setEmail(e.target.value)
        if(email === ''){
          setEmailError(`Please provide an Email`)
        }
        else if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
          setEmailError('Invalid Email')
        }
        else{
          setEmailError(``)
        }
      }
      else if(e.target.name === 'password'){
        setPassword((e.target.value).trim())
        if(password === ''){
          setPasswordError(`Please provide an Password`)
        }
        else if(6 > password.length){
          setPasswordError('Password must be greater than 06 digits')
        }
        else{
          setPasswordError('')
        }
      }  
      else{
          setName((e.target.value).trim())
          if(name === ''){
            setNameError(`Please provide an Name`)
          }
          else if(name.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g)){
            setNameError(`Name must not contain any Special Characters`)
          }
          else if(!name.match(/^[^0-9]+$/)){
            setNameError('Name must not contain any Number')
          }
          else if(3 > name.length){
            setNameError('Name must be greater than 03 letters')
          }
          else{
            setNameError('')
          }
      }
    }
    
  }


  let HandleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
  
    // Initialize flag variable
    let isValid = true;
  
    // Validate inputs
    if (name === '') {
      setNameError('Please provide a Name');
      isValid = false;
    } else if (name.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g)) {
      setNameError('Name must not contain any Special Characters');
      isValid = false;
    } else if (!name.match(/^[^0-9]+$/)) {
      setNameError('Name must not contain any Number');
      isValid = false;
    } else if (name.length < 3) {
      setNameError('Name must be greater than 3 letters');
      isValid = false;
    } else {
      setNameError('');
    }
  
    if (email === '') {
      setEmailError('Please provide an Email');
      isValid = false;
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setEmailError('Invalid Email');
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if (password === '') {
      setPasswordError('Please provide a Password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be greater than 6 digits');
      isValid = false;
    } else {
      setPasswordError('');
    }
  }
  

  return (
    <>
        <div className="flex flex-col">
            <h1 className="login-heading font-bold text-4xl">Sign Up</h1>
            <p className="intro-para mt-[10px]">Welcome ! Please Enter your details</p>
            <form className='flex flex-col' onSubmit={HandleSubmit}>
              <input type="text" name='name' value={name} onChange={handleInput}  className="email-input border-b-[1px] border-solid border-black px-[15px] py-[10px] mt-[40px] outline-none" id='name' placeholder='Enter your Name' autoComplete='off'/>
              <span className='text-xs h-[21px] px-[15px] text-red-700'>{nameError}</span>
              <input type="text" name='email' value={email} onChange={handleInput} className="email-input border-b-[1px] border-solid border-black px-[15px] py-[10px] outline-none" id="email" placeholder="Enter your Email" autoComplete='off'/>
              <span className='text-xs h-[21px] px-[15px] text-red-700'>{emailError}</span>
              <input type="password" name='password' value={password} onChange={handleInput} className="password-input border-b-[1px] border-solid border-black px-[15px] py-[10px] outline-none" id="password" placeholder="Enter your Password"/>
              <span className='text-xs h-[21px] px-[15px] text-red-700'>{passwordError}</span>
              <input type='submit' value="Submit" className="Login-btn mt-[15px] bg-emerald-900 text-white py-[10px] cursor-pointer" id="login-btn"/>
            </form>
            
            <div className='mt-[20px]'>
                <span className="">Aready have an account ? </span>
                <span className="underline cursor-pointer"><NavLink to='/'>Login Here</NavLink></span>
            </div>
            <SignInExtra/>
        </div>
    </>
  )
}

export default SignUp