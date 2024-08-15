import React, { useEffect, useState } from 'react';
import Table from '../components/tableClients/TableClient';
import FormModal from '../components/tableClients/ModalClient';
import { listClients, searchClient } from '../services/ClientServices';
import { Client } from '../types/Client';
import style from '../style/Global.module.css';

const ClientsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const loadClients = async () => {
    try {
      const response = await listClients();
      if (response) {
        setClients(response);
      } else {
        console.error('Failed to load clients');
      }
    } catch (error) {
      console.error('An error occurred while loading clients:', error);
    }
  };

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOrder = () => {
    const orderedClients = [...clients].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setClients(orderedClients);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchClient(searchInput);
        if (response) {
          setClients(response);
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
    <div className="page">
      <header>
        <h1>Gerenciamento de Clientes da FATECOINS</h1>
      </header>
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
      <div className="modal">
        <FormModal
          show={isVisible}
          client={null}
          isEditing={false}
          loadClients={loadClients}
          onClose={handleModal}
        />
      </div>
      <div className={style.table}>
        <Table clients={clients} loadClients={loadClients} />
      </div>
    </div>
  );
};

export default ClientsPage;
