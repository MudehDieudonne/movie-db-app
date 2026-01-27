import { IoSearch } from "react-icons/io5"
import PropTypes from 'prop-types'
import './Search.css'

const Search = ({ searchValue, setSearchValue }) => {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <IoSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search Movies, Series..."
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </div>
        </div>
    )
}

Search.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
}

export default Search
