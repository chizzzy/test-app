import { Product } from 'redux/modules/product';

interface IndexedProduct extends Product {
  [key: string]: any;
}

export const filterProducts = (
  products: Product[],
  searchQuery: string,
): Product[] => {
  return products.filter((product: Product) => {
    const nameMatch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch = product.category
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch || categoryMatch;
  });
};

export const sortProducts = (
  products: Product[],
  sortOrder: string,
  sortBy: string,
) => {
  return products.sort((a: IndexedProduct, b: IndexedProduct) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === 'asc') {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
    }

    return 0;
  });
};
