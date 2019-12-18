import React from 'react'
import './styles.css'

export default function SearchBox(props) {
    const { handleSearch, handleChangeSearchTerm } = props
    return (
        <div>
            <form className="seach-form">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search by book author, title or isbn"
                    onChange={handleChangeSearchTerm}

                />
                <button
                    type="submit"
                    className="btn-secondary"
                    onClick={e => { handleSearch(e) }}>Search</button>
            </form>
        </div>
    )
}
