import { Dependent } from './Dependent';

export interface ModalPropsDependent {
  show: boolean;
  dependent?: Dependent | null;
  isEditing: boolean;
  loadDependents: () => void;
  onClose: () => void;
}
