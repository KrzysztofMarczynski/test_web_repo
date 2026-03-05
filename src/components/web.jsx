// src/components/web.jsx
import React, { useState, useRef, useEffect } from 'react';
import backend from './backend';

function Web() {
  const [messages, setMessages] = useState([
    { text: "Cześć! Jestem kolorowym AI chatem 🌈. Jak mogę pomóc?", isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { 
      text: input, 
      isUser: true, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Symulacja odpowiedzi AI z opóźnieniem
    setTimeout(() => {
      const aiResponse = { 
        text: "Super wiadomość! Oto kolorowa odpowiedź 🎉: " + input.toUpperCase(), 
        isUser: false, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      {/* Nagłówek kolorowy */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-extrabold text-center drop-shadow-md">Mega Kolorowy Chat AI 🌟</h1>
      </div>

      {/* Okno czatu – wyśrodkowane i kolorowe */}
      <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="animate-fade-in-up">
            <backend message={msg.text} isUser={msg.isUser} />
            <div className={`text-xs text-gray-600 mt-1 ${msg.isUser ? 'text-right' : 'text-left'}`}>
              {msg.time}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4 animate-pulse">
            <div className="bg-white px-5 py-3 rounded-3xl shadow-md">
              <span className="text-gray-500">Pisze</span>
              <span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Pole wpisu – kolorowe i animowane */}
      <div className="p-4 bg-white shadow-lg border-t max-w-3xl mx-auto w-full">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Napisz coś kolorowego... 🎨"
            className="flex-1 px-6 py-3 rounded-full border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all bg-gradient-to-r from-white to-purple-50 text-gray-800 placeholder-purple-400"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-md flex items-center gap-2"
          >
            Wyślij <span>🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Web;