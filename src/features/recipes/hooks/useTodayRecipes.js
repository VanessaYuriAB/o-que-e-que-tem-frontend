import { useState, useEffect } from 'react';
import { getTodayRecipes } from '../services/recipesService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';

function useTodayRecipes() {
  const [todayRecipes, setTodayRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setError(null);

        const data = await getTodayRecipes();

        localStorage.setItem(
          'todayRecipes',
          JSON.stringify({ date: new Date().toISOString().slice(0, 10), recipes: data })
        );

        setTodayRecipes(data);
      } catch (error) {
        const handledError = errorHandler(error);
        setError(handledError);
      } finally {
        setLoading(false);
      }
    }

    loadTodayRecipes();
  }, []);

  return { todayRecipes, loading, error };
}

export default useTodayRecipes;
