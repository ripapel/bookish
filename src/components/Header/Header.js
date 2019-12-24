import React, { Component } from 'react'
import './header.css'
import user from '../../assets/images/user.png'

export default class Header extends Component {
    render() {
        return (
            <header className="app-header">
                <h1 className="app-name">Bookworm</h1>
                <img src={user} alt="user" className="user-nav-icon" />
            </header>
        )
    }
}
