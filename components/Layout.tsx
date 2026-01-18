
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../constants';
import { usePermuteiStore } from '../store';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, rechargeWallet } = usePermuteiStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleRecharge = (amount: number) => {
    rechargeWallet(amount);
    setShowWallet(false);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      {/* Header Premium */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-100 z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black">P</div>
            <span className="hidden sm:block">Permutei</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/marketplace" className={`text-sm font-semibold ${isActive('/marketplace') ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>Marketplace</Link>
            <Link to="/servicos" className={`text-sm font-semibold ${isActive('/servicos') ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>Serviços</Link>
            <Link to="/produtos" className={`text-sm font-semibold ${isActive('/produtos') ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>Produtos</Link>
          </nav>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full group">
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500" />
            <input 
              type="text" 
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-full py-2.5 pl-11 pr-4 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm"
            />
          </div>
        </form>

        <div className="flex items-center gap-3 md:gap-4 relative">
          {/* CARTEIRA VIRTUAL */}
          {isAuthenticated && auth.user && (
            <button 
              onClick={() => { setShowWallet(!showWallet); setShowNotifications(false); }}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3 py-2 rounded-2xl transition-all"
            >
              <Icons.Wallet className="w-5 h-5 text-emerald-500" />
              <div className="text-left leading-none hidden sm:block">
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-0.5">Saldo</span>
                <span className="text-xs font-black text-slate-900">R$ {auth.user.walletBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </button>
          )}

          {/* NOTIFICAÇÕES - UPGRADED UI */}
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowWallet(false); }}
            className={`p-2.5 rounded-2xl transition-all relative ${showNotifications ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Icons.Bell className="w-6 h-6" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* MODAL NOTIFICAÇÕES APRIMORADO */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-200 z-[100]">
              <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Atividade</h3>
                <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Limpar</button>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="px-6 py-4 bg-slate-50/50">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Hoje</span>
                </div>
                
                {[
                  { title: 'Nova Proposta!', desc: 'Sarah enviou uma oferta para seu Apple Watch.', icon: '⚡', time: '2m' },
                  { title: 'Troca Concluída', desc: 'Sua troca com Marcos foi avaliada com 5 estrelas.', icon: '⭐', time: '1h' }
                ].map((notif, i) => (
                  <div key={i} className="px-6 py-4 flex gap-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0 text-xl">
                      {notif.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-xs font-black text-slate-900 line-clamp-1">{notif.title}</span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{notif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 border-t border-slate-50">
                Ver todo o histórico
              </button>
            </div>
          )}

          {/* MODAL CARTEIRA */}
          {showWallet && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200 z-[100]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                  <Icons.Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Carteira</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Saldo Permutei</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-center border border-slate-100">
                <span className="text-2xl font-black text-slate-900">R$ {auth.user?.walletBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 500].map(val => (
                  <button 
                    key={val}
                    onClick={() => handleRecharge(val)}
                    className="bg-white border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 py-2 rounded-xl text-xs font-black text-slate-600 transition-all"
                  >
                    +{val}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isAuthenticated ? (
            <Link to="/perfil" className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden ring-2 ring-transparent hover:ring-emerald-500 transition-all shadow-sm">
              <img src={auth.user?.avatar || "https://ui-avatars.com/api/?name=User&background=10b981&color=fff"} alt="User" />
            </Link>
          ) : (
            <Link to="/login" className="bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">Entrar</Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pt-20">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 z-50 grid grid-cols-5 items-center md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <Link to="/" className={`flex flex-col items-center justify-center h-full gap-1 ${isActive('/') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Icons.Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Início</span>
        </Link>

        <Link to="/mensagens" className={`flex flex-col items-center justify-center h-full gap-1 ${isActive('/mensagens') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Icons.Chat className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Chat</span>
        </Link>

        {/* BOTÃO CENTRAL + NOVO */}
        <Link to="/criar" className="flex flex-col items-center justify-center h-full">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 active:scale-90 transition-transform -mt-6">
            <Icons.Plus className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mt-1">Novo</span>
        </Link>

        <Link to="/produtos" className={`flex flex-col items-center justify-center h-full gap-1 ${isActive('/produtos') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Icons.Tag className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Produtos</span>
        </Link>

        <Link to="/servicos" className={`flex flex-col items-center justify-center h-full gap-1 ${isActive('/servicos') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Icons.Briefcase className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Serviços</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
