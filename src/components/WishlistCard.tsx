import React from 'react';
import Book from '../model/Book';

interface WishlistProps {
  book: Book;
  removeBookFromWishlist: (book: Book) => void;
}

const WishlistCard = (props: WishlistProps) => {
  const { book, removeBookFromWishlist } = props;
  return (
    <div className="wishlist-card">
      <div>{book.title} </div>
      <div className="wishlist-card-close">
        <a
          href="!#"
          className="close-button"
          onClick={() => {
            removeBookFromWishlist(book);
          }}
        >
          x
        </a>
      </div>
    </div>
  );
};

export default WishlistCard;
