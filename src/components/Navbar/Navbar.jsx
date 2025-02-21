import { useEffect, useState } from "react"
import './Navbar.css'

function Navbar () {
     return (
        <header>
            <div className="topnav">
                <a href="#" className="logo">StreamX</a>
                <a className="active" href="#home">Home</a>
                <a href="#about">Favorite</a>
                <a href="#contact">Trending</a>
                <input type="text" placeholder="Search.... Tv" />
            </div>
        </header>
     )
}

export default Navbar