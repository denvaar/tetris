import colors from './utils/colors';

const tetrominoes: Array<Tetrominoe> = [
  {
    color: colors.cyan,
    // prettier-ignore
    layout: [0, 1, 0, 0,
             0, 1, 0, 0,
             0, 1, 0, 0,
             0, 1, 0, 0]
  },
  {
    color: colors.yellow,
    // prettier-ignore
    layout: [1, 1,
             1, 1]
  },
  {
    color: colors.magenta,
    // prettier-ignore
    layout: [0, 0, 0,
             0, 1, 0,
             1, 1, 1]
  },
  {
    color: colors.blue,
    // prettier-ignore
    layout: [0, 0, 0,
             1, 0, 0,
             1, 1, 1]
  },
  {
    color: colors.lightRed,
    // prettier-ignore
    layout: [0, 0, 0,
             0, 0, 1,
             1, 1, 1]
  },
  {
    color: colors.green,
    // prettier-ignore
    layout: [0, 1, 1,
             1, 1, 0,
             0, 0, 0]
  },
  {
    color: colors.red,
    // prettier-ignore
    layout: [1, 1, 0,
             0, 1, 1,
             0, 0, 0]
  },
];

export default tetrominoes;
