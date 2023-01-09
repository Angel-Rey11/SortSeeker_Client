import { SortAlgorithm } from "./SortAlgorithm"

export interface RequestData {
    minElements:number,
    maxElements:number,
    step:number,
    multiThreaded:boolean
    algorithm:SortAlgorithm
}