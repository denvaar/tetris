import rotate from '../index';

test('rotates 2x2 matrix', () => {
  // prettier-ignore
  const input = [
    '1', '2',
    '3', '4',
  ];
  // prettier-ignore
  const output = [
    '3', '1',
    '4', '2',
  ];
  expect(rotate(input)).toStrictEqual(output);
});

test('rotates 3x3 matrix', () => {
  // prettier-ignore
  const input = [
    'a', 'b', 'c',
    'd', 'e', 'f',
    'g', 'h', 'i',
  ];
  // prettier-ignore
  const output = [
    'g', 'd', 'a',
    'h', 'e', 'b',
    'i', 'f', 'c',
  ];
  expect(rotate(input)).toStrictEqual(output);
});

test('rotates 4x4 matrix', () => {
  // prettier-ignore
  const input = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
  ];
  // prettier-ignore
  const output = [
    'm', 'i', 'e', 'a',
    'n', 'j', 'f', 'b',
    'o', 'k', 'g', 'c',
    'p', 'l', 'h', 'd',
  ];
  expect(rotate(input)).toStrictEqual(output);
});

test('rotates 5x5 matrix', () => {
  // prettier-ignore
  const input = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', '2', 'i',
    'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x',
  ];
  // prettier-ignore
  const output = [
    't', 'o', 'j', 'f', 'a',
    'u', 'p', 'k', 'g', 'b',
    'v', 'q', 'l', 'h', 'c',
    'w', 'r', 'm', '2', 'd',
    'x', 's', 'n', 'i', 'e',
  ];
  expect(rotate(input)).toStrictEqual(output);
});
