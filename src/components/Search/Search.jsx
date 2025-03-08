import react from "react"
import './Search.css'

const Search = (props) => {
    return (
        <div className="search">
            <input type="text" placeholder="Search Movies, Series..." value={props.searchValue} onChange={(event) => props.setSearchValue(event.target.value)} />    
        </div>
    )
}

export default Search
