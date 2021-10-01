import React from 'react';
import './JoinBlock.css';
import axios from "axios";

export const JoinBlock = ({onLogin, isAuth}) => {
    const [roomId,setRoomId] = React.useState('')
    const [userName,setUserName] = React.useState('')
    const sendData = () => {
        if(!roomId || !userName){
            alert('неверные данные')
        }
        const form = {roomId,userName}
        axios.post('./rooms',form).then(()=>onLogin(form))
    }
    return (
        <div className="join-block">
            <input value={roomId} onChange={e=>setRoomId(e.target.value)} placeholder="Room ID" />
            <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Ваше имя" />
            <button
                disabled={isAuth}
                onClick={sendData}
                className="btn btn-success"
            >{isAuth?'ВХОД...':'ВОЙТИ'}</button>
        </div>
    );
}