import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';

import { CreateCount } from './pages/CreateCount';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create',
    element: <CreateCount />,
  },
]);
