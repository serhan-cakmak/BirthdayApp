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




    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const friend = { name: name, birthday : bday};
            setErrMsg('');
   
            const response = await axios.post("/user/addFriend/"+userId, JSON.stringify(friend),
            {
                headers : {'Content-Type' : 'application/json'},      
            });
            
            getFriends();
            setName('');
            setBday('');
           
        }catch(err){
            console.log(err);
            
          
        }
    }
    const getFriends = async (e) =>{
       
        try{
            
            const response = await axios.get("/user/getFriends/"+ userId);
     
            console.log(response);
            setFriends( response.data.map((object) => {
              
                // object.remainingDays = dateDiffInDays(now,new Date(object.birthday));
                
                let arr = object.birthday.split("T");
                let a = arr[0].substring(8) +"." + arr[0].substring(5,7) + "." + arr[0].substring(0,4);
                
                return(
                    <div className="Friends" key={object.id}>
                    
                            <h1>
                                {object.name} 's
                            </h1>

                           
                            <p style = {(object.remainingDays==1 || object.remainingDays==0 )  ? {display: 'none'} : {} }> 
                                {getOrdinalNum( object.age)} birthday is in {object.remainingDays} days!
                            </p>
                            
                            <p style = {object.remainingDays==1  ? {} :{display: 'none'}  }> 
                                {getOrdinalNum( object.age)} Birthday is in {object.remainingDays} day!
                            </p>
                            <p style={object.remainingDays==0  ? {} :{display: 'none'}  }>
                                Today is the {getOrdinalNum( object.age)} birthday!
                            </p>

                    </div>
                   
                )
            } ))
            // console.log(response);
           
            console.log(response.data);
            // setFriends( response.data);
      
        }catch (err) {
            console.log(err);
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
   

    // a and b are javascript Date objects
    // function dateDiffInDays(a, b) {
    //     let res = (a.getTime()- b.getTime()) / _MS_PER_DAY;
        
    //     return (res>0) ? 365- Math.ceil(res) : Math.abs( Math.floor(res));
      
    // }
    useEffect(() => {}, [errMsg])
    useEffect(() => {getFriends();},[])
   
    const getOrdinalNum = (number) => {
        let selector;
      
        if (number <= 0) {
          selector = 4;
        } else if ((number > 3 && number < 21) || number % 10 > 3) {
          selector = 0;
        } else {
          selector = number % 10;
        }
      
        return number + ['th', 'st', 'nd', 'rd', ''][selector];
      };

    function handleAddFriend(){
        setSuccess(true)
    }
    const handleReset = async (e) =>{
        try {
            axios.post('/user/resetFriends/'+userId);
            setFriends([]);
            setErrMsg('Friend list has reset.')
        }catch(err){
            setErrMsg('Problem occured while reseting friends.')
        }

    }
 
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
                        // max={20220831} max koy///////////////////////////////////////////////////////////////////////////////maxi localdate.now yap
                        onChange={(e) => setBday(e.target.value)}
                        value={bday}
                        required
                        
                    />
                    <button>Add</button>

                



                </form>

            </section>

            <button onClick={handleAddFriend} style = {success ? {display: 'none'} : {} } >Add Friend</button>
            <button onClick={handleReset}  >Reset Friends</button>
    
        </section>)
    
}
export default Home