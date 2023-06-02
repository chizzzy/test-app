import { object, string, number } from 'yup';

export const validationSchema = object({
  title: string().required('Required'),
  description: string().required('Required'),
  price: number().typeError('Must be a number').positive().required('Required'),
  rating: number()
    .typeError('Must be a number')
    .required('Required')
    .positive()
    .max(5, 'Must be at most 5'),
  stock: number().typeError('Must be a number').required('Required'),
  category: string().required('Required'),
});
