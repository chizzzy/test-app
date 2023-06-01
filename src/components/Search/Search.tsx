import React from 'react';
import './Search.css';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Search: React.FC<Props> = ({ onChange, value }) => {
  return (
    <input
      className="search-field"
      id="searchQuery"
      name="searchQuery"
      type="text"
      onChange={onChange}
      value={value}
      placeholder="Search by name or category"
      style={{ width: 200 }}
    />
  );
};
