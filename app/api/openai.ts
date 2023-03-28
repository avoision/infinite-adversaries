enum APIType {
  TEXT = 'text',
  IMAGE = 'image',
}

async function fetchEncounterDetails(apiType: APIType, prompt: string) {
  const domain =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://infinite-adversaries.vercel.app';

  const apiURL =
    apiType === APIType.TEXT ? domain + '/api/get-encounter' : domain + '/api/get-image';
  const detailFetch = await fetch(apiURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
    cache: 'no-store',
  });

  const detailFetchConverted = await detailFetch.json();

  return detailFetchConverted;
}

export { fetchEncounterDetails, APIType };
