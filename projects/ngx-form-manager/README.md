# Документация библиотеки NgxFormManager

Библиотека **NgxFormManager** предоставляет простой и мощный сервис для управления и обработки форм в приложениях Angular. Она позволяет разработчикам динамически регистрировать формы и отправлять их коллективно или по отдельности. Эта библиотека особенно полезна в случаях, когда формы рендерятся динамически в маршрутизируемых компонентах, а кнопка (например, "Сохранить") в родительском компоненте запускает отправку этих форм.

## Установка

Чтобы использовать библиотеку **NgxFormManager**, установите её в ваш проект Angular:

```bash
npm install ngx-form-manager
```

## Обзор API

### FormManagerService
**FormManagerService** является основным компонентом библиотеки. Он управляет регистрацией, удалением и отправкой форм.

#### Публичные методы

##### `registerForm(form: FormGroup): void`
Регистрирует `FormGroup` в сервисе. Этот метод следует вызывать в компоненте, где инициализируется форма.

- **Параметры:**
  - `form: FormGroup` - Форма, которую необходимо зарегистрировать.

##### `unregisterForm(form: FormGroup): void`
Удаляет ранее зарегистрированную форму. Этот метод следует вызывать при уничтожении компонента, содержащего форму.

- **Параметры:**
  - `form: FormGroup` - Форма, которую необходимо удалить.

##### `submitForms(): void`
Отправляет все зарегистрированные формы. Этот метод выполняет валидацию и логику отправки для каждой формы.

##### `isValid$: Observable<boolean>`
Observable, который возвращает булево значение, указывающее, валидны ли все зарегистрированные формы.

#### Пример использования

##### Импорт FormManagerService

```typescript
import { FormManagerService } from 'ngx-form-manager';
```

##### Использование FormManagerService в компоненте

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormManagerService } from 'ngx-form-manager';

@Component({
  selector: 'app-child-one',
  template: `
    <form [formGroup]="form">
      <input formControlName="name" placeholder="Введите имя" />
    </form>
  `,
})
export class ChildOneComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private FormManagerService: FormManagerService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
    });
    this.FormManagerService.registerForm(this.form);
  }

  ngOnDestroy(): void {
    this.FormManagerService.unregisterForm(this.form);
  }
}
```

### Пример централизованной кнопки сохранения

Централизованная кнопка в родительском компоненте может отправлять все зарегистрированные формы:

```typescript
import { Component } from '@angular/core';
import { FormManagerService } from 'ngx-form-manager';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <button [disabled]="!(FormManagerService.isValid$ | async)" (click)="onSave()">
        Сохранить
      </button>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(public FormManagerService: FormManagerService) {}

  onSave(): void {
    this.FormManagerService.submitForms();
  }
}
```

## Интеграция с сервисами

Каждая форма может иметь свою собственную логику для отправки данных на сервер. Пример интеграции библиотеки с API-сервисами:

### ChildOneService

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildOneService {
  constructor(private http: HttpClient) {}

  addChildOne(data: any): Observable<any> {
    return this.http.post('/api/ChildOnes/', data);
  }

  updateChildOne(id: string, data: any): Observable<any> {
    return this.http.patch(`/api/ChildOnes/${id}`, data);
  }
}
```

### Обработка отправки в дочерних компонентах

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormManagerService } from 'ngx-form-manager';
import { ChildOneService } from './ChildOne.service';

@Component({
  selector: 'app-ChildOne',
  template: `
    <form [formGroup]="form">
      <input formControlName="description" placeholder="Введите описание дефекта" />
    </form>
  `,
})
export class ChildOneComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private FormManagerService: FormManagerService,
    private ChildOneService: ChildOneService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [''],
    });
    this.FormManagerService.registerForm(this.form);
  }

  ngOnDestroy(): void {
    this.FormManagerService.unregisterForm(this.form);
  }

  submit(): void {
    if (this.form.valid) {
      this.ChildOneService.addChildOne(this.form.value).subscribe();
    }
  }
}
```

## Лучшие практики

- Всегда удаляйте формы в хуке `ngOnDestroy`, чтобы избежать утечек памяти.
- Используйте `isValid$` для управления состоянием централизованных кнопок отправки.
- Делегируйте логику отправки формы конкретным API-сервисам.
- Убедитесь, что каждая форма имеет уникальные контролы и корректно обрабатывает валидацию.

## Возможные улучшения

- Добавление поддержки динамических сообщений о валидации.
- Предоставление утилит для обработки вложенных форм.
- Введение хуков для действий до и после отправки.
