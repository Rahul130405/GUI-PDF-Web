'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/lib/store';
import { Send, Bot, User, Trash2, ArrowLeft, Loader2, Copy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatInterface = () => {
  const { currentDocId, filename, messages, addMessage, updateLastMessage, resetChat, setGenerating, isGenerating } = useChatStore();
  const [query, setQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || !currentDocId || isGenerating) return;

    const userQuery = query;
    setQuery('');
    addMessage({ role: 'user', content: userQuery });
    addMessage({ role: 'assistant', content: '' });
    setGenerating(true);

    try {
      const url = `http://localhost:8000/chat-stream?doc_id=${currentDocId}&query=${encodeURIComponent(userQuery)}`;
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        const data = event.data;
        updateLastMessage(data);
      };

      eventSource.onerror = (err) => {
        console.error('EventSource failed:', err);
        eventSource.close();
        setGenerating(false);
      };

      // In a real app, we'd have a way to know when the stream finishes
      // For now, we'll use a timeout or a specific end-of-stream message
    } catch (err) {
      console.error('Chat failed:', err);
      setGenerating(false);
    } finally {
      // Small delay to simulate completion if stream doesn't close perfectly
      setTimeout(() => setGenerating(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#111] rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111]/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button onClick={resetChat} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-semibold text-sm line-clamp-1">{filename}</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-green-500 uppercase tracking-widest font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active Session
            </div>
          </div>
        </div>
        <button onClick={resetChat} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-gray-400 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                <Bot size={18} />
              </div>
            )}
            
            <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`
                p-4 rounded-2xl inline-block
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'}
              `}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content || (isGenerating && idx === messages.length - 1 ? '...' : '')}</p>
              </div>
              
              {msg.role === 'assistant' && msg.content && (
                <div className="flex items-center gap-3 mt-1 ml-1">
                  <button className="text-gray-500 hover:text-white transition-colors"><Copy size={14} /></button>
                  <button className="text-gray-500 hover:text-white transition-colors"><RotateCcw size={14} /></button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 flex-shrink-0">
                <User size={18} />
              </div>
            )}
          </motion.div>
        ))}
        {isGenerating && messages[messages.length-1].content === '' && (
           <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Loader2 size={18} className="animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 italic">
                Thinking...
              </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-gradient-to-t from-[#111] via-[#111] to-transparent">
        <div className="relative max-w-3xl mx-auto">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything about the document..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-[60px] max-h-[200px]"
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || isGenerating}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all
              ${query.trim() && !isGenerating ? 'bg-blue-600 text-white scale-100 hover:bg-blue-500' : 'bg-white/5 text-gray-600 scale-90'}
            `}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-[0.2em]">
          Powered by Groq & Llama-3.1
        </p>
      </div>
    </div>
  );
};
