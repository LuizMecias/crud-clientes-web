import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { ModalPropsClient } from '../../types/ModalPropsClient';
import { registerClient, updateClient } from '../../services/ClientServices';
import style from '../../style/Modal.module.css';
import { Client } from '../../types/Client';

const FormModalClient: React.FC<ModalPropsClient> = ({
  show = false,
  client,
  isEditing,
  loadClients,
  onClose,
}) => {
  const id: number = client?.id || 0;
  const [name, setName] = useState<string>(client?.name || '');
  const [cpf, setCPF] = useState<string>(client?.cpf || '');
  const [phone, setPhone] = useState<string>(client?.phone || '');
  const [email, setEmail] = useState<string>(client?.email || '');
  const [errors, setErrors] = useState<Partial<Client>>({});

  const handleSubmit = async () => {
    try {
      const data = {
        id,
        name,
        cpf,
        phone,
        email,
      };

      if (isEditing) {
        await updateClient(id, data);
      } else {
        await registerClient(data);
      }

      setName('');
      setCPF('');
      setPhone('');
      setEmail('');
      loadClients();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidate = () => {
    const novosErrors: Partial<Client> = {};

    // Validação do campo nome
    if (name.trim() === '') {
      novosErrors.name = 'Por favor, digite o seu nome.';
    }

    // Validação do campo cpf
    if (cpf.trim() === '') {
      novosErrors.cpf = 'Por favor, digite o seu CPF.';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      novosErrors.cpf = 'Por favor, digite um CPF válido.';
    }

    // Validação do campo telefone
    if (phone.trim() === '') {
      novosErrors.phone = 'Por favor, digite o seu telefone.';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
      novosErrors.phone = 'Por favor, digite um telefone válido.';
    }

    // Validação do campo email
    if (email.trim() === '') {
      novosErrors.email = 'Por favor, digite o seu email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErrors.email = 'Por favor, digite um email válido.';
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
            {isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}
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
            <Form.Group controlId="formCPF" className={style.row}>
              <Form.Label>CPF</Form.Label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                placeholder="000.000.000-00"
              />
              {errors.cpf && <span>{errors.cpf}</span>}
            </Form.Group>
            <Form.Group controlId="formPhone" className={style.row}>
              <Form.Label>Telefone</Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
              {errors.phone && <span>{errors.phone}</span>}
            </Form.Group>
            <Form.Group controlId="formEmail" className={style.row}>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span>{errors.email}</span>}
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

export default FormModalClient;
