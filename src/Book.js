import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { imgUrl, title, authors } = this.props;
    
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  imgUrl }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors.map((author, index) => (
          <div className="book-authors" key={index}>{author}</div>
        ))}
      </div>
    )
  };
}

export default Book;