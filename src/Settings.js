import React, { useState } from 'react';

const Settings = ({users, updateuser, auth, setAuth}) => {

    const [username, setUsername] = useState(auth.username);
    const [password, setPassword] = useState('');
const save = (ev) => {

    ev.preventDefault();
    console.log(username);
};
// todo: move to axios
    return (
        <div className='Settings'>
            <div className='Userinfobox'>
                <h2>Username: </h2>
                <div className='Userinfo'>
                    <form onSubmit={save}>
                        <input value={username} onChange={ev => setUsername(ev.target.value)}/>
                        <button disabled={!username || username === auth.username}>update</button> 
                    </form>
                </div>

            </div>
        </div>
    );





};







export default Settings;