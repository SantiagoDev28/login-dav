import React, { useEffect, useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import './index.css';

function App() {
  const [route, setRoute] = useState<string>(window.location.hash || '#/login');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/login');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === '#/register' || route === '#/signup') {
    return <RegisterPage />;
  }

  return <LoginPage />;
}

export default App;
