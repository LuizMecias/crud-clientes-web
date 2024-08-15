import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TablePropsClient } from '../../types/TablePropsClient';
import { Client } from '../../types/Client';
import { deleteClient } from '../../services/ClientServices';
import FormModal from './ModalClient';
import style from '../../style/Table.module.css';

const TableClient: React.FC<TablePropsClient> = ({ clients, loadClients }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const handleEdit = (client: Client) => {
    setIsVisible(!isVisible);
    setEditClient(client);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o cliente?'
      );
      if (confirm) {
        await deleteClient(id);
        loadClients();
      }
    } catch (error) {
      console.error('An error occurred while deleting the client:', error);
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
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: Client, id) => (
            <tr key={id}>
              <td>{client.name || ''}</td>
              <td>{client.cpf || ''}</td>
              <td>{client.phone || ''}</td>
              <td>{client.email || ''}</td>
              <td>
                <Link to={`/addresses`} state={{ client: client }}>
                  <button>Endereço</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleEdit(client)}>Editar</button>
                <button onClick={() => handleDelete(client.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <FormModal
          show={isVisible}
          client={editClient}
          isEditing={true}
          loadClients={loadClients}
          onClose={handleModal}
        />
      )}
    </div>
  );
};

export default TableClient;
