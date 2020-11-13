import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from './BookCard';

const mockData = {
  id: 'ptiYBAAAQBAJ',
  title: 'JavaScript & jQuery: The Missing Manual',
  authors: ['David Sawyer McFarland'],
  publisher: '"O\'Reilly Media, Inc."',
  publishedDate: '2014-09-18T00:00:00.000Z',
  imageLinks: {
    smallThumbnail:
      'http://books.google.com/books/content?id=UAYvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    thumbnail:
      'http://books.google.com/books/content?id=UAYvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
  description:
    'JavaScript lets you supercharge your HTML with animation, interactivity, and visual effects—but many web designers find the language hard to learn.',
  isRead: false,
};

describe('BookCard', () => {
  it('should render properly', () => {
    const stub = jest.fn();
    render(<BookCard isAdded={false} book={mockData} addBookToWishlist={stub} />);

    expect(screen.getByText(mockData.title)).toBeVisible();
    expect(screen.getByText(mockData.authors.join(','))).toBeVisible();
    expect(screen.getByText(mockData.description)).toBeVisible();
  });

  it('should have a button to click', () => {
    const stub = jest.fn();
    render(<BookCard isAdded={false} book={mockData} addBookToWishlist={stub} />);
    fireEvent.click(screen.getByText('Add to wishlist'));
    expect(stub).toHaveBeenCalledTimes(1);
  });

  it('should disable the button when is added to wishlist', () => {
    const stub = jest.fn();
    render(<BookCard isAdded={true} book={mockData} addBookToWishlist={stub} />);

    expect(screen.getByText('Added to wishlist')).toBeDisabled();

    fireEvent.click(screen.getByText('Added to wishlist'));
    expect(stub).toHaveBeenCalledTimes(0);
  });
});
