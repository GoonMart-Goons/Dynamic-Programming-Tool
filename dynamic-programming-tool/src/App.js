import './Styles/App.css'; 
import Landing from './Landing';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Introduction from './Introduction';
import QuestionsH from './QuestionsH';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./Database/Auth";
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
            <Route path="/questionsh" element={<PrivateRoute element={QuestionsH} />} />
            <Route path="/home" element={<PrivateRoute element={Home} />} />
            <Route path="/introduction" element={<PrivateRoute element={Introduction} />} />
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
