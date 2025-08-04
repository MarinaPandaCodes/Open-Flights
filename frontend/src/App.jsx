import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Airlines from './components/Airlines/Airlines';
import Airline from './components/Airline/Airline';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/airlines" element={<Airlines />} />
        <Route path="/airlines/:slug" element={<Airline />} />
      </Routes>
    </Router>
  );
}

export default App;