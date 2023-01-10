import {RequestData} from './RequestData';
import {Result} from './Result';

export interface RequestResult{
  requestData: RequestData;
  id?: number;
  results: Result[];
}
