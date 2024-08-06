import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import FormModal from './components/Modal';
import { Client } from './types/Client';
import { getClients, searchClient } from './services/ClientServices';
import './App.css';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchText, setSearchText] = useState('');

  const loadClients = async () => {
    try {
      const response = await getClients();
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
      a.name.localeCompare(b.name)
    );
    setClients(orderedClients);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchClient(searchText);
        if (response) {
          setClients(response);
        } else {
          console.error('Failed to load clients');
        }
      } catch (error) {
        console.error('An error occurred while loading clients:', error);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <div className="app">
      <header>
        <h1>Gerenciamento de Clientes da FATECOINS</h1>
      </header>
      <div className="buttons">
        <button onClick={handleModal}>Adicionar</button>
        <button onClick={handleOrder}>A - Z</button>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="modal">
        <FormModal
          show={isVisible}
          client={{ name: '', cpf: '', phone: '', email: '' }}
          isEditing={false}
          loadClients={loadClients}
          onClose={handleModal}
        />
      </div>
      <div className="table">
        <Table clients={clients} loadClients={loadClients} />
      </div>
    </div>
  );
};

export default App;
