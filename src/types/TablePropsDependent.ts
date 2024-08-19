import { Dependent } from './Dependent';

export interface TablePropsDependent {
  dependents: Dependent[];
  loadDependents: () => void;
}
