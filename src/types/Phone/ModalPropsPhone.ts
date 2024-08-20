import { Phone } from './Phone';

export interface ModalPropsPhone {
  show: boolean;
  phone?: Phone | null;
  isEditing: boolean;
  loadPhones: () => void;
  onClose: () => void;
}
