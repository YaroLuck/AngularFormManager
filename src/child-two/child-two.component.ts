import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../form.service';
import {NgIf} from '@angular/common';

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
  form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.formService.registerForm(this.form);
  }

  ngOnDestroy() {
    this.formService.unregisterForm(this.form);
  }
}
