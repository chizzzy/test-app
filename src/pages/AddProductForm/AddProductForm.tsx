import React from 'react';
import { useFormik } from 'formik';
import { addProduct } from 'redux/modules/product';
import { useAppDispatch } from 'redux/hooks';

import './AddProductForm.css';
import { validationSchema } from 'helpers/validation';
import { Product } from 'types';

export interface Form {
  title: string;
  description: string;
  price: string;
  rating: string;
  stock: string;
  category: string;
}

const formValues: Array<keyof Form> = [
  'title',
  'description',
  'price',
  'rating',
  'stock',
  'category',
];

export const AddProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      rating: '',
      stock: '',
      category: '',
    },
    validationSchema,
    onSubmit: (values: Form) => {
      const newProduct: Product = {
        ...values,
        price: +values.price,
        rating: +values.rating,
        stock: +values.stock,
      };
      dispatch(addProduct(newProduct));
      formik.resetForm();
    },
  });

  return (
    <div className="add-product-form">
      <h1 className="form-title">Add Product</h1>
      <form onSubmit={formik.handleSubmit}>
        {formValues.map((field) => (
          <div className="form-field" key={field}>
            <label className="input-title" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              name={field}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              className="input-field"
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="error-message">{formik.errors[field]}</div>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};
