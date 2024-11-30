import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormManagerService {
  private registeredForms: Set<FormGroup> = new Set();
  private changedForms: Set<FormGroup> = new Set();

  private _isValid$ = new BehaviorSubject<boolean>(false);
  public isValid$: Observable<boolean> = this._isValid$.asObservable();

  registerForm(form: FormGroup, p0: (formData: any) => void): void {
    this.registeredForms.add(form);
    form.valueChanges.subscribe(() => {
      this.changedForms.add(form);
      this.updateValidity();
    });
    this.updateValidity();
  }

  unregisterForm(form: FormGroup): void {
    this.registeredForms.delete(form);
    this.changedForms.delete(form);
    this.updateValidity();
  }

  submitForms(): void {
    this.changedForms.forEach((form) => {
      if (form.valid) {
        console.log('Submitting form data:', form.value);
        // Тут должен быть вызов API или другая логика отправки данных формы
        this.changedForms.delete(form); // Очистка после успешной отправки
      }
    });
    this.updateValidity();
  }

  private updateValidity(): void {
    const allValid = Array.from(this.registeredForms).every((form) => form.valid);
    this._isValid$.next(allValid);
  }
}
