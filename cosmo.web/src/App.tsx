import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateCount } from './pages/CreateCount';
import { PrivateRoute } from './components/PrivateRoute';
import { Item } from './pages/Item';
import { Setting } from './pages/Setting';
import { Scheduling } from './pages/Scheduling';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateCount />} />

          {/* private */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/items" element={<PrivateRoute element={<Item />} />} />
          <Route
            path="/scheduling"
            element={<PrivateRoute element={<Scheduling />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Setting />} />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
