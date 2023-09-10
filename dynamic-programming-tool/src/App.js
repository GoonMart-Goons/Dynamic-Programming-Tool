import './Styles/App.css'; 
import Landing from './Landing';
import Login from './Login';
import Home from './Home';
import Register from './Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;