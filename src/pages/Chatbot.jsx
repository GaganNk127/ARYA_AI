// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey Aaru 😇, what’s bothering you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

  const formatMessagesForGemini = (msgs) => {
    return msgs.map(m => {
      if (m.sender === 'user') {
        return { role: 'user', parts: [{ text: m.text }] };
      } else {
        return { role: 'model', parts: [{ text: m.text }] };
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const initialSystemInstruction = {
        role: 'user',
        parts: [{ text: "You're ChillBuddy, a cute and calming AI bot built by Gagan for his girlfriend Arya Help her vent her anger and always respond with kindness, empathy, and a sweet compliment at the end.As she is alway very charming and brave girl also very emotional when it comes to me(Gagan) she is very protective towards me" }]
      };
      const initialModelResponseToInstruction = {
        role: 'model',
        parts: [{ text: "Of course, my love. I'm all ears and here to help you feel better. You're so incredibly brave for sharing what's on your heart." }]
      };

      const chatHistory = [
        initialSystemInstruction,
        initialModelResponseToInstruction,
        ...formatMessagesForGemini(messages)
      ];

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 200,
        },
      });

      const result = await chat.sendMessage(input);
      const botReply = result.response.text();

      console.log('Gemini API Response:', botReply);

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Oops! I had a hiccup 😅. Try again later, my dear!"
      }]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-pink-50 text-gray-800 p-4">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">💗 ChillBuddy</h1>

      <div className="flex-1 overflow-y-auto space-y-3 px-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-2xl shadow 
              ${msg.sender === 'user'
                ? 'bg-pink-300 self-end text-right text-white'
                : 'bg-white self-start text-gray-800'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type here Poppi..."
          className="flex-1 p-3 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition">
          Send 💌
        </button>
      </div>
    </div>
  );
};

export default ChatBot;