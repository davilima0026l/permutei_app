
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white text-3xl font-black rounded-2xl mb-6">P</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {isRegister ? 'Crie sua conta' : 'Bem-vindo de volta'}
        </h1>
        <p className="text-slate-500">
          {isRegister ? 'Comece a negociar e permutar hoje.' : 'Acesse sua conta para gerenciar seus anúncios.'}
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Seu nome" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 mt-2"
          >
            {isRegister ? 'Cadastrar Agora' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            {isRegister ? 'Já possui uma conta? Entrar' : 'Não tem uma conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
