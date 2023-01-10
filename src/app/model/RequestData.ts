import { SortAlgorithm } from './SortAlgorithm';

export interface RequestData {
    minElements: number;
    maxElements: number;
    step: number;
    date: Date;
    algorithm: SortAlgorithm;
}
