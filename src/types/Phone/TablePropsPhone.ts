import { Phone } from './Phone';

export interface TablePropsPhone {
  phones: Phone[];
  loadPhones: () => void;
}
