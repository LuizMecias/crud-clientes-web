import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ModalPropsAddress } from '../../types/Address/ModalPropsAddress';
import style from '../../style/Modal.module.css';
import { Address } from '../../types/Address/Address';
import { registerAddress, updateAddress } from '../../services/AddressService';

const FormModalAddress: React.FC<ModalPropsAddress> = ({
  show = false,
  address,
  isEditing,
  loadAddresses,
  onClose,
}): React.ReactElement => {
  const id: number = address?.id || 0;
  const location = useLocation();
  const client = location.state.client;
  const clientId: number = client.id;
  const [cep, setCep] = useState<string>(address?.cep || '');
  const [street, setStreet] = useState<string>(address?.street || '');
  const [number, setNumber] = useState<string>(address?.number || '');
  const [complement, setComplement] = useState<string>(
    address?.complement || ''
  );
  const [district, setDistrict] = useState<string>(address?.district || '');
  const [city, setCity] = useState<string>(address?.city || '');
  const [state, setState] = useState<string>(address?.state || '');
  const [country, setCountry] = useState<string>(address?.country || '');
  const [reference, setReference] = useState<string>(address?.reference || '');
  const [erros, setErros] = useState<Partial<Address>>({});

  const handleSubmit = async (): Promise<void> => {
    try {
      const data: Address = {
        id,
        clientId,
        cep,
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
        reference,
      };

      if (isEditing) {
        await updateAddress(id, data);
      } else {
        await registerAddress(data);
      }

      setCep('');
      setStreet('');
      setNumber('');
      setComplement('');
      setDistrict('');
      setCity('');
      setState('');
      setCountry('');
      setReference('');
      loadAddresses();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const validarCampos = (): void => {
    const novosErros: Partial<Address> = {};

    // Validation of the cep field
    if (cep.trim() === '') {
      novosErros.cep = 'Por favor, digite o seu cep.';
    }

    // Validation of the street field
    if (street.trim() === '') {
      novosErros.street = 'Por favor, digite a sua rua ou avenida.';
    }

    // Validation of the number field
    if (number.trim() === '') {
      novosErros.number = 'Por favor, digite o seu número do seu endereço.';
    }

    // Validation of the complement field
    if (complement.trim() === '') {
      novosErros.complement = 'Por favor, digite o complemento.';
    }

    // Validation of the district field
    if (district.trim() === '') {
      novosErros.district = 'Por favor, digite o seu bairro.';
    }

    // Validation of the city field
    if (city.trim() === '') {
      novosErros.city = 'Por favor, digite a sua cidade.';
    }

    // Validation of the state field
    if (state.trim() === '') {
      novosErros.state = 'Por favor, digite o seu estado.';
    }

    // Validation of the country field
    if (country.trim() === '') {
      novosErros.country = 'Por favor, digite o seu país.';
    }

    // Validation of the reference field
    if (reference.trim() === '') {
      novosErros.reference = 'Por favor, digite uma referência.';
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
          <Modal.Title className={style.title}>
            {isEditing ? 'Editar Endereço' : 'Cadastrar Endereço'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formCep" className={style.row}>
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              {erros.cep && <span>{erros.cep}</span>}
            </Form.Group>
            <Form.Group controlId="formStreet" className={style.row}>
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              {erros.street && <span>{erros.street}</span>}
            </Form.Group>
            <Form.Group controlId="formNumber" className={style.row}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              {erros.number && <span>{erros.number}</span>}
            </Form.Group>
            <Form.Group controlId="formComplement" className={style.row}>
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
              {erros.number && <span>{erros.number}</span>}
            </Form.Group>
            <Form.Group controlId="formDistrict" className={style.row}>
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              {erros.district && <span>{erros.district}</span>}
            </Form.Group>
            <Form.Group controlId="formCity" className={style.row}>
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {erros.city && <span>{erros.city}</span>}
            </Form.Group>
            <Form.Group controlId="formState" className={style.row}>
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              {erros.state && <span>{erros.state}</span>}
            </Form.Group>
            <Form.Group controlId="formCountry" className={style.row}>
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {erros.country && <span>{erros.country}</span>}
            </Form.Group>
            <Form.Group controlId="formReference" className={style.row}>
              <Form.Label>Referência</Form.Label>
              <Form.Control
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
              {erros.reference && <span>{erros.reference}</span>}
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

export default FormModalAddress;
