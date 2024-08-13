import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { ModalPropsAdress } from '../../types/ModalPropsAdress';
import style from '../../style/Modal.module.css';
import { Adress } from '../../types/Adress';
import { addAdress, updateAdress } from '../../services/AdressService';
import { useParams } from 'react-router-dom';

/**
 * FormModalAdress component.
 *
 * @param {ModalPropsAdress} props - The component props.
 * @param {boolean} props.show - Flag indicating if the modal is shown.
 * @param {Adress | undefined} props.adress - The adress object.
 * @param {boolean} props.isEditing - Flag indicating if the adress is being edited.
 * @param {() => Promise<void>} props.loadAdresses - Function to load adresses.
 * @param {() => void} props.onClose - Function to close the modal.
 * @returns {React.ReactElement} The rendered component.
 */
const FormModalAdress: React.FC<ModalPropsAdress> = ({
  show = false,
  adress,
  isEditing,
  loadAdresses,
  onClose,
}): React.ReactElement => {
  const clienteCpf = useParams().cpf || '';
  const id: number = adress?.id || 0;
  const [cep, setCep] = useState<string>(adress?.cep || '');
  const [street, setStreet] = useState<string>(adress?.street || '');
  const [number, setNumber] = useState<string>(adress?.number || '');
  const [complement, setComplement] = useState<string>(
    adress?.complement || ''
  );
  const [district, setDistrict] = useState<string>(adress?.district || '');
  const [city, setCity] = useState<string>(adress?.city || '');
  const [state, setState] = useState<string>(adress?.state || '');
  const [country, setCountry] = useState<string>(adress?.country || '');
  const [reference, setReference] = useState<string>(adress?.reference || '');
  const [erros, setErros] = useState<Partial<Adress>>({});

  /**
   * Handles the form submission.
   *
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      const data: Adress = {
        id,
        clienteCpf,
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
        await updateAdress(id, data);
      } else {
        await addAdress(data);
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
      loadAdresses();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Validates the form fields.
   *
   * @returns {void}
   */
  const validarCampos = (): void => {
    const novosErros: Partial<Adress> = {};

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
            Cadastro de Endereço
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

export default FormModalAdress;
