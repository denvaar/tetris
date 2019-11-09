import calculatePoints from '../calculatePoints';

describe('calculatePoints', () => {
  describe('when one row is cleared', () => {
    it('awards 40 points at level 1', () => {
      const points = calculatePoints(1, 1);
      expect(points).toEqual(40);
    });
    it('awards 80 points at level 2', () => {
      const points = calculatePoints(1, 2);
      expect(points).toEqual(80);
    });
    it('awards 120 points at level 3', () => {
      const points = calculatePoints(1, 3);
      expect(points).toEqual(120);
    });
  });
  describe('when two rows are cleared', () => {
    it('awards 100 points at level 1', () => {
      const points = calculatePoints(2, 1);
      expect(points).toEqual(100);
    });
    it('awards 200 points at level 2', () => {
      const points = calculatePoints(2, 2);
      expect(points).toEqual(200);
    });
    it('awards 300 points at level 3', () => {
      const points = calculatePoints(2, 3);
      expect(points).toEqual(300);
    });
  });
  describe('when three rows are cleared', () => {
    it('awards 300 points at level 1', () => {
      const points = calculatePoints(3, 1);
      expect(points).toEqual(300);
    });
    it('awards 600 points at level 2', () => {
      const points = calculatePoints(3, 2);
      expect(points).toEqual(600);
    });
    it('awards 900 points at level 3', () => {
      const points = calculatePoints(3, 3);
      expect(points).toEqual(900);
    });
  });
  describe('when four rows are cleared', () => {
    it('awards 1200 points at level 1', () => {
      const points = calculatePoints(4, 1);
      expect(points).toEqual(1200);
    });
    it('awards 2400 points at level 2', () => {
      const points = calculatePoints(4, 2);
      expect(points).toEqual(2400);
    });
    it('awards 3600 points at level 3', () => {
      const points = calculatePoints(4, 3);
      expect(points).toEqual(3600);
    });
  });
});
