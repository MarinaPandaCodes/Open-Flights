import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import UserBookings from "./components/UserBookings";
import Home from './components/Home';
import Airlines from './components/Airlines/Airlines';
import Airline from './components/Airline/Airline';
import Login from './pages/Login';
import Signup from './pages/Signup';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/airlines" element={<Airlines />} />
        <Route path="/airlines/:slug" element={<Airline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         {/* Protected route */}
        <Route
          path="/airlines"
          element={
            <ProtectedRoute>
              <Airlines />
            </ProtectedRoute>
          }/>
          <Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <UserBookings />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;