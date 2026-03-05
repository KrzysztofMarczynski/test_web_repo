import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";

function Web() {
  const [messages, setMessages] = useState([
    {
      text: "Cześć! Jestem kolorowym AI chatem 🌈. Jak mogę pomóc?",
      isUser: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      text: input,
      isUser: true,
      time: userTime,
    };

    setMessages((prev) => [...prev, newMessage]);

    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: currentInput,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      const aiTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const aiResponse = {
        text: data.reply,
        isUser: false,
        time: aiTime,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      const errorTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          text: "Ups, coś poszło nie tak z AI 😢 Spróbuj jeszcze raz!",
          isUser: false,
          time: errorTime,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-extrabold text-center">
          Mega Kolorowy Chat AI 🌟
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-4">
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatBubble message={msg.text} isUser={msg.isUser} />
            <div
              className={`text-xs text-gray-600 mt-1 ${
                msg.isUser ? "text-right" : "text-left"
              }`}
            >
              {msg.time}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white px-5 py-3 rounded-3xl shadow-md">
              <span className="text-gray-500">Pisze...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white shadow-lg border-t max-w-3xl mx-auto w-full">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Napisz coś kolorowego... 🎨"
            className="flex-1 px-6 py-3 rounded-full border"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-3 rounded-full"
          >
            Wyślij 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default Web;