import React, { useEffect, useState } from 'react';
import FormModalPhone from './ModalPhone';
import style from '../../style/Table.module.css';
import { TablePropsPhone } from '../../types/Phone/TablePropsPhone';
import { Phone } from '../../types/Phone/Phone';
import { deletePhone } from '../../services/PhoneService';

const TablePhone: React.FC<TablePropsPhone> = ({ phones, loadPhones }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editPhone, setEditPhones] = useState<Phone | null>(null);

  useEffect(() => {
    loadPhones();
  }, []);

  const handleEdit = (phone: Phone) => {
    setIsVisible(!isVisible);
    setEditPhones(phone);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o telefone?'
      );
      if (confirm) {
        await deletePhone(id);

        loadPhones();
      }
    } catch (error) {
      console.error('An error occurred while deleting the phone:', error);
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
            <th>Telefones</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone: Phone, id) => (
            <tr key={id}>
              <td>{phone.phoneNumber || ''}</td>
              <td>
                <button onClick={() => handleEdit(phone)}>Editar</button>
                <button onClick={() => handleDelete(phone.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <FormModalPhone
          show={isVisible}
          phone={editPhone}
          isEditing={true}
          loadPhones={loadPhones}
          onClose={handleModal}
        />
      )}
    </div>
  );
};

export default TablePhone;
