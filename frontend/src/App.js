import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import NewHomePage from "@/pages/NewHomePage";
import HomePage from "@/pages/HomePage";
import DecklistDetail from "@/pages/DecklistDetail";
import StatsPage from "@/pages/StatsPage";
import CardBrowser from "@/pages/CardBrowser";
import Master2PList from "@/pages/Master2PList";
import MasterListsHub from "@/pages/MasterListsHub";
import MasterExtraDeck from "@/pages/MasterExtraDeck";
import Layout from "@/components/Layout";

const UnderConstruction = () => (
  <div className="text-center py-24">
    <svg className="w-24 h-24 mx-auto text-gray-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4\" />
    </svg>
    <h1 className="text-4xl font-bold text-white mb-4">Under Construction</h1>
    <p className="text-gray-400 text-lg">This section is coming soon!</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<NewHomePage />} />
            <Route path="/decklists" element={<HomePage />} />
            <Route path="/decklist/:id" element={<DecklistDetail />} />
            <Route path="/cards" element={<CardBrowser />} />
            <Route path="/master-2p" element={<Master2PList />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/schedule" element={<UnderConstruction />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
