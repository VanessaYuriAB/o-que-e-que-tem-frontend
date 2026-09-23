import { useState } from 'react';
import { getSearchRecipes } from '../services/recipesService.js';
import errorHandler from '../../../shared/utils/errorHandler.js';

function useSearchRecipes() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadSearchRecipes(searchData) {
    setLoading(true);
    setError(null);
    setSearchedRecipes([]);

    try {
      const data = await getSearchRecipes(searchData);
      setSearchedRecipes(data);

      return { success: true };
    } catch (error) {
      const handledError = errorHandler(error);
      setError(handledError);

      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  return { loadSearchRecipes, loading, error, searchedRecipes };
}

export default useSearchRecipes;
