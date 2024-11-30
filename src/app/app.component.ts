import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormService} from '../form.service';
import {AsyncPipe} from '@angular/common';
import {TabsComponent} from '../tabs/tabs.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, TabsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularFormManager';

  constructor(public formService: FormService) {}

  saveAll() {
    this.formService.saveAll();
  }
}
