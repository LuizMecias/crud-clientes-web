import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from '../style/Global.module.css';
import specificStyle from '../style/Shopping.module.css';
import { listProducts } from '../services/ProductService';
import { Product } from '../types/order_product/product/Product';
import { Client } from '../types/Client/Client';
import TableShopping from '../components/shopping/TableShopping';
import FormModalProduct from '../components/product/ModalProduct';
import {
  listOrders,
  registerOrder,
  registerOrderProduct,
} from '../services/ShoppingService';
import { Order } from '../types/order_product/order/Order';

const ShoppingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [items, setItems] = useState<Product[]>([]);
  const location = useLocation();
  const clients = location.state?.clients || [];
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

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
        setOrders(response);
      } else {
        console.error('Failed to load orders');
      }
    } catch (error) {
      console.error('An error occurred while loading orders:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
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

  const handleSubmit = async () => {
    try {
      const dataOrderProduct = items.map((item) => ({
        product: item,
        quantity: item.quantity,
        price: item.price,
      }));
      const dataOrder = {
        client: clients.find(
          (client: { id: number }) => client.id === selectedClientId
        ),
        orderProducts: dataOrderProduct,
      };

      console.log(dataOrderProduct);

      await registerOrder(dataOrder);

      setItems([]);
      setQuantity(1);
      setSelectedProductId(0);
      setSelectedClientId(0);
      setTotalQuantity(0);
      setTotalPrice(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <header>
        <h1>Carrinho de compras</h1>
        <nav className={style.menu}>
          <Link to={`/`}>Clientes</Link> |{' '}
          <Link to={`/reports`}>Relatório</Link> |{' '}
          <Link className={style.active} to={`/shopping`}>
            Compras
          </Link>
        </nav>
      </header>
      <div className={specificStyle.body}>
        <div className={specificStyle.selectsContainer}>
          <div className={specificStyle.containerClient}>
            <h2>Cliente</h2>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(parseInt(e.target.value))}
              className={specificStyle.selectClient}
              size={5}
            >
              {clients.map((client: Client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className={specificStyle.containerProductButton}>
            <div className={specificStyle.divider}>
              <h2>Produtos</h2>
              <button
                onClick={handleModal}
                className={specificStyle.selectButton}
              >
                Cadastrar prodtudo
              </button>
              <FormModalProduct
                show={isVisible}
                product={null}
                isEditing={false}
                onClose={handleModal}
              />
            </div>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
              className={specificStyle.selectProduct}
              size={5}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - R$ {product.price}
                </option>
              ))}
            </select>
          </div>

          <div className={specificStyle.containerQuantity}>
            <h2>Quantidade</h2>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className={specificStyle.inputQuantity}
            />
            <button
              onClick={handleTable}
              className={specificStyle.selectButton}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        <div className={specificStyle.cartContainer}>
          <h2>Carrinho</h2>
          <div className={specificStyle.cartTable}>
            <TableShopping
              items={items}
              onTotalChange={(totalQuantity, totalPrice) => {
                setTotalQuantity(totalQuantity);
                setTotalPrice(totalPrice);
              }}
            />
          </div>

          <button onClick={handleSubmit} className={specificStyle.cartButton}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
