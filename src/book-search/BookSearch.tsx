import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import WishlistCard from '../components/WishlistCard';
import { debounce } from '../utils';
import { getBooksByType } from './book-search.service';

const BookSearch = () => {
  const [bookType, updateBookType] = useState('');
  const [bookTypeToSearch, updateBookTypeToSearch] = useState('');
  const [allAvailableBooks, setAllAvailableBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState<any>([]);

  const debounceOnChange = React.useCallback(
    debounce(requestBooksByBookType, 200),
    []
  );

  async function requestBooksByBookType(b: any) {
    if (b) {
      const allBooks = await getBooksByType(b);
      setAllAvailableBooks(
        allBooks.items.map((item: any) => ({ id: item.id, ...item.volumeInfo }))
      );
    }
  }

  useEffect(() => {
    async function getAllBooks() {
      await requestBooksByBookType(bookTypeToSearch);
    }
    getAllBooks();
  }, [bookTypeToSearch]);

  const addBookToWishList = (book: any) => {
    setWishlistBooks((prev: any) => {
      if (prev.findIndex((b: any) => b.id === book.id) !== -1) {
        return [...prev];
      } else {
        return [...prev, book];
      }
    });
  };

  const removeBookFromWishList = (book: any) => {
    setWishlistBooks((prev: any) => {
      return [...prev.filter((b: any) => b.id !== book.id)];
    });
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    updateBookType(value);
    debounceOnChange(value);
  };

  return (
    <>
      <div className="book--container">
        <div className="search-params">
          <form
            onSubmit={(e) => {
              // debugger;
              e.preventDefault();
              updateBookTypeToSearch(bookType);
            }}
          >
            <input
              className="full-width"
              autoFocus
              name="gsearch"
              type="search"
              value={bookType}
              placeholder="Search for books to add to your reading list and press Enter"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </form>
          {!bookType && allAvailableBooks.length === 0 && (
            <div className="empty">
              <p>
                Try searching for a topic, for example
                <a
                  onClick={() => {
                    updateBookType('Javascript');
                  }}
                >
                  {' '}
                  "Javascript"
                </a>
              </p>
            </div>
          )}
          {allAvailableBooks.length > 0 && (
            <div className="books">
              {allAvailableBooks.map((book: any) => (
                <BookCard
                  key={book.id}
                  book={book}
                  added={
                    wishlistBooks.findIndex((b: any) => b.id === book.id) !== -1
                  }
                  addBookToWishlist={addBookToWishList}
                ></BookCard>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar">
          <div className="reading-list-container">
            <h2>My Reading Wishlist ({wishlistBooks.length})</h2>
            <div className="reading-list-content">
              {wishlistBooks.map((book: any) => (
                <WishlistCard
                  key={book.id}
                  book={book}
                  removeBookFromWishlist={removeBookFromWishList}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSearch;
