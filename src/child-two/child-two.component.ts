import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ChildTwoApiService} from '../child-two-api.service';
import {FormManagerService} from '../../projects/ngx-form-manager/src/lib/ngx-form-manager.service';

@Component({
  selector: 'app-child-two',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './child-two.component.html',
  standalone: true,
  styleUrl: './child-two.component.css'
})
export class ChildTwoComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formManagerService: FormManagerService,
    private childTwoApiService: ChildTwoApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Регистрируем форму с её обработчиком
    this.formManagerService.registerForm(this.form, (formData) => {
      this.childTwoApiService.addChildTwo(formData).subscribe((response: any) => {
        console.log('ChildTwo added:', response);
      });
    });
  }

  ngOnDestroy(): void {
    // Убираем форму из регистраций
    this.formManagerService.unregisterForm(this.form);
  }
}
