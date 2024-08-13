import React, { useEffect, useState } from 'react';
import FormModalAdress from './ModalAdress';
import style from '../../style/Table.module.css';
import { TablePropsAdress } from '../../types/TablePropsAdress';
import { Adress } from '../../types/Adress';
import { deleteAdress } from '../../services/AdressService';

const TableAdress: React.FC<TablePropsAdress> = ({
  adresses,
  loadAdresses,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editAdress, setEditAdress] = useState<Adress | undefined>(undefined);

  useEffect(() => {
    loadAdresses();
  }, []);

  const handleEdit = (adress: Adress) => {
    setIsVisible(!isVisible);
    setEditAdress(adress);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o endereço?'
      );
      if (confirm) {
        await deleteAdress(id);

        loadAdresses();
      }
    } catch (error) {
      console.error('An error occurred while deleting the adress:', error);
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
            <th>CEP</th>
            <th>Rua</th>
            <th>Número</th>
            <th>Complemento</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>País</th>
            <th>Referência</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {adresses.map((adress: Adress, index) => (
            <tr key={index}>
              <td>{adress.cep || ''}</td>
              <td>{adress.street || ''}</td>
              <td>{adress.number || ''}</td>
              <td>{adress.complement || ''}</td>
              <td>{adress.district || ''}</td>
              <td>{adress.city || ''}</td>
              <td>{adress.state || ''}</td>
              <td>{adress.country || ''}</td>
              <td>{adress.reference || ''}</td>
              <td>
                <button onClick={() => handleEdit(adress)}>Editar</button>
                <button onClick={() => handleDelete(adress.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <FormModalAdress
          show={isVisible}
          adress={editAdress}
          isEditing={true}
          loadAdresses={loadAdresses}
          onClose={handleModal}
        />
      )}
    </div>
  );
};

export default TableAdress;
