import React, { useEffect, useState, useRef } from 'react';

function WebSock() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');

    ws.current.onmessage = (event) => {
      setMessages(prev => [...prev, { sender: 'other', text: event.data }]);
    };

    ws.current.onclose = () => console.log('WebSocket disconnected');

    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      ws.current.send(input);
      setMessages(prev => [...prev, { sender: 'me', text: input }]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20, color:'white'}}>
      <h2>🧑‍💻 WebSocket Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
            <b>{msg.sender === 'me' ? 'You' : 'Other'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type='text'
        placeholder='chat here'
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%', marginTop: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default WebSock;
