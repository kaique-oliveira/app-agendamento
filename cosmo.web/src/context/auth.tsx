import { useLocation, useNavigate } from 'react-router-dom';
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../libs/api';
import { CustomError } from '../helpers/customError';
import { IUser } from '../Interfaces';
import { useToast } from '../hooks/useToast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentiasl: ICredentials) => void;
  logout(): void;
  isLoading: boolean;
  user: IUser | null;
  setIsLoading(value: boolean): void;
  validateToken(value: string): Promise<boolean>;
  titlePage: string;
  setTitlePage(value: string): void;
  setUser(user: IUser | null): void;
}

export interface ICredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const { onShowToast } = useToast();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [currentPath] = useState(location.pathname);
  const [titlePage, setTitlePage] = useState('');

  const login = async (credentiasl: ICredentials) => {
    try {
      setIsLoading(true);
      const res = await api.post('/auth/login', credentiasl);

      setTimeout(() => {
        setIsLoading(false);

        onShowToast({
          status: 'SUCCESS',
          text: `Bem vindo ${res.data.name}`,
        });

        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('user', JSON.stringify(res.data as IUser));
        setUser(res.data as IUser);

        setIsAuthenticated(true);
      }, 200);
    } catch (error) {
      const errCustom = error as CustomError;

      onShowToast({
        status: 'ERROR',
        text: `${errCustom.message}`,
      });

      setIsAuthenticated(false);
      localStorage.removeItem('token');
      setIsLoading(false);
      setUser(null);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const validateToken = async (token: string) => {
    setIsLoading(true);

    const response = await api.post('/auth/token-is-valid', { token: token });
    let tokenIsValid = false;

    if (response.status === 200) {
      if (response.data) {
        const user: IUser = JSON.parse(localStorage.getItem('user') ?? '{}');

        if (user && user.img && user.img.length > 0) {
          setUser(user);
        }

        setIsAuthenticated(true);
        tokenIsValid = true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }

    setIsLoading(false);
    return tokenIsValid;
  };

  useEffect(() => {
    const hasToken = window.localStorage.getItem('token');

    if (hasToken) {
      validateToken(hasToken);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !currentPath.includes('/create')) {
      navigate('/login');
    }

    if (!isAuthenticated && !currentPath.includes('/create')) {
      navigate('/login');
    }

    if (
      isAuthenticated &&
      (!currentPath.includes('/login') || !currentPath.includes('/create'))
    ) {
      navigate(currentPath);
    }

    if (
      isAuthenticated &&
      (currentPath.includes('/login') ||
        currentPath.includes('/create') ||
        currentPath === '/')
    ) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,
        user,
        setIsLoading,
        validateToken,
        titlePage,
        setTitlePage,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
