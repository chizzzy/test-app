import { Search, ProductTable } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  ProductState,
  deleteProduct,
  fetchProducts,
} from 'redux/modules/product';

import './ProductList.css';
import { filterProducts, sortProducts } from 'helpers';
import { SORT_ORDERS } from 'helpers/constants';
import { Column, SortOrder } from 'types';

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

  const sortedFilteredProducts = useMemo(() => {
    const filteredProducts = filterProducts(products, searchQuery);

    return sortProducts(filteredProducts, sortOrder, sortBy);
  }, [products, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Product List</h1>
        <Search value={searchQuery} onChange={handleSearchChange} />
      </div>

      {sortedFilteredProducts.length > 0 ? (
        <ProductTable
          sortOrder={sortOrder}
          sortBy={sortBy}
          products={sortedFilteredProducts}
          handleSort={handleSort}
          handleProductDelete={handleProductDelete}
        />
      ) : (
        <div className="no-products">No products found.</div>
      )}
    </div>
  );
};
