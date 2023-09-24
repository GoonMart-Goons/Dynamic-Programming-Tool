import './Styles/App.css'; 
import Landing from './Landing';
import Login from './Login';
import Home from './Home';
import TopDown from './TopDown';
import BottomUp from './BottomUp';
import Register from './Register';
import Introduction from './Introduction';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<PrivateRoute element={Home} />} />
            <Route path="/topdown" element={<PrivateRoute element={TopDown} />} />
            <Route path="/bottomup" element={<PrivateRoute element={BottomUp} />} />
            <Route path="/introduction" element={<PrivateRoute element={Introduction} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
