import React from 'react';
import socket from '../../socket/socket';

export  const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef(null);

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue,
        });
        onAddMessage({ userName, text: messageValue });
        setMessageValue('');
    };

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }, [messages]);

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr />
                <b>Онлайн ({users.length}):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map((message,i) => (
                        <div key={message + i} className={message.userName === userName ? "message myMessage" : "message"}>
                            <p>{message.text}</p>
                            <div className={'message-info'}>
                                <span>{message.userName}</span>
                                <span>{new Date(message.date).toTimeString().split(' ')[0]}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
          <textarea
              placeholder={'Напишите сообщение...'}
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"/>
                    <button onClick={onSendMessage} style={{width:'200px',left:0}}type="button" className="btn btn-primary">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}