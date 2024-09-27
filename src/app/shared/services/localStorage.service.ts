import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Метод для сохранения данных в localStorage
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage', error);
    }
  }

  // Метод для получения данных из localStorage
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Ошибка при получении данных из localStorage', error);
      return null;
    }
  }

  // Метод для удаления данных из localStorage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Ошибка при удалении данных из localStorage', error);
    }
  }

  // Метод для очистки всех данных из localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Ошибка при очистке localStorage', error);
    }
  }

  // Проверка наличия ключа в localStorage
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
