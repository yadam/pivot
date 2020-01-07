import React from 'react';
import { render } from '@testing-library/react';
import { Pivot } from './pivot';
import data from '../data/truncated.json';

describe('Pivot', () => {
  it('renders the table with one dimension', () => {
    const { asFragment } = render(
      <Pivot
        column="state"
        data={data}
        metric="sales"
        name="Products"
        rows={['category']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the table with two dimensions', () => {
    const { asFragment } = render(
      <Pivot
        column="state"
        data={data}
        metric="sales"
        name="Products"
        rows={['category', 'subCategory']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the table with three dimensions', () => {
    const { asFragment } = render(
      <Pivot
        column="state"
        data={data}
        metric="sales"
        name="Products"
        rows={['shipMode', 'category', 'subCategory']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the table with no name', () => {
    const { asFragment } = render(
      <Pivot column="state" data={data} metric="sales" rows={['category']} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
