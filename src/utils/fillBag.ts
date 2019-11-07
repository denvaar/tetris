const fillBag = (): number[] => {
  const indecies = [0, 1, 2, 3, 4, 5, 6];

  for (let i = indecies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indecies[i], indecies[j]] = [indecies[j], indecies[i]];
  }

  return indecies;
};

export default fillBag;
