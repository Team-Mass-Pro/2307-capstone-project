import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { useParams } from 'react-router-dom';
import AvatarImageEditor from './AvatarImageEditor'

const Settings = ({users, updateUser, auth, setAuth}) => {

    const [username, setUsername] = useState(auth.username);
    const [avatar, setAvatar] = useState(users.avatar)


    function UpdateAvatar() {
        const {id} = useParams();
        useEffect(()=> {
            axios.get('')
        })
    }




    const save = (ev) => {
        ev.preventDefault();
        console.log(username);
        console.log(auth.avatar);
    };

// todo: move to axios
    return (
        <div className='Settings'>
            <div className='Userinfobox'>
                <h2>Username: </h2>
                <div className='Username'>
                    <form onSubmit={save}>
                        <input value={username} onChange={ev => setUsername(ev.target.value)}/>
                        <button disabled={!username || username === auth.username}>update</button> 
                    </form>
                    
                </div>
                <h2>Avatar: </h2>
                <div className='Avatar'>
                    {username.avatar}
                    <AvatarImageEditor user={ users }/>
                </div>
            </div>
        </div>
    );

};







export default Settings;