import { SORT_ORDERS } from 'helpers/constants';

export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail?: string;
}

export type SortOrder = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS];
