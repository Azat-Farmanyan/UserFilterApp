import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Проверка на null
    if (!input || !this.ngControl.control) {
      return;
    }

    // Получаем текущее значение
    let value = input.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

    // Применяем формат
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = '+7 ';
    }
    if (value.length > 1) {
      formattedValue += `(${value.substring(1, 4)}`; // 1-3
    }
    if (value.length > 4) {
      formattedValue += `) ${value.substring(4, 7)}`; // 4-6
    }
    if (value.length > 7) {
      formattedValue += `-${value.substring(7, 9)}`; // 7-8
    }
    if (value.length > 9) {
      formattedValue += `-${value.substring(9, 11)}`; // 9-10
    }

    // Обновляем значение в контроле
    this.ngControl.control.setValue(formattedValue);

    // Устанавливаем курсор в конец поля
    setTimeout(() =>
      input.setSelectionRange(formattedValue.length, formattedValue.length)
    );
  }
}
