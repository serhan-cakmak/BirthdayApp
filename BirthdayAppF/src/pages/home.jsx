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
    var userId = ( window.location.pathname.split("/")[2]);

    const errRef = useRef();
    // const [_visibility, setVisibility] = useState("visible");



    // const useComponentWillMount = (cb) => {
    //     const willMount = useRef(true)
    
    //     if (willMount.current) cb()
    
    //     willMount.current = false
    // }





    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const friend = { name: name, birthday : bday};
            setErrMsg('');
            // console.log(friend);
            const response = await axios.post("/user/addFriend/"+userId, JSON.stringify(friend),
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
            
            // console.log(window.location.pathname.split("/")[2]);
            // console.log(userId);
            const response = await axios.get("/user/getFriends/"+ userId);
     
            console.log(response);
            setFriends( response.data.map((object) => {
                    
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
            } ))
            // console.log(response);
           
            console.log(response.data);
            // setFriends( response.data);
      
        }catch (err) {
            if (!err?.response) {
                setErrMsg('No friends added yet');
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
    // useEffect(() => {
    //     const handleTabClose = event => {
    //       event.preventDefault();
    
    //       console.log('beforeunload event triggered');
    
    //       return (event.returnValue = 'Are you sure you want to exit?');
    //     };
    
    //     window.addEventListener('beforeunload', handleTabClose);
    //     return () => {
    //       window.removeEventListener('beforeunload', handleTabClose);
          
    //     };
    //   }, []);

    function handleAddFriend(){
        setSuccess(true)
    }
    //Getten aldıgın degeri displaylemek için yola ara
 
    return(
        
        <section>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                
                <section key ={friends.id} >
                    {friends}
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