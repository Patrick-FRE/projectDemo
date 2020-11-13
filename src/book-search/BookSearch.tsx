import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import WishlistCard from '../components/WishlistCard';
import Book from '../model/Book';
import { debounce } from '../utils';
import { getBooksByType } from './book-search.service';

const BookSearch = () => {
  const [bookType, updateBookType] = useState('');
  const [bookTypeToSearch, updateBookTypeToSearch] = useState('');
  const [allAvailableBooks, setAllAvailableBooks] = useState<Book[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  // debounce api calll to prevent sending too many api calls to server
  const debounceApiCall = React.useCallback(
    debounce(requestBooksByBookType, 200),
    []
  );

  async function requestBooksByBookType(b: any) {
    if (b) {
      setLoading(true);
      const allBooks = await getBooksByType(b);
      setAllAvailableBooks(
        allBooks.items.map((item: any) => ({ id: item.id, ...item.volumeInfo }))
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getAllBooks() {
      await requestBooksByBookType(bookTypeToSearch);
    }
    getAllBooks();
  }, [bookTypeToSearch]);

  /**
   * Add book to wishlist state
   * @param book book to be added to wishlist
   */
  const addBookToWishList = (book: Book) => {
    setWishlistBooks((prev: any) => {
      if (prev.findIndex((b: any) => b.id === book.id) !== -1) {
        return [...prev];
      } else {
        return [...prev, book];
      }
    });
  };

  /**
   *  Remove a given book from wishlist state
   * @param book book to be removed from wishlist
   */
  const removeBookFromWishList = (book: Book) => {
    setWishlistBooks((prev: any) => {
      return [...prev.filter((b: any) => b.id !== book.id)];
    });
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    updateBookType(value);
    debounceApiCall(value);
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
                  href="!#"
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
          {loading && <h2>Loading...</h2>}
          {allAvailableBooks.length > 0 && !loading && bookType && (
            <div className="books">
              {allAvailableBooks.map((book: any) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isAdded={
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
