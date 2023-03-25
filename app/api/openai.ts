enum APIType {
  TEXT = 'text',
  IMAGE = 'image',
}

async function fetchEncounterDetails(apiType: APIType, prompt: string) {
  const apiURL = apiType === APIType.TEXT ? '/api/get-encounter' : '/api/get-image';
  const detailFetch = await fetch(apiURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const detailFetchConverted = await detailFetch.json();

  return detailFetchConverted;
}

export { fetchEncounterDetails, APIType };
