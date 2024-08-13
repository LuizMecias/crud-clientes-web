import React, { useEffect, useState } from 'react';
import { Client } from '../../types/Client';
import { TableProps } from '../../types/TableProps';
import FormModal from './ModalClient';
import { deleteClient } from '../../services/ClientServices';
import style from '../../style/Table.module.css';
import { Link } from 'react-router-dom';

const TableClient: React.FC<TableProps> = ({ clients, loadClients }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editClient, setEditClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    loadClients();
  }, []);

  const handleEdit = (client: Client) => {
    setIsVisible(!isVisible);
    setEditClient(client);
  };

  const handleDelete = async (cpf: string) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o cliente?'
      );
      if (confirm) {
        await deleteClient(cpf);
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
          {clients.map((client: Client, index) => (
            <tr key={index}>
              <td>{client.name || ''}</td>
              <td>{client.cpf}</td>
              <td>{client.phone || ''}</td>
              <td>{client.email || ''}</td>
              <td>
                <Link to={`/address/${client.cpf}`}>
                  <button>Endereço</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleEdit(client)}>Editar</button>
                <button onClick={() => handleDelete(client.cpf)}>
                  Excluir
                </button>
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
