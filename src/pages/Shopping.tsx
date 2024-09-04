import React, { useEffect, useState } from 'react';
import style from '../style/Global.module.css';
import { Link, useLocation } from 'react-router-dom';
import TableShopping from '../components/shopping/TableShopping';
import { listProducts } from '../services/ProductService';
import { Product } from '../types/order_product/product/Product';
import FormModalProduct from '../components/product/ModalProduct';
import { Order } from '../types/order_product/order/Order';
import { Client } from '../types/Client/Client';
import { listOrders, registerOrder } from '../services/ShoppingService';

const ShoppingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<Order[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [items, setItems] = useState<Product[]>([]);
  const location = useLocation();
  const clients = location.state?.clients || [];
  const [selectedClientId, setSelectedClientId] = useState<number | ''>('');
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const loadProducts = async () => {
    try {
      const response = await listProducts();
      if (response) {
        setProducts(response);
      } else {
        console.error('Failed to load products');
      }
    } catch (error) {
      console.error('An error occurred while loading products:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await listOrders();
      if (response) {
        setOrder(response);
      } else {
        console.error('Failed to load products');
      }
    } catch (error) {
      console.error('An error occurred while loading products:', error);
    }
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleTable = () => {
    setItems((prevItems) => {
      const selectedProduct = products.find(
        (product) => product.id === selectedProductId
      );
      if (selectedProduct) {
        return [...prevItems, { ...selectedProduct, quantity: quantity }];
      }
      return prevItems;
    });
  };

  const handleTotalChange = (totalQuantity: number, totalPrice: number) => {
    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  };

  const handleSubmit = async () => {
    const order = {
      id: 0,
      client: clients.find(
        (client: { id: string | number }) => client.id === selectedClientId
      ),
      products: items,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    };

    setSelectedProductId('');
    setSelectedClientId('');
    setQuantity(1);
    setItems([]);
    setOrder([order]);
    registerOrder(order);
  };

  return (
    <div className="page">
      <header>
        <h1>Carrinho de compras</h1>
        <nav className={style.menu}>
          <Link to={`/`}>Clientes</Link> |{' '}
          <Link to={`/reports`} state={{ order: order }}>
            Relatório
          </Link>{' '}
          |{' '}
          <Link className={style.active} to={`/shopping`}>
            Compras
          </Link>
        </nav>
      </header>
      <div className={style.buttons}>
        <button onClick={handleModal}>Cadastrar produto</button>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
        >
          <option>Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - R$ {product.price}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button onClick={handleTable}>Adicionar ao carrinho</button>
      </div>
      <div className="modal">
        <FormModalProduct
          show={isVisible}
          product={null}
          isEditing={false}
          loadProducts={loadProducts}
          onClose={handleModal}
        />
      </div>
      <div className={style.table}>
        <TableShopping items={items} onTotalChange={handleTotalChange} />
      </div>
      <div className={style.client}>
        CLiente:
        <select
          value={selectedClientId}
          onChange={(e) => setSelectedClientId(parseInt(e.target.value))}
        >
          <option>Selecione um cliente</option>
          {clients.map((client: Client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div className={style.buttons}>
        <button onClick={handleSubmit}>Finalizar compra</button>
      </div>
    </div>
  );
};

export default ShoppingPage;
