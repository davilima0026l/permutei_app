
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermuteiStore } from '../store';
import { Icons } from '../constants';

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const { auth, subscribePro } = usePermuteiStore();

  const handleSubscribe = () => {
    if (auth.user && auth.user.walletBalance >= 19.90) {
      subscribePro();
      alert('Assinatura realizada com sucesso! Você agora é Pro.');
      navigate('/perfil');
    } else {
      alert('Saldo insuficiente na carteira. Recarregue para assinar.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-500 pb-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Evolua seu jeito de negociar</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Assine o Permutei Pro e tenha vantagens exclusivas para fechar mais negócios e economizar em taxas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gratuito */}
        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="mb-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Básico</span>
            <h3 className="text-3xl font-black text-slate-900">Plano Grátis</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">R$0</span>
              <span className="text-slate-400 font-bold">/mês</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10">
            {['Até 3 anúncios ativos', 'Taxa de serviço 5%', 'Chat ilimitado', 'Busca padrão'].map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                  <Icons.CheckBadge className="w-3.5 h-3.5 text-slate-400" />
                </div>
                {feat}
              </li>
            ))}
          </ul>

          <button className="w-full py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest cursor-not-allowed">
            Seu Plano Atual
          </button>
        </div>

        {/* PRO */}
        <div className="bg-slate-900 rounded-[40px] p-10 border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Mais Popular</div>
          
          <div className="mb-8">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-2">Premium</span>
            <h3 className="text-3xl font-black text-white">Permutei Pro</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">R$19,90</span>
              <span className="text-slate-400 font-bold">/mês</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10">
            {['Anúncios ilimitados', 'Taxa de serviço reduzida (2%)', 'Destaque prioritário', 'Selo Pro no perfil', 'Atendimento VIP'].map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Icons.CheckBadge className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                {feat}
              </li>
            ))}
          </ul>

          <button 
            onClick={handleSubscribe}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
          >
            Assinar Agora
          </button>
        </div>
      </div>

      <div className="mt-20 bg-emerald-50 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-100">
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Prefere o Plano Anual?</h2>
          <p className="text-slate-600 text-sm font-medium">Economize 20% pagando anualmente. De R$238 por apenas <span className="text-emerald-600 font-black">R$189,90</span>.</p>
        </div>
        <button className="bg-white text-slate-900 px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-colors">Ver Plano Anual</button>
      </div>
    </div>
  );
};

export default Plans;
