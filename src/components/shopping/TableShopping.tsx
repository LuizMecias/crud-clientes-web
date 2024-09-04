import React from 'react';
import style from '../../style/Table.module.css';
import { TablePropsShopping } from '../../types/shopping/TablePropsShopping';

const TableShopping: React.FC<TablePropsShopping> = ({
  items,
  onTotalChange,
}) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  onTotalChange(totalQuantity, totalPrice);

  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Quantidade</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>R$ {item.price}</td>
            </tr>
          ))}
          <tr className={style.lastRow}>
            <td>Total</td>
            <td>{totalQuantity}</td>
            <td>R$ {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableShopping;
