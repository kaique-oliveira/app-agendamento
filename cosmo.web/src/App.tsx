import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateCount } from './pages/CreateCount';
import { PrivateRoute } from './components/PrivateRoute';
import { Setting } from './pages/Setting';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { StoreProvider } from './context/store.context';
import { LoadingProvider } from './context/loading.context';
import { ToastProvider } from './context/toast.context';
import { DialogProvider } from './context/dialog.context';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LoadingProvider>
          <ToastProvider>
            <DialogProvider>
              <AuthProvider>
                <StoreProvider>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<CreateCount />} />

                    {/* private */}
                    <Route
                      path="/"
                      element={<PrivateRoute element={<Home />} />}
                    />

                    <Route
                      path="/settings"
                      element={<PrivateRoute element={<Setting />} />}
                    />
                  </Routes>
                </StoreProvider>
              </AuthProvider>
            </DialogProvider>
          </ToastProvider>
        </LoadingProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
