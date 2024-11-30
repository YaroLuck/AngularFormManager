import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ChildThreeApiService} from '../child-three-api.service';
import {FormManagerService} from '../../projects/ngx-form-manager/src/lib/ngx-form-manager.service';

@Component({
  selector: 'app-child-three',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './child-three.component.html',
  standalone: true,
  styleUrl: './child-three.component.css'
})
export class ChildThreeComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formManagerService: FormManagerService,
    private childThreeApiService: ChildThreeApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
    });

    // Регистрируем форму с её обработчиком
    this.formManagerService.registerForm(this.form, (formData: any) => {
      this.childThreeApiService.addChildThree(formData).subscribe((response: any) => {
        console.log('ChildTree added:', response);
      });
    });
  }

  ngOnDestroy(): void {
    // Убираем форму из регистраций
    this.formManagerService.unregisterForm(this.form);
  }
}
