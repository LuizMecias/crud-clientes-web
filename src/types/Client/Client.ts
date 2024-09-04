export interface Client {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phones?: [];
  addresses?: [];
  dependents?: [];
  orders?: [];
}
