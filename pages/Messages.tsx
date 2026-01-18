
import React, { useState } from 'react';
import { Conversation, User } from '../types';
import { Icons } from '../constants';

interface MessagesProps {
  conversations: Conversation[];
  currentUser: User | null;
  onSendMessage: (conversationId: string, text: string) => void;
}

const Messages: React.FC<MessagesProps> = ({ conversations, currentUser, onSendMessage }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversationId) {
      onSendMessage(selectedConversationId, newMessage);
      setNewMessage('');
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-20 px-6">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Acesse sua conta para ver mensagens</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-144px)] md:h-[calc(100vh-100px)] px-4 md:px-12 py-6 flex gap-6 animate-in fade-in duration-500">
      {/* Sidebar: Lista de Conversas */}
      <aside className={`w-full md:w-80 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col overflow-hidden ${selectedConversationId && 'hidden md:flex'}`}>
        <div className="p-6 border-b border-slate-50">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Mensagens</h1>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.length > 0 ? (
            conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`w-full flex items-center gap-4 p-5 transition-colors border-b border-slate-50 last:border-0 ${
                  selectedConversationId === conv.id ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={conv.participantAvatar} alt={conv.participantName} className="w-12 h-12 rounded-2xl object-cover" />
                  {conv.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-black text-slate-900 line-clamp-1">{conv.participantName}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{conv.lastMessage}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-10 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nenhuma conversa ativa</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main: Janela de Chat */}
      <main className={`flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col overflow-hidden ${!selectedConversationId && 'hidden md:flex'}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedConversationId(null)} className="md:hidden p-2 -ml-2 text-slate-400">
                  <Icons.ArrowLeft className="w-5 h-5" />
                </button>
                <img src={selectedConversation.participantAvatar} alt={selectedConversation.participantName} className="w-10 h-10 rounded-xl" />
                <div>
                  <h2 className="text-sm font-black text-slate-900">{selectedConversation.participantName}</h2>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online agora</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30">
              {selectedConversation.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-bold leading-relaxed ${
                      isMe 
                        ? 'bg-slate-900 text-white rounded-tr-none' 
                        : 'bg-white text-slate-900 border border-slate-100 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                      <div className={`text-[9px] mt-2 font-black uppercase tracking-widest ${isMe ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-3 px-5 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm text-slate-900 font-bold"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-emerald-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-500 mb-6">
              <Icons.Chat className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Selecione uma conversa</h2>
            <p className="text-sm text-slate-500 max-w-xs font-medium">Inicie um papo com profissionais e vendedores para fechar sua permuta.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
