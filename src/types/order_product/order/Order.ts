import { Client } from '../../Client/Client';
import { Product } from '../product/Product';

export interface Order {
  id: number;
  client: Client;
  products: Product[];
  totalQuantity: number;
  totalPrice: number;
}
