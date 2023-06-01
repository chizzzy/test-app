import React from 'react';
import { useFormik } from 'formik';
import { addProduct } from 'redux/modules/product';
import { useAppDispatch } from 'redux/hooks';

import './AddProductForm.css';
import { validationSchema } from 'helpers/validation';

export interface Form {
  author: string;
  name: string;
  publicationYear: string;
  rating: string;
}

export const AddProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      author: '',
      publicationYear: '',
      rating: '',
    },
    validationSchema,
    onSubmit: (values: Form) => {
      console.log(values);
      dispatch(addProduct(values));
      formik.resetForm();
    },
  });

  return (
    <div className="add-product-form">
      <h1 className="form-title">Add Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <label className="input-title" htmlFor="name">
            Name:
          </label>
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="input-field"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-field">
          <label className="input-title" htmlFor="author">
            Author:
          </label>
          <input
            name="author"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
            className="input-field"
          />
          {formik.touched.author && formik.errors.author && (
            <div className="error-message">{formik.errors.author}</div>
          )}
        </div>
        <div className="form-field">
          <label className="input-title" htmlFor="publicationYear">
            Publication Year:
          </label>
          <input
            name="publicationYear"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.publicationYear}
            className="input-field"
          />
          {formik.touched.publicationYear && formik.errors.publicationYear && (
            <div className="error-message">{formik.errors.publicationYear}</div>
          )}
        </div>
        <div className="form-field">
          <label className="input-title" htmlFor="rating">
            Rating:
          </label>
          <input
            name="rating"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
            className="input-field"
          />
          {formik.touched.rating && formik.errors.rating && (
            <div className="error-message">{formik.errors.rating}</div>
          )}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};
