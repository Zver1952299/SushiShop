import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Contacts from './pages/Conacts';
import AboutUs from './pages/AboutUs';
import FullSushi from './pages/FullSushi';
import NotFound from './pages/NotFound';

import './scss/App.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/SushiShop" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fullsushi/:sushiId" element={<FullSushi />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
