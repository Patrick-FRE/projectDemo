import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookSearch from './BookSearch';

describe('BookSearch', () => {
  it('should render properly', () => {
    const stub = jest.fn();
    render(<BookSearch />);

    expect(screen.getByText('My Reading Wishlist (0)')).toBeVisible();
    expect(
      screen.getByPlaceholderText(
        'Search for books to add to your reading list and press Enter'
      )
    ).toBeVisible();
  });

  it('should have a button to click', () => {});
});
