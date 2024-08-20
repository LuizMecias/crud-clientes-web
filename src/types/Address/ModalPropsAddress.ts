import { Address } from './Address';

export interface ModalPropsAddress {
  show: boolean;
  address?: Address | null;
  isEditing: boolean;
  loadAddresses: () => void;
  onClose: () => void;
}
