const rotate = (m: Array<string>): Array<string> => {
  const size = Math.sqrt(m.length);

  for (let x = 0; x <= Math.floor(size / 2) - 1; x++) {
    const offset = x * (size + 1);
    const offsetA = x * (size - 1);
    const offsetB = x * ((size + 1) * -1);
    const offsetC = x * (offsetA * -1);

    for (let i = 0; i < size - 1 - x * 2; i++) {
      const offsetIndex = i + offset;
      const tempIndexA = size * i + (size - 1) + offsetA;
      const tempIndexB = size * size - i - 1 + offsetB;
      const tempIndexC = size * size - size - size * i + offsetC;

      const tempA = m[tempIndexA];
      const tempB = m[tempIndexB];
      const tempC = m[tempIndexC];

      m[tempIndexA] = m[offsetIndex];
      m[tempIndexB] = tempA;
      m[tempIndexC] = tempB;
      m[offsetIndex] = tempC;
    }
  }

  return m;
};

export default rotate;
