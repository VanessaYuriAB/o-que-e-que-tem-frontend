import apiFetch from '../../../services/api.js';
import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApi, fakeApiError } from '../../../shared/utils/fakeApi.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';
import { updateWithoutUserMsg } from '../../../mocks/fakeAuthDb.js';

export async function updateUserProfile(userProfileData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.updateUserProfile) {
        return await fakeApiError('mockFn com err = true no updateUserProfile do profileService');
      }

      // Busca persistência do usuário fake (update)
      const fakeUserStoraged = JSON.parse(localStorage.getItem('mockUser'));

      if (!fakeUserStoraged) {
        await fakeApiError(updateWithoutUserMsg, 401);
      }

      // Atualiza objeto de dados do usuário
      const fakeUpdatedUser = { ...fakeUserStoraged, ...userProfileData };

      // Atualiza armazenamento local (persistência)
      localStorage.setItem('mockUser', JSON.stringify(fakeUpdatedUser));

      return await fakeApi(fakeUpdatedUser);
    };

    const apiFn = async () => {
      return await apiFetch('/me', { method: 'PATCH', reqBody: userProfileData });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    console.log('profileService/updateUserProfile:', data);
    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no updateUserProfile', { cause });
  }
}
