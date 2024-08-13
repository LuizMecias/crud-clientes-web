import { Adress } from './Adress';

export interface ModalPropsAdress {
  show: boolean;
  adress?: Adress | null;
  isEditing: boolean;
  loadAdresses: () => void;
  onClose: () => void;
}
