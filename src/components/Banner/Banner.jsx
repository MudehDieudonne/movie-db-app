import { useState, useEffect } from 'react'
import './Banner.css'

function Banner() {

    return (
      <div className='hero'>
        {/* <img src='src/assets/herobg.png' alt='spiderman' /> */}
        {/* <Header searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} /> */}
        {/* <h1 className='text-white'>{searchTerm}</h1> */}
        <div className='hero_det'>
        <img className="hero_logo" src="https://s3-alpha-sig.figma.com/img/dffb/b860/559f834e0275c009608027ccae5ee787?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdJWE2Ubihb7TlZFqKGe2PtHncbTnNfx~y19ikPMTKpueTdoBN5Xpcr2Shy843GL-pwROrS60EY5dEeMVJ6-C2p~2hAH7TB20LY5gM7KbNSdAwszDv9UTIvY6E5oMCXm-TBxArOb82yBWAXrqEs~4OeIHctZnZuZU2KXtzbVdZkoKCKlBOSSvgPvswb~yLvegqG5jcE3fIe3EmyVzGnA6AolFgR6Peghr6m~RoamVZcmJMVO1r391DKOCgkrwEBeeKoKSzqBwoMZIEaic8i4X8JYwMZJAyHBjEJ7~vF~v8mlyT7lIYnKx7ILaLp4qT4UmfqXf5i0L-mrSZ2sBY41aQ__" alt="Hero Logo" />
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