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
    <article className="book">
      <div className="book__cover">
        {book.imageLinks && (
          <img src={book.imageLinks.thumbnail} alt={book.title} />
        )}
      </div>
      <header className="book__header">{book.title}</header>
      {book.authors && <p>{book.authors.join(',')}</p>}
      <p className="book__publisher">{(book.publisher ? book.publisher : 'unknown') + ', ' + book.publishedDate}</p>
      <p className="book__description">{book.description}</p>
      <button
       className="book__btn-add"
        disabled={isAdded}
        onClick={() => {
          addBookToWishlist(book);
        }}
      >
        {isAdded ? 'Added to wishlist' : 'Add to wishlist'}
      </button>
    </article>
  );
};

export default Card;
