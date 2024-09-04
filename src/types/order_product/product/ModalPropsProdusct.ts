import { Product } from './Product';

export interface ModalPropsProduct {
  show: boolean;
  product?: Product | null;
  isEditing: boolean;
  loadProducts: () => void;
  onClose: () => void;
}
