import { Client } from '../types/Client';

export interface TableProps {
  clients: Client[];
  loadClients: () => void;
}
