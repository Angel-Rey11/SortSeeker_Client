import { SortAlgorithm } from './SortAlgorithm';

export interface Result {
    id?: number;
    nElements: number;
    computedTime: number;
    algorithm: SortAlgorithm;
}
