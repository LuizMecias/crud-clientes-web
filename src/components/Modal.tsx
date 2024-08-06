import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { ModalProps } from '../types/ModalProps';
import { addClient, updateClient } from '../services/ClientServices';
import style from './Modal.module.css';
import { Client } from '../types/Client';

const FormModal: React.FC<ModalProps> = ({
  show = false,
  client,
  isEditing,
  loadClients,
  onClose,
}) => {
  const [name, setName] = useState(client?.name || '');
  const [cpf, setCPF] = useState(client?.cpf || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [email, setEmail] = useState(client?.email || '');
  const [erros, setErros] = useState<Partial<Client>>({});

  const handleSubmit = async () => {
    try {
      const data = {
        name: name,
        cpf: cpf,
        phone: phone,
        email: email,
      };

      if (isEditing) {
        await updateClient(client?.cpf || '', data);
      } else {
        await addClient(data);
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

  const validarCampos = () => {
    const novosErros: Partial<Client> = {};

    // Validação do campo nome
    if (name.trim() === '') {
      novosErros.name = 'Por favor, digite o seu nome.';
    }

    // Validação do campo cpf
    if (cpf.trim() === '') {
      novosErros.cpf = 'Por favor, digite o seu CPF.';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      novosErros.cpf = 'Por favor, digite um CPF válido.';
    }

    // Validação do campo telefone
    if (phone.trim() === '') {
      novosErros.phone = 'Por favor, digite o seu telefone.';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
      novosErros.phone = 'Por favor, digite um telefone válido.';
    }

    // Validação do campo email
    if (email.trim() === '') {
      novosErros.email = 'Por favor, digite o seu email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = 'Por favor, digite um email válido.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    } else {
      handleSubmit();
    }
  };

  return (
    <div className={`${style.background} ${show ? style.show : ''}`}>
      <Modal show={show} onHide={onClose} className={style.modal}>
        <Modal.Header>
          <Modal.Title className={style.title}>Cadastro de Cliente</Modal.Title>
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
              {erros.name && <span>{erros.name}</span>}
            </Form.Group>
            <Form.Group controlId="formCPF" className={style.row}>
              <Form.Label>CPF</Form.Label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                placeholder="000.000.000-00"
                disabled={!!isEditing}
              />
              {erros.cpf && <span>{erros.cpf}</span>}
            </Form.Group>
            <Form.Group controlId="formPhone" className={style.row}>
              <Form.Label>Telefone</Form.Label>
              <InputMask
                mask="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
              {erros.phone && <span>{erros.phone}</span>}
            </Form.Group>
            <Form.Group controlId="formEmail" className={style.row}>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {erros.email && <span>{erros.email}</span>}
            </Form.Group>
            <div className={style.buttons}>
              <button onClick={onClose}>Cancelar</button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  validarCampos();
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

export default FormModal;
