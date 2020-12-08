import React from 'react';
import Book from '../model/Book';

interface BookCardProps {
  book: Book;
  isAdded: boolean;

  addBookToWishlist: (book: Book) => void;
}

const Card = (props: BookCardProps) => {
  const { book, addBookToWishlist, isAdded } = props;

  return (
    <article className="book-card">
      <header className="book-card__header">
        <div className="book-card__cover">
          {book.imageLinks && (
            <img src={book.imageLinks.thumbnail} alt={book.title} />
          )}
        </div>
        <div className="book-card__info">
          <p className="book-card__title">{book.title}</p>
          <p className="book-card__author">
            {book.authors ? book.authors.join(',') : ''}
          </p>
          <p className="book-card__publisher">
            {book.publisher ? book.publisher : ''}
          </p>
          <button
            className="btn-add-wishlist"
            disabled={isAdded}
            onClick={() => {
              addBookToWishlist(book);
            }}
          >
            {isAdded ? 'Added to wishlist' : 'Add to wishlist'}
          </button>
        </div>
      </header>

      <p className="book-card__description">{book.description}</p>
    </article>
  );
};

export default Card;
