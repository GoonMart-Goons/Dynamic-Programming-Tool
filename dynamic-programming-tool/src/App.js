import './Styles/App.css'; 
import Landing from './Landing';
import Login from './Login';
import Home from './Home';
import TopDown from './TopDown';
import BottomUp from './BottomUp';
import Register from './Register';
import Introduction from './Introduction';
import QuestionsH from './QuestionsH';
import Navbar from "./Components/Navbar";
import TopDownTest from './TopDownTest';
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
            <Route path="/topdown" element={<PrivateRoute element={TopDown} />} />
            <Route path="/bottomup" element={<PrivateRoute element={BottomUp} />} />
            <Route path="/introduction" element={<PrivateRoute element={Introduction} />} />
            <Route path="/navbar" element={<Navbar/>}/>
          <Route path="/topdowntest" element={<PrivateRoute element={TopDownTest} />}/>
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
