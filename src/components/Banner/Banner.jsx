import { useState, useEffect } from 'react'
import './Banner.css'

function Banner() {

    return (
      <div className='hero'>
        {/* <img src='src/assets/herobg.png' alt='spiderman' /> */}
        {/* <Header searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} /> */}
        {/* <h1 className='text-white'>{searchTerm}</h1> */}
        <h1>Find <span className='text-gradient'>Movies</span> Youl Enjoy</h1>
      </div>
    )
}

export default Banner