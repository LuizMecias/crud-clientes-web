import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FormModalDependent from '../components/Dependents/ModalDependent';
import TableDependent from '../components/Dependents/TableDependent';
import { listDependents, searchDependent } from '../services/DependentService';
import { Dependent } from '../types/Dependent';
import style from '../style/Global.module.css';

const DependentsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const location = useLocation();
  const client = location.state.client;

  const loadDependents = async () => {
    try {
      const response = await listDependents(client.id);
      if (response) {
        setDependents(response);
      } else {
        console.error('Failed to load dependents');
      }
    } catch (error) {
      console.error('An error occurred while loading dependents:', error);
    }
  };

  const handleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOrder = () => {
    const orderedDependents = [...dependents].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setDependents(orderedDependents);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchDependent(client.id, searchInput);
        if (response) {
          setDependents(response);
        } else {
          console.error('Failed to load dependents');
        }
      } catch (error) {
        console.error('An error occurred while loading dependents:', error);
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
        <h1 className={style.title}>Dependentes cadastrados</h1>
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
        <FormModalDependent
          show={isVisible}
          dependent={null}
          isEditing={false}
          loadDependents={loadDependents}
          onClose={handleModal}
        />
      </div>
      <div className={style.table}>
        <TableDependent
          dependents={dependents}
          loadDependents={loadDependents}
        />
      </div>
    </div>
  );
};

export default DependentsPage;
