import React, { useState } from 'react';

const Settings = ({users, updateuser, auth, setAuth}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='Settings'>
            <div className='Userinfobox'>
                <h1>fddgdg</h1>
                <div className='Userinfo'>
                    <li class='user'>
                        <form method="POST" action='/updateUser'>
                            Username: ${fff}
                        </form>
                    </li>
                </div>

            </div>
        </div>
    );





}







export default Settings;