import React, { Component } from 'react';
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';

const Home = () =>{

    // const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [bday, setBday] = useState('');
    const [success, setSuccess] = useState(false);
    const [friends, setFriends] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    // const [_visibility, setVisibility] = useState("visible");



    // const useComponentWillMount = (cb) => {
    //     const willMount = useRef(true)
    
    //     if (willMount.current) cb()
    
    //     willMount.current = false
    // }


////////////////////////////////////////////////////////////////loginledikten sonra isenabled ı kapatıp getuserdaki bilgeleri bu dosyaya aktar


    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const friend = { name: name, birthday : bday};
            setErrMsg('');
            // console.log(friend);
            const response = await axios.post("/user/addFriend", JSON.stringify(friend),
            {
                headers : {'Content-Type' : 'application/json'},      
            });
            // console.log(response);
            // setSuccess(true);
            getFriends();
            setName('');
            setBday('');
            // setVisibility('hidden')
            // document.getElementById("AddFrom").style.visibility = "hidden";
        }catch(err){
            console.log(err);
            
            //Display error for user 
        }
    }
    const getFriends = async (e) =>{
       
        try{
            const response = await axios.get("/user/getFriends");
            console.log(response.data);
            setFriends( response.data);
      
        }catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }else if (err.response?.status === 500) {
                setErrMsg('No friends added yet. ');
            }
             else {
                setErrMsg('Cannot display friends.');
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {}, [errMsg])
    useEffect(() => {getFriends();},[])
    function handleAddFriend(){
        setSuccess(true)
    }
    //Getten aldıgın degeri displaylemek için yola ara
 
    return(
        
        <section>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                
                <section key ={friends.id} >
                    {friends.map((object) => {
                    
                    return(
                        <div className="Friends" key={object.id}>
                        
                                <h1>
                                    {object.name}
                                </h1>

                                <p>
                                    {object.birthday}
                                </p>

                        
                             
                        </div>
                        
                        
                        
                       
                    )
                } )}
                </section>
            
            </section>
            
            
            <section style={success ? {}: {display : 'none'}}>
                <h1>Add Friend</h1>
                
                <form id='AddForm'  onSubmit={handleSubmit}>
                    <label htmlFor='userName'></label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />

                    <label htmlFor='bday'></label>
                    <input
                        type="date"
                        id="bday"
                        autoComplete="off"
                        // max={20220831} max koy
                        onChange={(e) => setBday(e.target.value)}
                        value={bday}
                        required
                        
                    />
                    <button>Add</button>

                



                </form>

            </section>

            <button onClick={handleAddFriend} style = {success ? {display: 'none'} : {} } >Add Friend</button>
    
        </section>)
    
}
export default Home