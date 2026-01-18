
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import AdDetail from './pages/AdDetail';
import CreateAd from './pages/CreateAd';
import MyAds from './pages/MyAds';
import Profile from './pages/Profile';
import Marketplace from './pages/Marketplace';
import Messages from './pages/Messages';
import MakeProposal from './pages/MakeProposal';
import Favorites from './pages/Favorites';
import Plans from './pages/Plans';
import AdminDashboard from './pages/AdminDashboard';
import { usePermuteiStore } from './store';

const App: React.FC = () => {
  const { ads, conversations, auth, login, logout, addAd, removeAd, sendMessage } = usePermuteiStore();

  const handleSendProposal = (adId: string, text: string, image?: string) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    const existingConv = conversations.find(c => c.participantId === ad.userId);
    const convId = existingConv ? existingConv.id : (conversations[0]?.id || 'c1');
    const finalMessage = image ? `${text} [Anexo: Imagem da Oferta]` : text;
    sendMessage(convId, finalMessage);
  };

  return (
    <Router>
      <Layout isAuthenticated={auth.isAuthenticated}>
        <Routes>
          <Route path="/" element={<Home ads={ads} />} />
          <Route path="/marketplace" element={<Marketplace ads={ads} title="Marketplace" />} />
          <Route path="/servicos" element={<Marketplace ads={ads} title="Serviços" typeFilter="serviço" />} />
          <Route path="/produtos" element={<Marketplace ads={ads} title="Produtos" typeFilter="produto" />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="/login" element={!auth.isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/anuncio/:id" element={<AdDetail ads={ads} />} />
          
          <Route path="/criar" element={auth.isAuthenticated ? <CreateAd onAdd={addAd} /> : <Navigate to="/login" />} />
          <Route path="/proposta/:id" element={auth.isAuthenticated ? ( <MakeProposal ads={ads} onSendProposal={handleSendProposal} /> ) : <Navigate to="/login" />} />
          <Route path="/mensagens" element={auth.isAuthenticated ? ( <Messages conversations={conversations} currentUser={auth.user} onSendMessage={sendMessage} /> ) : <Navigate to="/login" />} />
          <Route path="/favoritos" element={auth.isAuthenticated ? ( <Favorites ads={ads} favoriteIds={auth.user?.favoriteIds || []} /> ) : <Navigate to="/login" />} />
          <Route path="/meus-anuncios" element={auth.isAuthenticated ? <MyAds ads={ads} user={auth.user} onDelete={removeAd} /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={auth.isAuthenticated ? <Profile user={auth.user} onLogout={logout} /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
