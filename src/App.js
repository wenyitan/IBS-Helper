import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import IbsHelper from './pages/IbsHelper';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<IbsHelper />} />
      </Routes>
    </Router>
  );
}

export default App;
