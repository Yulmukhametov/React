import React from 'react';

const SortButton = ({ direction, onClick }) => {
  return (
    <button onClick={onClick}>
      {direction === 'desc' ? 'По убыванию' : direction === 'asc' ? 'По возрастанию' : 'Сортировка'}
    </button>
  );
};

export default SortButton;
