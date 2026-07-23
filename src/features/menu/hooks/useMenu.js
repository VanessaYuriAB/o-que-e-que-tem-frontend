import { useEffect, useState } from 'react';
import { getMenu } from '../services/menuService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';

export default function useMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      setError(null);

      try {
        const menuData = await getMenu();
        setMenuItems(menuData);
      } catch (error) {
        /*
        console.error(error.message); // 'Falha no getMenu'
        console.error(error.cause); // { type: 'api', status: 404, data: ... }
        console.error(error.stack); // stack trace completa
        */

        const handledError = errorHandler(error); // converte erro
        setError(handledError); // obj puro para o estado, contendo: msg, scope, status e action
      } finally {
        setLoading(false);
      }
    }

    fetchMenu(); // primeira carga imediata

    const interval = setInterval(fetchMenu, 60000); // atualização periódica, polling

    return () => clearInterval(interval); // limpeza
  }, []);

  return { menuItems, loading, error };
}
