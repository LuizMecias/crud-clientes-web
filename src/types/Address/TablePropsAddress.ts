import { Address } from './Address';

export interface TablePropsAddress {
  addresses: Address[];
  loadAddresses: () => void;
}
