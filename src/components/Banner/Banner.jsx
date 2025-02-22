import { useState, useEffect } from 'react'
import './Banner.css'

function Banner() {

    return (
      <div className='hero'>
        {/* <img src='src/assets/herobg.png' alt='spiderman' /> */}
        {/* <Header searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} /> */}
        {/* <h1 className='text-white'>{searchTerm}</h1> */}
        <div className='hero_det'>
          <img className='hero_logo' src='public/assets/image.png' />
          <div className='rowls'>
            <span className='upercase movietype'>CBFC:U/A</span>
            <span className='movietype'>-Action</span>
            <span className='movietype'>-Adventure</span>
            <span className='movietype'>-2h28m</span>
          </div>
          <p className='wrapper'>
          When a spell goes wrong, dangerous 
          foes from other worlds start to appear, 
          forcing Peter to discover what it truly 
          means to be Spider-Man
          </p>
        <div className="ovalls">
          <button className="ovall-white">Watch Now</button>
          <button className="ovall-black">Add To Watch List</button>
        </div>
        </div>
      </div>
    )
}

export default Banner