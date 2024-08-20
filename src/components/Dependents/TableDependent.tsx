import React, { useEffect, useState } from 'react';
import FormModalDependent from './ModalDependent';
import style from '../../style/Table.module.css';
import { TablePropsDependent } from '../../types/Dependent/TablePropsDependent';
import { Dependent } from '../../types/Dependent/Dependent';
import { deleteDependent } from '../../services/DependentService';

const TableDependent: React.FC<TablePropsDependent> = ({
  dependents,
  loadDependents,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editDependent, setEditDependent] = useState<Dependent | null>(null);

  useEffect(() => {
    loadDependents();
  }, []);

  const handleEdit = (dependent: Dependent) => {
    setIsVisible(!isVisible);
    setEditDependent(dependent);
  };

  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        'Tem certeza que deseja excluir o endereço?'
      );
      if (confirm) {
        await deleteDependent(id);

        loadDependents();
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
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dependents.map((dependent: Dependent, id) => (
            <tr key={id}>
              <td>{dependent.name || ''}</td>
              <td>
                <button onClick={() => handleEdit(dependent)}>Editar</button>
                <button onClick={() => handleDelete(dependent.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <FormModalDependent
          show={isVisible}
          dependent={editDependent}
          isEditing={true}
          loadDependents={loadDependents}
          onClose={handleModal}
        />
      )}
    </div>
  );
};

export default TableDependent;
