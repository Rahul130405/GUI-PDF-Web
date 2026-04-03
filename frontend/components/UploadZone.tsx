'use client';

import { useState } from 'react';
import { useChatStore } from '@/lib/store';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadZone = () => {
  const { setUploading, isUploading, setCurrentDoc } = useChatStore();
  const [isOver, setIsOver] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file || file.type !== 'application/pdf') return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setCurrentDoc(data.doc_id, data.filename);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        const file = e.dataTransfer.files[0];
        handleUpload(file);
      }}
      whileHover={{ scale: 1.01 }}
      className={`
        relative border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer
        flex flex-col items-center justify-center gap-4
        ${isOver ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/5'}
      `}
    >
      <input
        type="file"
        accept=".pdf"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={isUploading}
      />

      {isUploading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-400 font-medium animate-pulse">Processing your PDF...</p>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold mb-1">Click or drag PDF here</p>
            <p className="text-gray-400">Supported format: PDF (max 10MB)</p>
          </div>
          
          <div className="mt-8 flex gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FileText size={14} />
              Fast Extraction
            </div>
            <span>•</span>
            <div>Groq Powered</div>
            <span>•</span>
            <div>Secure Storage</div>
          </div>
        </>
      )}
    </motion.div>
  );
};
