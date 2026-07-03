import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes.jsx';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore.js';

function App() {
  const refreshAction = useAuthStore((state) => state.refreshAction);

  useEffect(() => {
    async function verifyUserSession() {
      await refreshAction();
    }

    verifyUserSession();
  }, [refreshAction]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
