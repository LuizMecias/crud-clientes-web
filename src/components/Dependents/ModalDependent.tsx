import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ModalPropsDependent } from '../../types/ModalPropsDependent';
import style from '../../style/Modal.module.css';
import { Dependent } from '../../types/Dependent';
import {
  registerDependent,
  updateDependent,
} from '../../services/DependentService';

const FormModalDependent: React.FC<ModalPropsDependent> = ({
  show = false,
  dependent,
  isEditing,
  loadDependents,
  onClose,
}): React.ReactElement => {
  const id: number = dependent?.id || 0;
  const location = useLocation();
  const client = location.state.client;
  const clientId: number = client.id;
  const [name, setName] = useState<string>(dependent?.name || '');
  const [errors, setErrors] = useState<Partial<Dependent>>({});

  const handleSubmit = async (): Promise<void> => {
    try {
      const data: Dependent = {
        id,
        clientId,
        name,
      };

      if (isEditing) {
        await updateDependent(id, data);
      } else {
        await registerDependent(data);
      }

      setName('');
      loadDependents();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidate = (): void => {
    const novosErrors: Partial<Dependent> = {};

    // Validation of the cep field
    if (name.trim() === '') {
      novosErrors.name = 'Por favor, digite o seu nome.';
    }

    setErrors(novosErrors);

    if (Object.keys(novosErrors).length > 0) {
      return;
    } else {
      handleSubmit();
    }
  };

  return (
    <div className={`${style.background} ${show ? style.show : ''}`}>
      <Modal show={show} onHide={onClose} className={style.modal}>
        <Modal.Header>
          <Modal.Title className={style.title}>
            {isEditing ? 'Editar Dependente' : 'Cadastrar Dependente'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formName" className={style.row}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span>{errors.name}</span>}
            </Form.Group>
            <div className={style.buttons}>
              <button onClick={onClose}>Cancelar</button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleValidate();
                }}
              >
                Salvar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FormModalDependent;
