import { Adress } from './Adress';

export interface TablePropsAdress {
  adresses: Adress[];
  loadAdresses: () => void;
}
