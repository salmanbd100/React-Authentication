import React from 'react';
import { createAuthProvider } from 'AuthService';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'router';
const { useAuth } = createAuthProvider();

function App() {
  const [logged] = useAuth();
  console.log(logged);
  return (
    <BrowserRouter>
      <AppRouter isAuth={logged} />
    </BrowserRouter>
  );
}

export default App;
