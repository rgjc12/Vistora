import React from 'react';

const Pagination = ({ totalItems, itemsLabel = "Items" }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{totalItems} {itemsLabel}</span>
      <div className="flex space-x-1">
        {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-sm rounded ${
              page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;