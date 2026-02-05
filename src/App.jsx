import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Forge from './pages/Forge';
import AiLab from './pages/AiLab';
import './index.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-lab" element={<AiLab />} />
          <Route path="/forge" element={<Forge />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
