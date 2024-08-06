import { Client } from './Client';

export interface ModalProps {
  show: boolean;
  client?: Client;
  isEditing: boolean;
  loadClients: () => void;
  onClose: () => void;
}
