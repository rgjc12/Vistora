import React from 'react';
import { useDispatch } from 'react-redux';

const SearchBar = ({ placeholder = "Search...", searchAction }) => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchAction(e.target.value));
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleSearch}
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;