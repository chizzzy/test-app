import React from 'react';
import './ProductTable.css';
import { Column, Product } from 'types';
import { SORT_ORDERS } from 'helpers/constants';

interface Props {
  products: Product[];
  handleSort: (column: Column) => void;
  sortOrder: string;
  sortBy: string;
  handleProductDelete: (id: number) => void;
}

export const ProductTable: React.FC<Props> = ({
  sortOrder,
  sortBy,
  handleSort,
  products,
  handleProductDelete,
}) => {
  const renderSortButton = (column: Column, label: string) => (
    <button
      className={`sort-button ${sortBy === column ? 'active' : ''}`}
      onClick={() => handleSort(column)}
    >
      {label}{' '}
      {sortBy === column && (
        <span className="sort-icon">
          {sortOrder === SORT_ORDERS.ASC ? '^' : 'v'}
        </span>
      )}
    </button>
  );
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>{renderSortButton('id', 'ID')}</th>
          <th>{renderSortButton('title', 'Name')}</th>
          <th>{renderSortButton('description', 'Description')}</th>
          <th>{renderSortButton('price', 'Price')}</th>
          <th>Photo</th>
          <th>{renderSortButton('rating', 'Rating')}</th>
          <th>{renderSortButton('stock', 'Stock')}</th>
          <th>{renderSortButton('category', 'Category')}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: Product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>
              <img
                className="thumbnail"
                src={product.thumbnail}
                alt="thumbnail"
              />
            </td>
            <td>{product.rating}</td>
            <td>{product.stock}</td>
            <td>{product.category}</td>
            <td>
              <button
                className="delete-button"
                onClick={() => handleProductDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
