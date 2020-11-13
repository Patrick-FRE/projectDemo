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

  added: boolean;

  addBookToWishlist: (book: any) => void;
}

const Card = (props: IProps) => {
  const { book, addBookToWishlist, added } = props;

  return (
    <div className="book">
      <div className="book__cover">
        {book.imageLinks && (
          <img src={book.imageLinks.thumbnail} alt={book.title} />
        )}
      </div>
      <p>{book.title}</p>
      {book.authors && <p>{book.authors.join(',')}</p>}
      <p>{book.publisher}</p>
      <p>{book.publishedDate}</p>
      <p>{book.description}</p>
      <button
        disabled={added}
        onClick={() => {
          addBookToWishlist(book);
        }}
      >
        {added ? 'Added to wishlist' : 'Add to wishlist'}
      </button>
    </div>
  );
};

export default Card;
