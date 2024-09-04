import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import style from '../../style/Modal.module.css';
import FormModalProduct from '../product/ModalProduct';
import { Product } from '../../types/order_product/product/Product';
import { listProducts, searchProduct } from '../../services/ProductService';
import TableProduct from '../product/TableProduct';
import { ModalPropsShopping } from '../../types/shopping/ModasPropsShopping';

const FormModalShopping: React.FC<ModalPropsShopping> = ({ show, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [errors, setErrors] = useState<Partial<Product>>({});

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async () => {
    // try {
    //   const data {
    //     //adicionar pedido
    //   };
    //   if (isEditing) {
    //     await updateClient(id, data);
    //   } else {
    //     await registerClient(data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleValidation = () => {
    const novosErrors: Record<string, string> = {};

    if (products.length === 0) {
      novosErrors.products = 'Por favor, selecione pelo menos um produto.';
      console.log('Por favor, selecione pelo menos um produtos.');

      window.alert('Por favor, selecione pelo menos um produto.');
    } else {
      products.forEach((product) => {
        if (product.quantity <= 0) {
          novosErrors.product = 'A quantidade do produto deve ser maior que 0.';
          console.log('A quantidade do produto deve ser maior que 0.');

          window.alert('A quantidade do produto deve ser maior que 0.');
        }
      });
    }

    setErrors(novosErrors);

    if (Object.keys(novosErrors).length > 0) {
      return;
    } else {
      handleSubmit();
    }
  };

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

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOrder = () => {
    const orderedProducts = [...products].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setProducts(orderedProducts);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchProduct(searchInput);
        if (response) {
          setProducts(response);
        } else {
          console.error('Failed to search clients');
        }
      } catch (error) {
        console.error('An error occurred while searching clients:', error);
      }
    };

    fetchData();
  }, [searchInput]);

  return (
    <div className={`${style.background} ${show ? style.show : ''}`}>
      <Modal show={show} onHide={onClose} className={style.modal}>
        <Modal.Header>
          <Modal.Title className={style.title}>Produtos</Modal.Title>
          <p>Selecione o produto que deseja e especifique a quantidade</p>
        </Modal.Header>
        <Modal.Body>
          <div className={style.buttons}>
            <button onClick={handleModal}>Adicionar</button>
            <button onClick={handleOrder}>A - Z</button>
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Form onSubmit={(e) => e.preventDefault()}>
            <TableProduct products={products} loadProducts={loadProducts} />
            <div className={style.buttons}>
              <button onClick={onClose}>Cancelar</button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleValidation();
                }}
              >
                Salvar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="modal">
        <FormModalProduct
          show={isVisible}
          product={null}
          isEditing={false}
          loadProducts={loadProducts}
          onClose={handleModal}
        />
      </div>
    </div>
  );
};

export default FormModalShopping;
