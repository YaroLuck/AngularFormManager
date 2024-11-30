import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ChildThreeComponent} from '../child-three/child-three.component';
import {ChildOneApiService} from '../child-one-api.service';
import {FormManagerService} from '../../projects/ngx-form-manager/src/lib/ngx-form-manager.service';

@Component({
  selector: 'app-child-one',
  imports: [
    ReactiveFormsModule,
    NgIf,
    ChildThreeComponent
  ],
  templateUrl: './child-one.component.html',
  standalone: true,
  styleUrl: './child-one.component.css'
})
export class ChildOneComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formManagerService: FormManagerService,
    private childOneApiService: ChildOneApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
    });

    // Регистрируем форму с её обработчиком
    this.formManagerService.registerForm(this.form, (formData) => {
      this.childOneApiService.addChildOne(formData).subscribe((response: any) => {
        console.log('ChildOne added:', response);
      });
    });
  }

  ngOnDestroy(): void {
    // Убираем форму из регистраций
    this.formManagerService.unregisterForm(this.form);
  }
}
