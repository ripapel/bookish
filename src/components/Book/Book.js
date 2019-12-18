import React from 'react'
import './book.css'

export default function Book(props) {
    const { book } = props
    return (
        <section className="book">
            <img src={book.image_url} alt="book cover" className="cover" />
            <h1 className="title">{book.title}</h1>
            <h2 className="author">{book.author}</h2>
            <button type="button" className="btn-primary">Want to Read</button>
        </section>
    )
}
