import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FormModalPhone from '../components/Phones/ModalPhone';
import TablePhone from '../components/Phones/TablePhone';
import { listPhones, searchPhone } from '../services/PhoneService';
import { Phone } from '../types/Phone/Phone';
import style from '../style/Global.module.css';

const PhonesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const location = useLocation();
  const client = location.state.client;

  const loadPhones = async () => {
    try {
      const response = await listPhones(client.id);
      if (response) {
        setPhones(response);
      } else {
        console.error('Failed to load phones');
      }
    } catch (error) {
      console.error('An error occurred while loading phones:', error);
    }
  };

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOrder = () => {
    const orderedDependents = [...phones].sort((a, b) =>
      isAscending
        ? a.phoneNumber.localeCompare(b.phoneNumber)
        : b.phoneNumber.localeCompare(a.phoneNumber)
    );
    setPhones(orderedDependents);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchPhone(client.id, searchInput);
        if (response) {
          setPhones(response);
        } else {
          console.error('Failed to load phones');
        }
      } catch (error) {
        console.error('An error occurred while loading phones:', error);
      }
    };

    fetchData();
  }, [searchInput, client.id]);

  return (
    <div className="page">
      <header>
        <Link to="/" className={style.link}>
          <button>Voltar</button>
        </Link>
        <h1 className={style.title}>Telefones cadastrados</h1>
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
        <FormModalPhone
          show={isVisible}
          phone={null}
          isEditing={false}
          loadPhones={loadPhones}
          onClose={handleModal}
        />
      </div>
      <div className={style.table}>
        <TablePhone phones={phones} loadPhones={loadPhones} />
      </div>
    </div>
  );
};

export default PhonesPage;
