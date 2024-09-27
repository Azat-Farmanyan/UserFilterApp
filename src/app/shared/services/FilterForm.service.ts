import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  loginValidator,
  phoneValidator,
  emailValidator,
} from '../validators/filter-form-validators';
import { User, UserStatus } from '../models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterFormService {
  private filterFormSubject = new Subject<User>();
  userEmptyData: User = {
    login: '',
    phone: '',
    creationDate: '',
    status: 'Не выбран',
    email: '',
    role: 'Не выбран',
    changeDate: '',
  };

  // Создание формы
  createFilterForm(): FormGroup {
    return new FormGroup({
      login: new FormControl('', loginValidator()),
      phone: new FormControl('', phoneValidator()),
      creationDate: new FormControl(''),
      status: new FormControl<UserStatus>('Не выбран'),
      email: new FormControl('', emailValidator()),
      role: new FormControl('Не выбран'),
      changeDate: new FormControl(''),
    });
  }

  // Обновление формы
  updateForm(newForm: User): void {
    this.filterFormSubject.next(newForm);
  }

  // Получение текущих значений формы
  getFilterValues(): Observable<User> {
    return this.filterFormSubject;
  }

  // Сброс формы
  resetForm(form: FormGroup) {
    form.reset(this.userEmptyData);
  }

  // Отмена формы
  cancelForm(form: FormGroup) {
    form.reset(this.userEmptyData);
    this.updateForm(this.userEmptyData);
  }

  // Проверка на наличие ошибок
  hasError(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }

  // Проверка, что поле не пустое
  isNotEmpty(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control?.value;
  }
}
