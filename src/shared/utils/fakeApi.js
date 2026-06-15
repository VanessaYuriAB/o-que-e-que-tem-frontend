export function fakeApi(data, status = 200, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: JSON.parse(JSON.stringify(data)), status });
    }, delay);
  });
}

export function fakeApiError(message, status = 500, data = null, delay = 500) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const fakeError = { type: 'api', status, data };

      reject(new Error(message, { cause: fakeError }));
    }, delay);
  });
}
