import React from 'react'
import Book from '../Book/Book'
import './bookgroup.css'

export default function BooksGroup(props) {
    const { books } = props
    return (
        <div className="books-group">
            {books.map((b, index) => <Book book={b} key={index} />)}
        </div>
    )
}
