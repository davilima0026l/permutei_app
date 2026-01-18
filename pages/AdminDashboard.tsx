
import React from 'react';
import { usePermuteiStore } from '../store';
import { Icons } from '../constants';

const AdminDashboard: React.FC = () => {
  const { platformStats } = usePermuteiStore();

  const statsCards = [
    { title: 'Faturamento Total', value: platformStats.totalRevenue, icon: <Icons.Currency className="w-6 h-6" />, color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Taxas de Serviço', value: platformStats.feesCollected, icon: <Icons.Lightning className="w-6 h-6" />, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Receita Assinaturas', value: platformStats.subscriptionRevenue, icon: <Icons.CheckBadge className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
    { title: 'Destaques Pagos', value: platformStats.highlightRevenue, icon: <Icons.Tag className="w-6 h-6" />, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Financeiro Permutei</h1>
          <p className="text-slate-500 font-medium italic">Gestão centralizada de lucros e transações</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Tempo Real
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsCards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-6`}>
              {card.icon}
            </div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{card.title}</h3>
            <div className="text-2xl font-black text-slate-900">R$ {card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Fluxo de Caixa Recente</h2>
          <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Exportar Relatório</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transação</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Usuário</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {platformStats.transactions.length > 0 ? (
                platformStats.transactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="text-sm font-black text-slate-900">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tx.type}</div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-600">{tx.userName}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">R$ {tx.amount.toFixed(2)}</td>
                    <td className="px-8 py-5 text-[10px] text-slate-400 font-bold uppercase">{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-8 py-5">
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">Concluído</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic text-sm">Nenhuma transação registrada hoje.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
