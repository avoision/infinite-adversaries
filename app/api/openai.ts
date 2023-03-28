'use client';

enum APIType {
  TEXT = 'text',
  IMAGE = 'image',
}

async function fetchEncounterDetails(apiType: APIType, prompt: string) {
  console.log('fetchEncounterDetails');

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

  if (!detailFetch.ok) {
    throw new Error(detailFetch.statusText);
  }

  console.log('detailFetch', detailFetch);

  // This data is a ReadableStream
  const data = detailFetch.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;

  console.log('done');
  console.log(reader);

  let dataFromAI;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    dataFromAI = dataFromAI + chunkValue; // setGeneratedBios(prev => prev + chunkValue);
  }

  return dataFromAI;

  // const detailFetchConverted = await detailFetch.json();

  // return detailFetchConverted;
}

export { fetchEncounterDetails, APIType };
