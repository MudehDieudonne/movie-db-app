import { useState, useEffect } from 'react'
import './Banner.css'

function Banner() {

    return (
      <div className='hero'>
        {/* <img src='src/assets/herobg.png' alt='spiderman' /> */}
        {/* <Header searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} /> */}
        {/* <h1 className='text-white'>{searchTerm}</h1> */}
        <div className='hero_det'>
        <img className="hero_logo" src="https://s3-alpha-sig.figma.com/img/dffb/b860/559f834e0275c009608027ccae5ee787?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ptphB~z9TILLT~Y72cYYv5-78aKqhjFpbLJtBKYDpvWhpNDaJ-R28Z4aO~dI8CavbzDlWxsT0UtbQCI-ivI7pzRAOv-9b87ReaRtlTDWpX~j00gFRPrTKGaMfGW0YdRdbJiz6bnpFwFo4Kz0tK3QDoZBHWq51CuOExIBcoF9q5dKhv01LwnEkFCBYdKvB~zcTP923Q5Fk2uu8VZV4dSmMsJ6OwkBIsnHbTOyLV0D-Z~yrt1CTLy8KfEvkf5RvFpajVl823wy1YFluAOjc6efHWqV~LaT7yH9AI20cauv8A1xDyHZU8XmGCzSqX2gR77B6GFH9KVeF9XopJf1ldFaKg__" alt="Hero Logo" />
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