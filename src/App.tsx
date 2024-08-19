import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/Clients';
import AddressesPage from './pages/Addresses';
import DependentsPage from './pages/Dependents';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<ClientsPage />} />
        <Route path={'/addresses'} element={<AddressesPage />} />
        <Route path={'/dependents'} element={<DependentsPage />} />
      </Routes>
    </Router>
  );
}
