import { parse } from './parser';
import data from '../data/UI Take Home Test - sales-orders.json';

describe('parser', () => {
  it('should handle an empty data set', () => {
    const actual = parse({
      column: 'state',
      data: [],
      rows: ['category', 'subCategory'],
      metric: 'sales',
    });
    expect(actual).toEqual({});
  });

  it('should handle an undefined data set', () => {
    const actual = parse({
      column: 'state',
      rows: ['category', 'subCategory'],
      metric: 'sales',
    });
    expect(actual).toEqual({});
  });

  it('should parse a data set', () => {
    const actual = parse({
      column: 'state',
      data,
      rows: ['category', 'subCategory'],
      metric: 'sales',
    });
    expect(actual._totals._subtotal).toEqual(1125711.7606999937);
    expect(actual._totals.California).toEqual(216003.7804999998);
    expect(actual._totals.Illinois).toEqual(39405.39499999999);
    expect(actual.Technology._totals.Georgia).toEqual(5178.299999999998);
    expect(actual.Furniture._totals.Massachusetts).toEqual(5854.814999999999);
    expect(actual.Furniture.Bookcases._totals.Florida).toEqual(231.92);
    expect(actual.Technology.Phones._totals.Nevada).toEqual(911.984);
  });
});
