import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Mic, SendHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock messages
const INITIAL_MESSAGES = [
  { id: 1, text: "Hey! Just saw your profile.", sender: "them", time: "10:20 AM" },
  { id: 2, text: "I still can't believe you hate coffee ☕", sender: "them", time: "10:21 AM" },
  { id: 3, text: "Haha! I know, it's a crime right?", sender: "me", time: "10:25 AM" },
  { id: 4, text: "Matcha is just superior tbh 🍵", sender: "me", time: "10:25 AM" }
];

export default function ChatDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { 
      id: Date.now(), 
      text: input, 
      sender: "me", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
  };

  return (
    <>
      <Head>
        <title>Chat | MisMatch</title>
      </Head>
      <main className="h-screen bg-[#FAFAFE] flex flex-col">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-[#F3F0FF] p-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/chat" className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
              <ArrowLeft size={24} className="text-[#1E1B2E]" />
            </Link>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" 
                alt="Aisha" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#86EFAC] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-[#1E1B2E]">Aisha</h2>
              <p className="text-xs text-[#A78BFA] font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#A78BFA]">
            <button className="active:scale-90 transition-transform"><Video size={22} /></button>
            <button className="active:scale-90 transition-transform"><Phone size={20} /></button>
            <button className="active:scale-90 transition-transform text-[#9CA3AF]"><MoreVertical size={22} /></button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Icebreaker Card */}
          <div className="bg-gradient-to-r from-[#F3F0FF] to-[#FCE7F3] rounded-3xl p-4 my-6 mx-2 border border-white shadow-sm flex items-start gap-3">
            <span className="text-2xl mt-1">🧊</span>
            <div>
              <p className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider mb-1">Icebreaker</p>
              <p className="text-sm font-medium text-[#1E1B2E]">You both love <b>Dogs</b> but disagree on <b>Coffee</b>. Who makes the better morning beverage?</p>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs font-medium text-[#9CA3AF] bg-white px-3 py-1 rounded-full border border-[#F3F0FF]">Today</span>
          </div>

          {messages.map(msg => {
            const isMe = msg.sender === "me";
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
                <div 
                  className={`max-w-[75%] px-4 py-3 text-[15px] shadow-sm ${
                    isMe 
                      ? 'bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] text-white rounded-3xl rounded-tr-sm' 
                      : 'bg-white text-[#1E1B2E] border border-[#F3F0FF] rounded-3xl rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] text-[#9CA3AF] mt-1 px-2 font-medium">{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 pb-safe border-t border-[#F3F0FF]">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <button type="button" className="p-3 bg-[#F3F0FF] text-[#A78BFA] rounded-full shrink-0 active:scale-95 transition-transform">
              <Plus size={20} />
            </button>
            
            <div className="flex-1 bg-[#FAFAFE] border border-[#F3F0FF] rounded-3xl px-4 py-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent py-1 outline-none text-[#1E1B2E] text-[15px] placeholder-[#9CA3AF]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="button" className="text-[#9CA3AF] p-1 active:scale-95 transition-transform">
                <Mic size={20} />
              </button>
            </div>

            <button 
              type="submit" 
              disabled={!input.trim()}
              className={`p-3 rounded-full shrink-0 transition-all ${
                input.trim() 
                  ? 'bg-[#A78BFA] text-white shadow-md shadow-[#A78BFA]/30 active:scale-95' 
                  : 'bg-[#F3F0FF] text-[#D8B4E2]'
              }`}
            >
              <SendHorizontal size={20} className={input.trim() ? "ml-0.5" : ""} />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
