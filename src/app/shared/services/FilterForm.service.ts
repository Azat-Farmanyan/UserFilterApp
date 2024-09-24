import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  loginValidator,
  phoneValidator,
  emailValidator,
} from '../validators/filter-form-validators';

@Injectable({
  providedIn: 'root',
})
export class FilterFormService {
  // Создание формы
  createFilterForm(): FormGroup {
    return new FormGroup({
      login: new FormControl('', loginValidator()),
      phone: new FormControl('', phoneValidator()),
      creationDate: new FormControl(''),
      status: new FormControl('Активен'),
      email: new FormControl('', emailValidator()),
      role: new FormControl('Пользователь'),
      changeDate: new FormControl(''),
    });
  }

  // Сброс формы
  resetForm(form: FormGroup) {
    form.reset({
      login: '',
      phone: '',
      creationDate: '',
      status: 'Активен',
      email: '',
      role: 'Пользователь',
      changeDate: '',
    });
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
