// src/components/ChatBubble.jsx
import React from 'react';

const ChatBubble = ({ message, isUser = false }) => {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
      {/* Awatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-2xl shadow-md">
        {isUser ? '👤' : '🤖'}
      </div>
      
      {/* Dymek */}
      <div
        className={`max-w-[70%] px-5 py-3 rounded-3xl shadow-lg relative ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-br-none' 
            : 'bg-gradient-to-r from-green-400 to-green-600 text-white rounded-bl-none'
        }`}
      >
        {message}
        {/* Ogon dymka */}
        <div
          className={`absolute w-0 h-0 border-t-[12px] border-b-[12px] border-transparent top-4 ${
            isUser
              ? 'border-l-[12px] border-l-blue-700 -right-[11px]'
              : 'border-r-[12px] border-r-green-600 -left-[11px]'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ChatBubble;