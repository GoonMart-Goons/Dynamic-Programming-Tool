import './Styles/App.css'; 
import Landing from './Landing';
import Login from './Login';
import Home from './Home';
import TopDown from './TopDown';
import BottomUp from './BottomUp';
import Register from './Register';
import Introduction from './Introduction';
import Navbar from "./Navbar";
import FibChecker from "./FibChecker";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topdown" element={<TopDown />} />
          <Route path="/bottomup" element={<BottomUp />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/introduction" element={<Introduction />}/>
          <Route path="/fibchecker" element={<FibChecker/>}/>
          <Route path="/navbar" element={<Navbar/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;