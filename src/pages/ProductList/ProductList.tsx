import { Search } from 'components';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  ProductState,
  deleteProduct,
  fetchProducts,
} from 'redux/modules/product';

import './ProductList.css';
import { filterProducts, sortProducts } from 'helpers';
import { SORT_ORDERS } from 'helpers/constants';
import { Product, SortOrder } from 'types';

type Column = keyof Product;

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDERS.ASC);

  const products = useAppSelector((state: ProductState) => state.products);
  const loading = useAppSelector((state: ProductState) => state.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleProductDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleSort = (column: Column) => {
    if (sortBy === column) {
      setSortOrder(
        sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC,
      );
    } else {
      setSortBy(column);
      setSortOrder(SORT_ORDERS.ASC);
    }
  };

  const filteredProducts = filterProducts(products, searchQuery);

  const sortedProducts = sortProducts(filteredProducts, sortOrder, sortBy);

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

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Product List</h1>
        <Search value={searchQuery} onChange={handleSearchChange} />
      </div>

      {filteredProducts.length > 0 ? (
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
            {sortedProducts.map((product: Product) => (
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
      ) : (
        <div className="no-products">No products found.</div>
      )}
    </div>
  );
};
