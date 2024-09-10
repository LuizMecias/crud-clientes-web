import { Client } from '../../Client/Client';
import { Product } from '../product/Product';

export interface Order {
  id?: number;
  client: Client;
}

export interface OrderProduct {
  id?: number;
  order: Order;
  product: Product;
  quantity: number;
  price: number;
}
