import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from 'types';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface AddProductResponse {
  id: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        headers,
      });
      return response.data.products as Product[];
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch products');
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`, {
        headers,
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Product, thunkAPI) => {
    try {
      const response: AddProductResponse = await axios.post(
        `https://dummyjson.com/products/add`,
        {
          headers,
          body: product,
        },
      );

      return { ...product, id: response.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedProductId = action.payload;
        state.products = state.products.filter(
          (product) => product.id !== deletedProductId,
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateProduct } = productSlice.actions;
