
import React from 'react';
import AdCard from '../components/AdCard';
import { Icons } from '../constants';
import { Ad } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface HomeProps {
  ads: Ad[];
}

const Home: React.FC<HomeProps> = ({ ads }) => {
  const navigate = useNavigate();
  const trendingServices = ads.filter(ad => ad.type === 'serviço').slice(0, 4);
  const trendingItems = ads.filter(ad => ad.type === 'produto').slice(0, 4);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('ecossistema');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroNegotiate = () => {
    // Redireciona para o primeiro anúncio para simular o fluxo
    if (ads.length > 0) {
      navigate(`/anuncio/${ads[0].id}`);
    }
  };

  return (
    <div className="bg-[#fbfcfd] space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Coluna Esquerda: Texto */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Novo: Agendamento Direto de Serviços</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Troque Valor.<br />
              <span className="text-emerald-500">Crie Experiências.</span>
            </h1>
            
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
              Permutei é o mercado híbrido para trocar ativos de alto valor por serviços profissionais. 
              Transforme seus eletrônicos sem uso em cuidados pessoais ou trabalho criativo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/marketplace" className="bg-emerald-500 text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 text-center">
                Explorar Marketplace
              </Link>
              <button 
                onClick={scrollToHowItWorks}
                className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:border-slate-200 transition-all text-center"
              >
                Como Funciona
              </button>
            </div>

            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Icons.CheckBadge className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profissionais Verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.CheckBadge className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Garantia de Pagamento</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Card Flutuante */}
          <div className="relative hidden lg:block animate-in slide-in-from-right duration-1000">
            <div className="relative z-10 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 max-w-sm ml-auto">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-xl font-black text-slate-900">Proposta de Troca</h3>
                <span className="bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-sm italic">R$400</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">⌚</div>
                  <span className="font-bold text-slate-700">Apple Watch</span>
                </div>
                <div className="flex items-center justify-center w-8 h-8 mx-auto text-emerald-500 font-black">+</div>
                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">✂️</div>
                  <span className="font-bold text-emerald-700">10 Cortes de Cabelo</span>
                </div>
              </div>

              <button 
                onClick={handleHeroNegotiate}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest mb-4 hover:bg-emerald-600 transition-all active:scale-95"
              >
                Aceitar Negócio
              </button>
              
              <div className="flex items-center justify-center gap-2">
                <Icons.CheckBadge className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Negócio Seguro - Verificado</span>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* 2. SERVIÇOS BEM AVALIADOS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Serviços Bem Avaliados</h2>
            <p className="text-slate-500 font-medium italic">Serviços profissionais que você pode trocar</p>
          </div>
          <Link to="/servicos" className="text-sm font-black text-emerald-500 uppercase tracking-widest hover:translate-x-1 transition-transform">Ver Todos os Serviços →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingServices.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </section>

      {/* 3. ECOSSISTEMA DE VALOR */}
      <section id="ecossistema" className="bg-slate-900 py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">O Ecossistema de Valor</h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto">Não apenas venda. Transforme seus ativos no que você realmente precisa.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-slate-800/50 p-10 rounded-[40px] border border-slate-700 hover:border-emerald-500/50 transition-all group">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <Icons.Lightning className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Permuta Inteligente</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Troque produtos físicos por serviços .</p>
            </div>
            <div className="bg-slate-800/50 p-10 rounded-[40px] border border-slate-700 hover:border-yellow-500/50 transition-all group">
              <div className="w-16 h-16 bg-yellow-400 text-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                <Icons.Currency className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Créditos Internos</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Ganhe créditos ao desapegar de itens e use como moeda de troca em qualquer serviço.</p>
            </div>
            <div className="bg-slate-800/50 p-10 rounded-[40px] border border-slate-700 hover:border-blue-500/50 transition-all group">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Icons.CheckBadge className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Profissionais Verificados</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Todos os prestadores passam por uma curadoria para garantir entregas de alta qualidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ITENS EM ALTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Itens em Alta</h2>
            <p className="text-slate-500 font-medium italic">Produtos de alto valor disponíveis para troca ou compra</p>
          </div>
          <Link to="/produtos" className="text-sm font-black text-emerald-500 uppercase tracking-widest hover:translate-x-1 transition-transform">Ver Todos os Produtos →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingItems.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
