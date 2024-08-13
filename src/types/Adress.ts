import { Client } from './Client';

export interface Adress {
  id: number;
  clienteCpf: Client['cpf'];
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  reference: string;
}
