import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildTwoApiService {

  constructor() { }

  addChildTwo(formData: any) {
    return of(formData)
  }
}
