
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/Authprovider';
import Registration from './registration';

import axios from '../api/axios';
import { Route, Routes } from 'react-router';
import { Link, Navigate} from 'react-router-dom'

const User_Url = '/user/login';


const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
 
    
    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        // setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const user ={  email:email ,password:pwd };
            // console.log(user);
            const response = await axios.post(User_Url, JSON.stringify(user),
            {
                headers : {'Content-Type' : 'application/json'},      
            });
            // console.log(response);
            const userOb = await axios.get(User_Url +'/getUser');
            
            // console.log(userOb.data);
            
            // console.log(userInfo);
            // console.log(JSON.stringify(userid?.data));
            // const accessToken = response?.data?.accessToken;
            // setAuth({email, pwd , accessToken});
            
            setEmail('');
            setPwd('');
            if (userOb.data){
                
                setSuccess(true);
                setUserInfo(userOb.data);
            }else{
                setErrMsg("Login Failed");
            }
           
        
        } catch (err) {
            console.log(err);
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
                    <Navigate to={"./home/" + userInfo.id + "/" + userInfo.name }/>
                </section>
            ) : (
                <section className='sign'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form className='sign' onSubmit={handleSubmit}>
                        
                        <label htmlFor="email" ></label>
                        <input
                            className='un'
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder='Email'
                        />
                    
                        <label htmlFor="password"></label>
                        <input
                            className='pass'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            placeholder='Password'
                        />
                       
                        <button className='submit'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        
                    </p>
                    <span className="line">
                            
                            <Link to={"./register"}>
                                Sign Up
                            </Link>
                    </span>
                </section>
            )}
        </>
    )

}
export default Login



















