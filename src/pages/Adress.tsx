import { useEffect, useState } from 'react';
import { Adress } from '../types/Adress';
import { useParams } from 'react-router-dom';
import { getAdresses, searchAdress } from '../services/AdressService';
import FormModalAdress from '../components/tableAdresses/ModalAdress';
import TableAdress from '../components/tableAdresses/TableAdress';
import style from '../style/Global.module.css';
import { Link } from 'react-router-dom';

const AddressPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [adresses, setAdresses] = useState<Adress[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const clienteCpf = useParams().cpf || '';

  const loadAdresses = async () => {
    try {
      const response = await getAdresses(clienteCpf);
      if (response) {
        setAdresses(response);
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
    const orderedAdresses = [...adresses].sort((a, b) =>
      a.street.localeCompare(b.street)
    );
    setAdresses(orderedAdresses);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchAdress(clienteCpf, searchInput);
        if (response) {
          setAdresses(response);
        } else {
          console.error('Failed to load adresses');
        }
      } catch (error) {
        console.error('An error occurred while loading adresses:', error);
      }
    };

    fetchData();
  }, [searchInput, clienteCpf]);

  return (
    <div className="app">
      <header>
        <Link to="/">
          <button>Voltar</button>
        </Link>
        <h1>Endereços cadastrados</h1>
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
        <FormModalAdress
          show={isVisible}
          adress={null}
          isEditing={false}
          loadAdresses={loadAdresses}
          onClose={handleModal}
        />
      </div>
      <div className={style.table}>
        <TableAdress adresses={adresses} loadAdresses={loadAdresses} />
      </div>
    </div>
  );
};

export default AddressPage;
