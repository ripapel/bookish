import React from 'react'
import './styles.css'

export default function CategoriesNav() {
    const categories = ['Fiction', 'Romance', 'Fiction', 'Sci-fi', 'Horror', 'Philosophy', 'Poetry']
    return (
        <div className="categories-nav-container">
            <ul className="categories-nav-list">
                {categories.map((c, index) => {
                    return (
                        <li key={index} className="category-nav-item">
                            <a className="category-link" href="#">{c}</a>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}
