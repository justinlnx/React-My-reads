import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    // currentlyReading: [],
    // WantToRead: [],
    // Read: [],
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log('api');
      // var cr = response.filter(x => x.shelf === 'currentlyReading');
      // var wtr = response.filter(x => x.shelf === 'wantToRead');
      // var r = response.filter(x => x.shelf === 'read');
      // this.setState({ 
      //   currentlyReading: cr,
      //   wantToRead: wtr,
      //   read: r
      // });
      this.setState({ books });
    })
  }

  render() {
    // console.log('books state: ', this.state.currentlyReading);
    // console.log('books state: ', this.state.wantToRead);
    // console.log('books state: ', this.state.read);
    console.log('book state ', this.state.books);
    const items = [
      {
        title: 'Currently Reading',
        books: this.state.books.filter(x => x.shelf === 'currentlyReading')
      },
      {
        title: 'Want To Read',
        books: this.state.books.filter(x => x.shelf === 'wantToRead')
      },
      {
        title: 'Read',
        books: this.state.books.filter(x => x.shelf === 'read')
      },
    ]
    console.log('items ', items);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {items.map((item, index) => (
                <BookShelf 
                  key={index}
                  shelfTitle={item.title}
                  books={item.books} />
              ))}
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
