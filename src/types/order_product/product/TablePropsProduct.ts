import { Product } from './Product';

export interface TablePropsProduct {
  products: Product[];
  loadProducts: () => void;
}
