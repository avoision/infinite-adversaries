'use client';

const domain =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://infiniteadversaries.com';

async function fetchEncounterDetails(prompt: string) {
  const apiURL = `${domain}/api/get-encounter`;
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

  // This data is a ReadableStream
  const data = detailFetch.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let dataFromAI = '';

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    const chunkValue = decoder.decode(value);
    dataFromAI = dataFromAI + chunkValue;
  }

  const detailFetchConverted = JSON.parse(dataFromAI);
  return JSON.parse(detailFetchConverted.choices[0].message.content);
}

async function fetchEncounterImage(prompt: string) {
  const apiURL = `${domain}/api/get-image`;

  const imageFetch = await fetch(apiURL, {
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

  const imageFetchConverted = await imageFetch.json();
  return imageFetchConverted;
}

export { fetchEncounterDetails, fetchEncounterImage };
