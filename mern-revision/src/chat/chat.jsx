import React, { useEffect, useState, useRef } from 'react';

function Chatapp({ client2 }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  const sendMessage = () => {
    if (input.trim() !== '' && ws.current?.readyState === WebSocket.OPEN) {
      const payload = JSON.stringify({
        to: client2,
        content: input,
      });

      ws.current.send(payload);
      setMessages((prev) => [...prev, { sender: 'me', text: input }]);
      setInput('');
    }
  };

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');

    ws.current.onopen = () => console.log('🟢 WebSocket connected');

    ws.current.onmessage = async (event) => {
      const text = typeof event.data === 'string' ? event.data : await event.data.text();
      const data = JSON.parse(text);
      setMessages((prev) => [...prev, data]);
    };

    ws.current.onerror = (err) => console.error('❌ WebSocket error:', err);
    ws.current.onclose = () => console.log('🔴 WebSocket disconnected');

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [client2]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#232526] to-[#414345] px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">
        🧑‍💻 WebSocket Chat {client2 && client2}
      </h2>

      <div className="w-full max-w-md h-[22rem] sm:h-[26rem] overflow-y-auto rounded-xl bg-black/40 border border-gray-700 shadow-xl p-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col mb-2 ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm font-medium break-words shadow-md ${
                msg.sender === 'me'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <b className="block text-xs opacity-80 mb-1">
                {msg.sender === 'me' ? 'You' : msg.sender}
              </b>
              <span className="font-normal">{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full bg-[#232526] border border-yellow-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold shadow-md hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatapp;
