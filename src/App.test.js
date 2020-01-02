import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders some JSON to the screen', () => {
  const { getByText } = render(<App />);
  const elem = getByText(/_subtotal/i);
  expect(elem).toBeInTheDocument();
});
