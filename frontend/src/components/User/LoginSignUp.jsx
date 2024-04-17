import React, { useRef, useState } from 'react'
import './LoginSignUp.css'
import Loader from '../layout/Loader/Loader'
import { MdMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CiFaceSmile } from "react-icons/ci";
import  login  from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux'




const LoginSignUp = () => {

  const dispatch = useDispatch()

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user , setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const {name , email , password } = user

  const [avatar , setAvatar] = useState()
  const [avatarPreview , setAvatarPreview] = useState("/profile.png")


  const loginTab = useRef() //loginForm
  const registerTab = useRef() //RegisterForm
  const switcherTab = useRef() //loginButton

  //can't we store ref of a dom element in state variable

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail , loginPassword))

  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
  
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
  
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  
  //submit register form

  const registerSubmit = (e) =>{
    e.preventDefault()
    const myForm = new FormData();

    myForm.set("name" , name);
    myForm.set("email" , email);
    myForm.set("password" , password)
    myForm.set("avatar" , avatar)
    console.log("signUp form Submit")
  }

  const registerDataChange = (e)=>{
    if(e.target.name === "avatar"){
      const reader = new FileReader();
      reader.onload = ()=>{
        if(reader.readyState===2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])


    }
    else{
      setUser({...user , [e.target.name] : e.target.value})
    }
    
  }




  return (
    <>
      <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
          <div>
            <div className='login_signUp_toggle'>
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          {/* LOGIN FORM */}
     
          <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
            <div className='loginEmail'>
              <MdMailOutline />
              <input type="email" placeholder='Email'
                required value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="loginPassword">
              <MdLockOutline />
              <input type="password"
                placeholder='Password'
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password</Link>
            <input type="submit" value="Login" className='loginBtn' />
          </form>


          {/* REGISTER FORM */}


          <form className="signUpForm" ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
            <div className="singUpName">
              <CiFaceSmile />
              <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange} />
            </div>
            <div className="signUpEmail">
              <MdMailOutline />
              <input type="email" placeholder='Email' required name='email' value={email} onChange={registerDataChange} />
            </div>
            <div className="signUpPassword">
              <MdLockOutline />
              <input type="password" placeholder='Password' required name='password' value={password} onChange={registerDataChange} />
            </div>
            <div className="registerImage">
              <img src={avatarPreview} alt="Profile-Pic" />
              <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
            </div>
            <input type="submit" value="Register" className='signUpBtn' />


          </form>

        </div>
      </div>
    </>
  )
}

export default LoginSignUp