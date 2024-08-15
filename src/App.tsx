import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/Clients';
import AddressesPage from './pages/Addresses';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<ClientsPage />} />
        <Route path={'/addresses'} element={<AddressesPage />} />
      </Routes>
    </Router>
  );
}
