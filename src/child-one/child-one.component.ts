import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../form.service';
import {NgIf} from '@angular/common';
import {ChildThreeComponent} from '../child-three/child-three.component';

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
  form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formService.registerForm(this.form);
  }

  ngOnDestroy() {
    this.formService.unregisterForm(this.form);
  }
}
