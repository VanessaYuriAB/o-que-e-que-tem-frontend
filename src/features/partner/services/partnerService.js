import FAKE_ERRORS from '../../../shared/constants/mockConfig.js';
import { fakeApiError, fakeApi } from '../../../shared/utils/fakeApi.js';
import apiFetch from '../../../services/api.js';
import decideMockOrApi from '../../../shared/utils/helperMockOrApi.js';

async function sendPartnerEntry(partnerData) {
  try {
    const mockFn = async () => {
      if (FAKE_ERRORS.sendPartnerEntry) {
        await fakeApiError('mockFn com err = true no sendPartnerEntry do partnerService');
      }

      return await fakeApi(partnerData, 201);
    };

    const apiFn = async () => {
      return await apiFetch('/partners', {
        method: 'POST',
        // header já definido em apiFetch
        reqBody: partnerData,
      });
    };

    const { data } = await decideMockOrApi(mockFn, apiFn);

    return typeof data === 'object' ? data : {};
  } catch (cause) {
    throw new Error('Falha no partnerService.sendPartnerEntry', { cause });
  }
}

export default sendPartnerEntry;
