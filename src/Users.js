import React, { useState, useEffect } from 'react';

const Users = ({ users, updateUser,auth, setAuth }) => {
 
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map( u => {
        return(
          <li key={ u.id }>
            <div>
              {u.username}<span> id: {u.id}</span>
            </div>
            <div>
              Administrator Access: {`${u.is_admin}`}
            </div>
            <div>
              VIP Status: {`${u.is_vip}`}<button onClick={() =>{ 
                u.is_vip = !u.is_vip;
                updateUser(u);
                auth.id === u.id ? setAuth(u) : '' ;
                }}>
                {u.is_vip? 'Revoke VIP':'Make VIP'}</button>
            </div>
          </li>
        )
        })}
      </ul>
    </div>
  );
};

export default Users;
