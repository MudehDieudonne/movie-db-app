import { useState } from "react"
import { Link, NavLink } from 'react-router-dom'
import { IoMenu, IoClose } from "react-icons/io5"
import Search from "../Search/Search"
import PropTypes from 'prop-types'
import './Navbar.css'

function Navbar({ searchValue, setSearchValue }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">Stream<span>X</span></Link>

                <Search searchValue={searchValue} setSearchValue={setSearchValue} />

                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/trending" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>Trending</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>Favorites</NavLink>
                </div>

                <div className="nav-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <IoClose /> : <IoMenu />}
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
}

export default Navbar