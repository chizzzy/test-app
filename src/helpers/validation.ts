import { object, string, number } from 'yup';

export const validationSchema = object({
  name: string().required('Required'),
  author: string().required('Required'),
  publicationYear: number()
    .typeError('Publication Year must be a valid number')
    .integer('Publication Year must be an integer')
    .min(1900, 'Publication Year must be greater than or equal to 1900')
    .max(new Date().getFullYear(), 'Publication Year cannot be in the future')
    .required('Publication Year is required'),
  rating: number()
    .typeError('Must be a number')
    .required('Required')
    .min(0, 'Must be at least 0')
    .max(5, 'Must be at most 5'),
});
