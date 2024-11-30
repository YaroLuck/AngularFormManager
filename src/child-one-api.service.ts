import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildOneApiService {

  constructor() { }

  addChildOne(formData: any) {
    return of(formData)
  }
}
