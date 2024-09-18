// ./context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Type de l'utilisateur
interface User {
  id: string;
  email: string;
}

// Type du contexte d'authentification
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Récupérer l'utilisateur à partir de localStorage au premier rendu
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 jours en millisecondes

  // Stocker l'utilisateur et la date de connexion dans localStorage
  const login = async (email: string, password: string) => {
    if (email === 'test@example.com' && password === 'password') {
      const loggedInUser = { id: '1', email };

      // Stocker le user dans le localStorage avec le timestamp de connexion
      const loginTimestamp = new Date().getTime(); // Timestamp actuel
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('loginTimestamp', loginTimestamp.toString());

      setUser(loggedInUser);
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTimestamp');
  };

  // Vérifier la validité de la session lors du chargement de l'application
  useEffect(() => {
    const storedTimestamp = localStorage.getItem('loginTimestamp');
    if (storedTimestamp) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(storedTimestamp, 10);

      if (timeElapsed >= EXPIRATION_TIME) {
        // Si la session a expiré, forcer la déconnexion
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
