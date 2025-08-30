import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main title of the wishlist', () => {
  render(<App />);
  const titleElement = screen.getByText(/Wishlist/i);
  expect(titleElement).toBeInTheDocument();
});
