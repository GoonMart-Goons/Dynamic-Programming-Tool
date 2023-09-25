import './Styles/App.css'; 
import Landing from './Landing';
import Login from './Login';
import Home from './Home';
import TopDown from './TopDown';
import BottomUp from './BottomUp';
import Register from './Register';
import Introduction from './Introduction';
import Navbar from "./Components/Navbar";
import TopDownTest from './TopDownTest';
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
          <Route path="/navbar" element={<Navbar/>}/>
          <Route path="/topdowntest" element={<TopDownTest/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;