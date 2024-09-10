import { Client } from '../../Client/Client';
import { Product } from '../product/Product';

export interface Order {
  orderProducts: any;
  id?: number;
  client: Client;
}

export interface OrderProduct {
  orderProducts: Product[];
  id?: number;
  order: Order;
  product: Product;
  quantity: number;
  price: number;
}
