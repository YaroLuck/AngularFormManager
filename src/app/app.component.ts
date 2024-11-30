import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {TabsComponent} from '../tabs/tabs.component';
import {FormManagerService} from '../../projects/ngx-form-manager/src/lib/ngx-form-manager.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, TabsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularFormManager';

  constructor(public formManagerService: FormManagerService) {}

  onSave(): void {
    // Отправляем данные всех форм
    this.formManagerService.submitForms();
  }
}
