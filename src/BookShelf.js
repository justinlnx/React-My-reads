import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const { shelfTitle, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        {books.length !== 0 && (
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id} className='book-list-item' >
                  <Book imgUrl={`url(${book.imageLinks.smallThumbnail})`}
                        title={book.title}
                        authors={book.authors} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };
}

export default BookShelf;