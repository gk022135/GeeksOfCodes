import React, { useEffect, useState, useRef } from 'react';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3000');

        ws.current.onopen = () => console.log(' WebSocket connected');

        ws.current.onmessage = async (event) => {
            const text = typeof event.data === 'string' ? event.data : await event.data.text();
            const dataa = JSON.parse(text);
            setMessages(prev => [...prev, dataa]);
        };

        ws.current.onerror = (err) => console.error('❌ WebSocket error:', err);
        ws.current.onclose = () => console.log('❌ WebSocket disconnected');

        return () => ws.current.close();
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '' && ws.current?.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                sender: '@gmail', // this could be username, email, or a random ID
                text: input
            });
            ws.current.send(payload);
            setMessages(prev => [...prev, { sender: 'me', text: input }]);
            setInput('');
        }
    };

    return (
        <div style={{ padding: 20, color: 'white' }}>
            <h2>🧑‍💻 WebSocket Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
                        <b>{msg.sender === 'me' ? 'You' : `${msg.sender}`}:</b> {msg.text}
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                style={{ width: '80%', marginTop: 10 }}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
