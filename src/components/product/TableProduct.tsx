import React, { useEffect, useState } from 'react';
import style from '../../style/Table.module.css';
import { TablePropsProduct } from '../../types/order_product/product/TablePropsProduct';
import { Product } from '../../types/order_product/product/Product';
import { deleteProduct } from '../../services/ProductService';
import FormModalProduct from './ModalProduct';

const TableProduct: React.FC<TablePropsProduct> = ({
  products,
  loadProducts,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setIsVisible(!isVisible);
    setEditProduct(product);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o produto?'
      );
      if (confirm) {
        await deleteProduct(id);
        loadProducts();
      }
    } catch (error) {
      console.error('An error occurred while deleting the product:', error);
    }
  };

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>R$ {product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <FormModalProduct
          show={isVisible}
          product={editProduct}
          isEditing={true}
          onClose={handleModal}
        />
      )}
    </div>
  );
};

export default TableProduct;
