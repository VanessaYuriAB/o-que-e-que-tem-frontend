import { useState } from 'react';
import { getSearchRecipes } from '../services/recipesService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';

function useSearchRecipes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadSearchRecipes(searchData) {
    setLoading(true);
    setError(null);

    try {
      const data = await getSearchRecipes(searchData);
      return { success: true, data };
    } catch (error) {
      const handledError = errorHandler(error);
      setError(handledError);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { loadSearchRecipes, loading, error };
}

export default useSearchRecipes;
