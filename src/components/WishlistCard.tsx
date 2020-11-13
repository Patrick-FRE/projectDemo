import React from 'react';

interface IProps {
  book: {
    title: string;
    authors: string[];
    description: string;
    publisher: string;
    publishedDate: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
  removeBookFromWishlist: (book: any) => void;
}

const WishlistCard = (props: IProps) => {
  const { book, removeBookFromWishlist } = props;
  return (
    <div className="wishlist-card">
      <div>{book.title} </div>
      <div className="wishlist-card-close">
        <a
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
