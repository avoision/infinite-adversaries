function getRandomSeed(seedSource: string[]) {
  const randomPos = Math.floor(Math.random() * seedSource.length);
  return seedSource[randomPos];
}

export { getRandomSeed };
