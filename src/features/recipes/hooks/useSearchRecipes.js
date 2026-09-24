import { useState } from 'react';
import { getSearchRecipes } from '../services/recipesService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';
import useAuthStore from '../../../store/useAuthStore.js';

function useSearchRecipes() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { setGlobalErrorAction } = useAuthStore.getState();

  async function loadSearchRecipes(searchData) {
    setLoading(true);
    setLocalError(null);
    setSearchedRecipes([]);

    setGlobalErrorAction(null);

    try {
      const data = await getSearchRecipes(searchData);
      setSearchedRecipes(data);

      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);

      if (handledError.scope === 'global') {
        // Seta 'globalError' (global)
        setGlobalErrorAction(handledError);
      } else if (handledError.scope === 'local') {
        setLocalError(handledError);
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { loadSearchRecipes, loading, localError, searchedRecipes };
}

export default useSearchRecipes;
