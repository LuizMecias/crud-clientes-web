import { Client } from './Client';

export interface ModalPropsClient {
  show: boolean;
  client?: Client | null;
  isEditing: boolean;
  loadClients: () => void;
  onClose: () => void;
}
