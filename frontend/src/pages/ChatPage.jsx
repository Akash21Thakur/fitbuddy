
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ask-ai', {
        message: input,
      });
      const reply = res.data.reply;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong with the AI 😔'
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center">
      {/* Fixed Header */}
      <div className="w-full bg-[#1e293b] text-center py-4 shadow-md z-10">
        <h1 className="text-xl font-bold text-orange-400">💬 Ask FitBuddy</h1>
      </div>

      {/* Scrollable chat content */}
      <div
        className="w-full max-w-2xl flex-1 overflow-y-auto px-4 space-y-4 pt-6 pb-36"
        style={{ height: 'calc(100vh - 120px)' }}
        ref={scrollRef}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === 'user' ? 'bg-orange-500 text-white self-end ml-auto' : 'bg-[#1e293b] text-gray-200'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.content}
          </motion.div>
        ))}
        {loading && <p className="text-gray-400">Thinking...</p>}
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 w-full max-w-2xl px-4 flex py-3 bg-[#0f172a]">
        <input
          className="flex-grow rounded-l-lg bg-[#1e293b] p-3 outline-none text-white"
          placeholder="Ask me anything fitness-related..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 px-4 rounded-r-lg hover:bg-orange-600"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
