import React, { useRef, useEffect } from 'react';
const AvatarImageEditor = ({ user })=> {
    console.log(user)
    const el = useRef();
    useEffect(()=> {
        el.current.addEventListener('change', (ev) => {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', ()=> {
                user = {...user, image: reader.result}
                console.log(reader.result);
            });
            console.log(file);
        });;
    }, [])
    return (
        <div>
            <input type='file' ref={ el }/>
        </div>
    );
};

export default AvatarImageEditor;