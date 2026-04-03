'use client';

import { MessageSquare, LayoutDashboard, Settings, HelpCircle, LogOut, Plus } from 'lucide-react';
import { useChatStore } from '@/lib/store';

export const Sidebar = () => {
  const { resetChat } = useChatStore();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: MessageSquare, label: 'Chat History' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-4 z-30">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">P</div>
        <span className="font-bold text-lg tracking-tight">PDF.ai</span>
      </div>

      <button 
        onClick={resetChat}
        className="flex items-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white rounded-xl p-3 transition-all mb-8 border border-white/5"
      >
        <Plus size={18} />
        <span className="text-sm font-medium">New Chat</span>
      </button>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`
              flex items-center gap-3 w-full p-3 rounded-xl transition-all
              ${item.active ? 'bg-blue-600/10 text-blue-500' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
            `}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/5 space-y-1">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all">
          <HelpCircle size={20} />
          <span className="text-sm font-medium">Support</span>
        </button>
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all">
          <LogOut size={20} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
