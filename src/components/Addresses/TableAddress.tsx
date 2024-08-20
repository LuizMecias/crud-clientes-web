import React, { useEffect, useState } from 'react';
import FormModalAddress from './ModalAddress';
import style from '../../style/Table.module.css';
import { TablePropsAddress } from '../../types/Address/TablePropsAddress';
import { Address } from '../../types/Address/Address';
import { deleteAddress } from '../../services/AddressService';

const TableAddress: React.FC<TablePropsAddress> = ({
  addresses,
  loadAddresses,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleEdit = (address: Address) => {
    setIsVisible(!isVisible);
    setEditAddress(address);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o endereço?'
      );
      if (confirm) {
        await deleteAddress(id);

        loadAddresses();
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
          {addresses.map((address: Address, id) => (
            <tr key={id}>
              <td>{address.cep || ''}</td>
              <td>{address.street || ''}</td>
              <td>{address.number || ''}</td>
              <td>{address.complement || ''}</td>
              <td>{address.district || ''}</td>
              <td>{address.city || ''}</td>
              <td>{address.state || ''}</td>
              <td>{address.country || ''}</td>
              <td>{address.reference || ''}</td>
              <td>
                <button onClick={() => handleEdit(address)}>Editar</button>
                <button onClick={() => handleDelete(address.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <FormModalAddress
          show={isVisible}
          address={editAddress}
          isEditing={true}
          loadAddresses={loadAddresses}
          onClose={handleModal}
        />
      )}
    </div>
  );
};

export default TableAddress;
