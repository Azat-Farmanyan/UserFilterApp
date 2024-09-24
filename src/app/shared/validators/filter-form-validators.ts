import { AbstractControl, ValidatorFn } from '@angular/forms';

export function loginValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    // Не показывать ошибку, если поле пустое
    if (!value) {
      return null;
    }

    // Проверка на допустимые символы (буквы и цифры)
    const valid = /^[a-zA-Z0-9]+$/.test(value);

    return valid ? null : { invalidChars: true };
  };
}

export function phoneValidator(
  minLength: number = 11,
  maxLength: number = 11
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    // Не показывать ошибку, если поле пустое
    if (!value) {
      return null;
    }

    // Удаляем все нецифровые символы
    const cleanedValue = value.replace(/\D/g, ''); // Удаляем все символы, кроме цифр

    // Проверяем длину номера
    const validLength =
      cleanedValue.length >= minLength && cleanedValue.length <= maxLength;

    // Вернуть ошибку, если длина неверна
    return validLength ? null : { invalidPhone: true };
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    // Не показывать ошибку, если поле пустое
    if (!value) {
      return null;
    }

    // Регулярное выражение для проверки валидного email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Проверка соответствия email паттерну
    const valid = emailPattern.test(value);

    // Вернуть ошибку, если email неверный
    return valid ? null : { invalidEmail: true };
  };
}
