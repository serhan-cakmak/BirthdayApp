
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/Authprovider';
import Registration from './registration';

import axios from '../api/axios';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom'
const Login_Url = '/auth';


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(Login_Url, JSON.stringify(),
            {
                headers : {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({email, pwd , accessToken});
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                       
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            
                            <Link to={"./registration"}>
                                Sign up
                            </Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )

}
export default Login































// import React, { Component } from 'react';
// import axios from "axios";


// const serverBaseUrl = window.location.href;

// class Login extends Component {
//     state = { 
//         email: '',
//         password: '',
//         errors:{
//             erremail: false,
//             errPassword: false
//         }

//     } 
   

//     isValid(string){
//         let pattern = /.*@.*.com/;
//         console.log(string.match(pattern));
//         return string.match(pattern);
//     }


//     handleFormSubmit = event =>{

//         let hasError = false;



//         console.log("burda")
//         this.setState({
//             email : document.getElementById("email"),
//             password : document.getElementById("password")
//         }
//         )

        
//         if (this.isValid(this.state.username)&& this.isValid(this.state.password)){
//             console.log("success")
//             return;
//         }
//         else{
//             this.setState({password:"", username:""});
//             return;
//         }

//     }

//     handleInputChange(event){
//         this.setState({value : event.target.value})
//     }

//     isUser(){
//         //axiostan veri çekme
//     }

//     render() { 
//         return (
//             <section>
//                 {/* <p ref={errRef} className={errmsg ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p> */}
//                 <h1>Sign In</h1>
//                 <form onSubmit={this.handleFormSubmit}>
//                 <label htmlFor ="email" >Email:</label>
//                 <input type ="email" id='email' autoComplete='off' onChange={this.handleInputChange} value={this.state.email} required ></input>
//                 <label htmlFor = "password" id ="password">Password</label>
//                 <input type ="password" id='password' autoComplete='off' onChange={this.handleInputChange} value={this.state.password} required ></input>
//                 <button>Sign In</button>
//                 </form>

//                 <p>Need an account?<br/>
//                     <span className="line">
//                         {/* router link */}
//                         <a href='#'>Sign up</a>
//                     </span>
//                 </p>
//             </section>
//         );
//     }
// }
 
// export default Login ;