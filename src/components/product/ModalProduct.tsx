import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import style from '../../style/Modal.module.css';
import { Product } from '../../types/order_product/product/Product';
import { ModalPropsProduct } from '../../types/order_product/product/ModalPropsProdusct';
import { registerProduct, updateProduct } from '../../services/ProductService';

const FormModalProduct: React.FC<ModalPropsProduct> = ({
  show = false,
  product,
  isEditing,
  loadProducts,
  onClose,
}) => {
  const id: number = product?.id || 0;
  const [name, setName] = useState<string>(product?.name || '');
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [errors, setErrors] = useState<Partial<Product>>({});

  const handleSubmit = async () => {
    try {
      const data: Product = {
        id,
        name,
        price,
        quantity: 1,
      };
      console.log(data);

      if (isEditing) {
        await updateProduct(id, data);
      } else {
        await registerProduct(data);
      }

      setName('');
      setPrice(0);
      loadProducts();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidate = () => {
    const novosErrors: Partial<Product> = {};

    // Validação do campo nome
    if (name.trim() === '') {
      novosErrors.name = 'Por favor, digite o nome do produto.';
    }

    // Validação do campo preço
    // if (price.trim() === '') {
    //   novosErrors.price? = 'Por favor, digite o preço do produto.';
    // }

    setErrors(novosErrors);

    if (Object.keys(novosErrors).length > 0) {
      return;
    } else {
      handleSubmit();
    }
  };

  return (
    <div className={`${style.background} ${show ? style.show : ''}`}>
      <Modal show={show} onHide={onClose} className={style.modal}>
        <Modal.Header>
          <Modal.Title className={style.title}>
            {isEditing ? 'Editar Produto' : 'Cadastrar Produto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formName" className={style.row}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span>{errors.name}</span>}
            </Form.Group>
            <Form.Group controlId="formPrice" className={style.row}>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
              {errors.price && <span>{errors.price}</span>}
            </Form.Group>
            <div className={style.buttons}>
              <button onClick={onClose}>Cancelar</button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleValidate();
                }}
              >
                Salvar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FormModalProduct;
