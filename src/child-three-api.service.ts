import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildThreeApiService {

  constructor() { }

  addChildThree(formData: any) {
    return of(formData)
  }
}
