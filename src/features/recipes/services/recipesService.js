import apiFetch from '../../../services/api.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import todayRecipesDb from '../../../mocks/fakeTodayRecipesDb.js';

async function getTodayRecipes() {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.getTodayRecipes) {
        return await fakeApiError('mockFn com err = true no getTodayRecipes do recipesService');
      }

      return await fakeApi(todayRecipesDb);
    };

    const apiFn = async () => {
      return await apiFetch('/today-recipes');
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('recipesService/getTodayRecipes:', data);
    return Array.isArray(data) ? data : [];
  } catch (cause) {
    throw new Error('Falha no recipesService.getTodayRecipes', { cause });
  }
}

/*async function getSearchRecipes(search) {
  try {
  } catch (cause) {
    throw new Error('Falha no recipesService.getSearchRecipes', { cause });
  }
}*/

export { getTodayRecipes /*, getSearchRecipes*/ };
