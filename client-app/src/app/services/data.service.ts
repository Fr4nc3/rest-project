import { Injectable } from '@angular/core';
import { Search } from '../models/Search';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public search: Search;
  constructor() {}
}



