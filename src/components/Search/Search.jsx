import { IoSearch } from "react-icons/io5"
import './Search.css'

const Search = (props) => {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <IoSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search Movies, Series..."
                    value={props.searchValue}
                    onChange={(event) => props.setSearchValue(event.target.value)}
                />
            </div>
        </div>
    )
}

export default Search
