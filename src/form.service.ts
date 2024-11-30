import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private forms: Set<FormGroup> = new Set();
  isValid$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  registerForm(form: FormGroup) {
    this.forms.add(form);
    this.updateValidity();
    form.statusChanges.subscribe(() => this.updateValidity());
  }

  unregisterForm(form: FormGroup) {
    this.forms.delete(form);
    this.updateValidity();
  }

  private updateValidity() {
    const isValid = Array.from(this.forms).every(form => form.valid);
    this.isValid$.next(isValid);
  }

  saveAll() {
    this.forms.forEach(form => {
      if (form.valid) {
        this.http.post('/api/save', form.value).subscribe(() => {
          console.log('Form saved:', form.value);
        });
      }
    });
  }
}
