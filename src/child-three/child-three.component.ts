import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../form.service';
import {NgIf} from '@angular/common';

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
  form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({
      name: ['']
    });
  }

  ngOnInit() {
    this.formService.registerForm(this.form);
  }

  ngOnDestroy() {
    this.formService.unregisterForm(this.form);
  }
}
