
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import { Icons } from '../constants';
import { usePermuteiStore } from '../store';

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { platformStats } = usePermuteiStore();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  if (!user) return null;

  const myTransactions = platformStats.transactions.filter(tx => tx.userId === user.id);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 animate-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="h-40 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/10 opacity-50"></div>
          {user.isPro && (
             <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Membro Pro</div>
          )}
          <div className="absolute -bottom-12 left-10 w-28 h-28 rounded-[32px] border-4 border-white overflow-hidden bg-slate-200 shadow-xl">
            <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10b981&color=fff`} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="pt-16 pb-10 px-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                {user.isPro && (
                  <Icons.CheckBadge className="w-6 h-6 text-emerald-500" />
                )}
              </div>
              <p className="text-slate-500 font-medium italic mb-3">{user.email}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                <Icons.Lightning className="w-3.5 h-3.5 text-emerald-500" />
                {user.location || 'Brasil'}
              </div>
            </div>
            {!user.isPro ? (
              <Link 
                to="/planos"
                className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Seja Pro
              </Link>
            ) : (
               <button className="px-6 py-3 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-100">Configurar Pro</button>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-50">
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900">12</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Trocas</div>
            </div>
            <div className="text-center border-x border-slate-100 px-4">
              <div className="text-2xl font-black text-slate-900">4.9</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900">R${user.walletBalance.toFixed(0)}</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Saldo</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Financeiro & Atividade</h2>
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
          
          <Link to="/favoritos" className="w-full flex items-center justify-between px-8 py-6 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                <Icons.Home className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-slate-900 uppercase tracking-widest">Itens Salvos</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sua galeria de favoritos</span>
              </div>
            </div>
            <Icons.ArrowLeft className="w-4 h-4 text-slate-300 rotate-180" />
          </Link>

          <Link to="/meus-anuncios" className="w-full flex items-center justify-between px-8 py-6 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                <Icons.List className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-slate-900 uppercase tracking-widest">Meus Anúncios</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gerenciar suas ofertas</span>
              </div>
            </div>
            <Icons.ArrowLeft className="w-4 h-4 text-slate-300 rotate-180" />
          </Link>

          {/* HISTÓRICO FINANCEIRO */}
          <div className="px-8 py-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-500">
                <Icons.Wallet className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-slate-900 uppercase tracking-widest">Extrato de Carteira</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Suas últimas movimentações</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {myTransactions.length > 0 ? (
                myTransactions.map((tx, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <span className="block text-xs font-black text-slate-900">{tx.description}</span>
                      <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">{new Date(tx.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <span className={`text-xs font-black ${tx.type === 'recarga' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {tx.type === 'recarga' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Nenhuma movimentação recente</div>
              )}
            </div>
          </div>

          <Link to="/admin" className="w-full flex items-center justify-between px-8 py-6 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-900 text-white transition-all shadow-sm">
                <Icons.Currency className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-slate-900 uppercase tracking-widest">Painel Admin</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gestão da plataforma</span>
              </div>
            </div>
            <Icons.ArrowLeft className="w-4 h-4 text-slate-300 rotate-180" />
          </Link>

          <button onClick={onLogout} className="w-full flex items-center justify-between px-8 py-6 hover:bg-red-50 transition-colors group">
            <div className="flex items-center gap-4 text-red-500">
              <div className="p-3 rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Icons.User className="w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Sair da Conta</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
