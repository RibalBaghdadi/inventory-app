import { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleFilterChange = (e) => {
        onFilter(e.target.value);
    };

    return (
        <div className="search-filter">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by name, category, or status..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <div className="filter-box">
                <select onChange={handleFilterChange} className="filter-select">
                    <option value="ALL">All Status</option>
                    <option value="IN STOCK">In Stock</option>
                    <option value="LOW STOCK">Low Stock</option>
                    <option value="ORDERED">Ordered</option>
                    <option value="DISCONTINUED">Discontinued</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;