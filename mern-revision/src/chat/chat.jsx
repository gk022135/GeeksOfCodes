import React, { useEffect, useState, useRef } from 'react';

function Chatapp() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);

    // WebSocket Message Sender
    const sendMessage = () => {
        if (input.trim() !== '' && ws.current?.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                to: '22bcs046@gmail', // receiver's ID/email
                content: input
            });

            ws.current.send(payload);
            setMessages(prev => [...prev, { sender: 'me', text: input }]);
            setInput('');
        }
    };

    // HTTP token verification + WebSocket upgrade
    useEffect(() => {
        async function connectionUpgrade() {
            try {
                const response = await fetch('http://localhost:3000', {
                    credentials: 'include', // sends cookies like HttpOnly token
                    headers: {
                        Authorization: 'Bearer myjwt', // ✅ Correct placement and spelling
                    }
                });

                if (!response.ok) {
                    console.error('❌ Unauthorized: WebSocket not started');
                    return;
                }

                //Token valid — now connect to WebSocket
                ws.current = new WebSocket('ws://localhost:3000');

                ws.current.onopen = () => console.log('🟢 WebSocket connected');

                ws.current.onmessage = async (event) => {
                    const text = typeof event.data === 'string' ? event.data : await event.data.text();
                    const data = JSON.parse(text);
                    setMessages(prev => [...prev, data]);
                };

                ws.current.onerror = (err) => console.error('❌ WebSocket error:', err);
                ws.current.onclose = () => console.log('🔴 WebSocket disconnected');
            } catch (error) {
                console.error('❌ Connection upgrade error:', error);
            }
        }

        connectionUpgrade();

        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

    return (
        <div style={{
            padding: 32,
            background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2 style={{
                color: '#FFD700',
                marginBottom: 24,
                fontWeight: 700,
                letterSpacing: 1
            }}>🧑‍💻 WebSocket Chat</h2>

            <div style={{
                borderRadius: 12,
                background: 'rgba(30, 30, 40, 0.95)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                padding: 16,
                width: 400,
                maxWidth: '90vw',
                height: 350,
                overflowY: 'auto',
                marginBottom: 16,
                border: '1px solid #333'
            }}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                            marginBottom: 10
                        }}
                    >
                        <span style={{
                            background: msg.sender === 'me' ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)' : '#333',
                            color: msg.sender === 'me' ? '#232526' : '#fff',
                            padding: '8px 14px',
                            borderRadius: 18,
                            maxWidth: '80%',
                            wordBreak: 'break-word',
                            fontWeight: 500,
                            boxShadow: msg.sender === 'me' ? '0 2px 8px rgba(255,215,0,0.15)' : '0 2px 8px rgba(0,0,0,0.15)'
                        }}>
                            <b style={{ fontSize: 13, opacity: 0.8 }}>
                                {msg.sender === 'me' ? 'You' : msg.sender}:
                            </b> <span style={{ fontWeight: 400 }}>{msg.text}</span>
                        </span>
                    </div>
                ))}
            </div>

            <div style={{
                display: 'flex',
                width: 400,
                maxWidth: '90vw',
                gap: 8
            }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: 20,
                        border: '1px solid #FFD700',
                        background: '#232526',
                        color: '#fff',
                        outline: 'none',
                        fontSize: 16,
                        transition: 'border 0.2s',
                    }}
                    placeholder="Type a message"
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: '12px 24px',
                        borderRadius: 20,
                        border: 'none',
                        background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                        color: '#232526',
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(255,215,0,0.15)',
                        transition: 'background 0.2s',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatapp;
