'use client';

import { useChatStore } from '@/lib/store';
import { UploadZone } from '@/components/UploadZone';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { currentDocId } = useChatStore();

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 relative flex flex-col items-center justify-center p-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          {!currentDocId ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl z-10"
            >
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-4">
                  Talk to your Docs
                </h1>
                <p className="text-gray-400 text-lg">
                  Upload any PDF and extract insights in seconds with Llama-3.1
                </p>
              </div>
              <UploadZone />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full max-w-4xl z-10"
            >
              <ChatInterface />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
