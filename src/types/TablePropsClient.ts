import { Client } from './Client';

export interface TablePropsClient {
  clients: Client[];
  loadClients: () => void;
}
