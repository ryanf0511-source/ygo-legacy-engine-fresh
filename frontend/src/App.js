import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import HomePage from "@/pages/HomePage";
import DecklistDetail from "@/pages/DecklistDetail";
import StatsPage from "@/pages/StatsPage";
import CardBrowser from "@/pages/CardBrowser";
import Layout from "@/components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/decklist/:id" element={<DecklistDetail />} />
            <Route path="/cards" element={<CardBrowser />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
