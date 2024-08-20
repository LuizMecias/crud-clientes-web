import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ModalPropsPhone } from '../../types/Phone/ModalPropsPhone';
import style from '../../style/Modal.module.css';
import { Phone } from '../../types/Phone/Phone';
import { registerPhone, updatePhone } from '../../services/PhoneService';
import ReactInputMask from 'react-input-mask';

const FormModalPhone: React.FC<ModalPropsPhone> = ({
  show = false,
  phone,
  isEditing,
  loadPhones,
  onClose,
}): React.ReactElement => {
  const id: number = phone?.id || 0;
  const location = useLocation();
  const client = location.state.client;
  const clientId: number = client.id;
  const [phoneNumber, setPhoneNumber] = useState<string>(
    phone?.phoneNumber || ''
  );
  const [errors, setErrors] = useState<Partial<Phone>>({});

  const handleSubmit = async (): Promise<void> => {
    try {
      const data: Phone = {
        id,
        clientId,
        phoneNumber,
      };

      if (isEditing) {
        await updatePhone(id, data);
      } else {
        await registerPhone(data);
      }

      setPhoneNumber('');
      loadPhones();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidate = (): void => {
    const novosErrors: Partial<Phone> = {};

    // Validação do campo telefone
    if (phoneNumber.trim() === '') {
      novosErrors.phoneNumber = 'Por favor, digite o seu telefone.';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phoneNumber)) {
      novosErrors.phoneNumber = 'Por favor, digite um telefone válido.';
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
            {isEditing ? 'Editar telefone' : 'Cadastrar telefone'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formPhone" className={style.row}>
              <Form.Label>Telefone</Form.Label>
              <ReactInputMask
                mask="(99) 99999-9999"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="(00) 00000-0000"
              />
              {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
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

export default FormModalPhone;
