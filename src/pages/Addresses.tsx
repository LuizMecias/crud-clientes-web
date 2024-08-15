import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TableAddress from '../components/tableAdresses/TableAddress';
import FormModalAddress from '../components/tableAdresses/ModalAddress';
import { listAddresses, searchAddress } from '../services/AddressService';
import { Address } from '../types/Address';
import style from '../style/Global.module.css';

const AddressesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const location = useLocation();
  const client = location.state.client;

  const loadAddresses = async () => {
    try {
      const response = await listAddresses(client.id);
      if (response) {
        setAddresses(response);
      } else {
        console.error('Failed to load addresses');
      }
    } catch (error) {
      console.error('An error occurred while loading addresses:', error);
    }
  };

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOrder = () => {
    const orderedAddresses = [...addresses].sort((a, b) =>
      isAscending
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street)
    );
    setAddresses(orderedAddresses);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchAddress(client.id, searchInput);
        if (response) {
          setAddresses(response);
        } else {
          console.error('Failed to load addresses');
        }
      } catch (error) {
        console.error('An error occurred while loading addresses:', error);
      }
    };

    fetchData();
  }, [searchInput, client.id]);

  return (
    <div className="app">
      <header>
        <Link to="/" className={style.link}>
          <button>Voltar</button>
        </Link>
        <h1 className={style.title}>Endereços cadastrados</h1>
        <h2 className={style.subtitle}>Cliente: {client.name}</h2>
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
        <FormModalAddress
          show={isVisible}
          address={null}
          isEditing={false}
          loadAddresses={loadAddresses}
          onClose={handleModal}
        />
      </div>
      <div className={style.table}>
        <TableAddress addresses={addresses} loadAddresses={loadAddresses} />
      </div>
    </div>
  );
};

export default AddressesPage;
