import React from 'react'
import Book from '../Book/Book'
import Loader from '../Loader/Loader'
import './bookgroup.css'

export default function BooksGroup(props) {
    function renderBody(books) {
        const { loading } = props
        if (loading) {
            return (
                <Loader />
            )
        }
        else {
            return (
                <div className="books-group">
                    {books.map((b, index) => <Book book={b} key={index}
                        getBookDescription={() => { props.getBookDescription({ authorId: b.author.id, bookId: b.id }) }} />)}
                </div>
            )
        }
    }

    const { books } = props
    return (
        renderBody(books)
    )
}
