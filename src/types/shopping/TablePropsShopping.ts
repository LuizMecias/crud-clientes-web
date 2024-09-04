import { Product } from '../order_product/product/Product';

export interface TablePropsShopping {
  items: Product[];
  onTotalChange: (totalQuantity: number, totalPrice: number) => void;
}
