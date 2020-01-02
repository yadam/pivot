import { parse } from '../parser';

describe('parser', () => {
  it('should parse a truncated data set', () => {
    const actual = parse({
      column: 'state',
      rows: ['category', 'subCategory'],
      metric: 'sales',
    });
    expect(actual._totals._subtotal).toEqual(21310.715699999997);
  });
});
