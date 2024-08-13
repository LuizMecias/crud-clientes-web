import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AddressPage from '../pages/Adress';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/address/:cpf',
    element: <AddressPage />,
  },
]);
