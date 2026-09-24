import { useState, useEffect } from 'react';
import { getTodayRecipes } from '../services/recipesService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';
import useAuthStore from '../../../store/useAuthStore.js';

function useTodayRecipes() {
  const [todayRecipes, setTodayRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { setGlobalErrorAction } = useAuthStore.getState();

  useEffect(() => {
    async function loadTodayRecipes() {
      try {
        const cached = localStorage.getItem('todayRecipes');

        if (cached) {
          const { date, recipes } = JSON.parse(cached);

          const today = new Date().toISOString().slice(0, 10);

          const cacheIsValid = date === today && Array.isArray(recipes) && recipes.length > 0;

          if (cacheIsValid) {
            setTodayRecipes(recipes);
            return;
          }

          // Se o cache não for válido
          localStorage.removeItem('todayRecipes');
        }

        setLoading(true);
        setLocalError(null);

        setGlobalErrorAction(null);

        const data = await getTodayRecipes();

        localStorage.setItem(
          'todayRecipes',
          JSON.stringify({ date: new Date().toISOString().slice(0, 10), recipes: data })
        );

        setTodayRecipes(data);
      } catch (error) {
        const handledError = errorHandler(error);

        if (handledError.scope === 'global') {
          // Seta 'globalError' (global)
          setGlobalErrorAction(handledError);
        } else if (handledError.scope === 'local') {
          setLocalError(handledError);
        }
      } finally {
        setLoading(false);
      }
    }

    loadTodayRecipes();
  }, [setGlobalErrorAction]);

  return { todayRecipes, loading, localError };
}

export default useTodayRecipes;
