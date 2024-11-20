import './App.css';
import Nav from './Componnents/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Componnents/Home';
import Login from './Componnents/Login';
import SignUp from './Componnents/Signup';
import Sell from './Componnents/Sell';
import Buy from './Componnents/Buy';
import PurchaseConfirmation from './Componnents/PurchaseConfirmation';
import Admin from './Componnents/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/confirmation" element={<PurchaseConfirmation />} />

          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
