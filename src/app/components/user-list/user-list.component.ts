import { CommonModule } from '@angular/common';
import { Component, inject, input, output, type OnInit } from '@angular/core';
import { User, UserStatus } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { FilterFormService } from '../../shared/services/FilterForm.service';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { CustomCheckboxComponent } from '../../shared/components/custom-checkbox/custom-checkbox.component';
import { UserListHeaderComponent } from './userListHeader/userListHeader.component';
import { LocalStorageService } from '../../shared/services/localStorage.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomCheckboxComponent,
    UserListHeaderComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  checkedUsersIds: number[] = [];

  // checkedUserIds = output()

  selectedRecordsCount = 0;
  recordsPerPage = 20;
  totalRecords = this.filteredUsers.length;
  startRecord = 1;
  endRecord = 20;
  allUsersChecked = false;

  hasESignatureIconPath = '../../../assets/icons/check-green.svg';
  hasNotESignatureIconPath = '../../../assets/icons/remove-red.svg';

  // Обновляем отображаемый диапазон записей при изменении количества записей на странице
  onRecordsPerPageChange(recordsPerPage: number): void {
    this.recordsPerPage = recordsPerPage;
    this.endRecord = this.recordsPerPage;
  }

  localStorageService = inject(LocalStorageService);
  userService = inject(UserService);
  filterFormService = inject(FilterFormService);

  ngOnInit(): void {
    this.loadUsers();
  }
  // Метод для разблокировки пользователей
  unlockUsers(): void {
    // Проходим по массиву checkedUserIds и обновляем статусы в localStorage
    this.checkedUsersIds.forEach((userId) => {
      this.updateUserStatus(userId, 'Активен'); // Устанавливаем статус 'Активен' в localStorage
      this.updateFilteredUsers(userId, 'Активен'); // Обновляем статус в filteredUsers
    });
  }

  // Метод для блокировки пользователей
  blockUsers(): void {
    // Проходим по массиву checkedUserIds и обновляем статусы в localStorage
    this.checkedUsersIds.forEach((userId) => {
      this.updateUserStatus(userId, 'Заблокирован'); // Устанавливаем статус 'Заблокирован' в localStorage
      this.updateFilteredUsers(userId, 'Заблокирован'); // Обновляем статус в filteredUsers
    });
  }

  // Метод для обновления статуса пользователя в localStorage
  private updateUserStatus(userId: number, status: string): void {
    const users = this.localStorageService.getItem<any[]>('Users') || []; // Получаем список пользователей из localStorage
    const userIndex = users.findIndex((user) => +user.id === +userId); // Находим индекс пользователя

    if (userIndex !== -1) {
      users[userIndex].status = status; // Обновляем статус пользователя
      this.localStorageService.setItem('Users', users); // Сохраняем обновленный список пользователей в localStorage
    }
  }

  // Метод для обновления статуса в массиве filteredUsers
  private updateFilteredUsers(userId: number, status: UserStatus): void {
    const userIndex = this.filteredUsers.findIndex(
      (user) => user.id === userId
    ); // Находим индекс пользователя в filteredUsers

    if (userIndex !== -1) {
      this.filteredUsers[userIndex].status = status; // Обновляем статус в filteredUsers
    }
  }

  private loadUsers(): void {
    this.localStorageService.clear();
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Изначально все пользователи отображаются
      this.totalRecords = this.filteredUsers.length;
      this.saveUsersToLocalStorage();

      this.filterFormService.getFilterValues().subscribe((res) => {
        this.applyFilter(res); // Применение фильтра при изменении значений
      });
    });
  }
  private applyFilter(filterValues: User): void {
    this.filteredUsers = this.users.filter((user) => {
      return (
        (!filterValues.login ||
          user.login.includes(filterValues.login.trim())) &&
        (!filterValues.phone ||
          user.phone.includes(filterValues.phone.trim())) &&
        (!filterValues.creationDate ||
          user.creationDate === filterValues.creationDate) &&
        (!filterValues.status ||
          filterValues.status === 'Не выбран' ||
          user.status === filterValues.status) &&
        (!filterValues.email ||
          user.email.includes(filterValues.email.trim())) &&
        (!filterValues.role ||
          filterValues.role === 'Не выбран' ||
          user.role === filterValues.role) &&
        (!filterValues.changeDate ||
          user.changeDate === filterValues.changeDate)
      );
    });
  }

  // Метод для сохранения User данные в localStorage
  private saveUsersToLocalStorage(): void {
    const usersToSave = this.users.map((user) => ({
      id: user.id,
      status: user.status,
    }));
    this.localStorageService.setItem('Users', usersToSave);
  }

  getMaxRecordPerPage() {
    return this.filteredUsers.length;
  }

  onCheckboxChanged(isChecked: boolean, userId?: number): void {
    // Проверяем, снят ли флажок и выбраны ли все пользователи
    if (
      !isChecked &&
      this.checkedUsersIds.length === this.filteredUsers.length
    ) {
      // Если флажок снят и все пользователи были выбраны,
      // то устанавливаем флаг allUsersChecked в false
      this.allUsersChecked = false;
    }

    // Проверяем, передан ли userId
    if (userId) {
      // Если флажок установлен и id пользователя не включен в checkedUserIds
      if (isChecked && !this.checkedUsersIds.includes(userId)) {
        // Добавляем id пользователя в массив выбранных пользователей
        this.checkedUsersIds = [...this.checkedUsersIds, userId];
      }
      // Если флажок снят
      else if (!isChecked) {
        // Удаляем id пользователя из массива выбранных пользователей
        this.checkedUsersIds = this.checkedUsersIds.filter(
          (id) => id !== userId
        );
      }

      // Проверяем, выбраны ли все пользователи
      if (this.checkedUsersIds.length === this.filteredUsers.length) {
        // Если да, устанавливаем флаг allUsersChecked в true
        this.allUsersChecked = true;
      }

      this.selectedRecordsCount = this.checkedUsersIds.length;
    }
  }

  checkAllToggle(isChecked: boolean): void {
    // Устанавливаем состояние выбора всех пользователей
    if (isChecked) {
      this.allUsersChecked = true;
      // Получаем массив всех id отфильтрованных пользователей
      this.checkedUsersIds = this.filteredUsers
        .map((user) => user.id!)
        .filter(Boolean);
    } else {
      this.allUsersChecked = false;
      // Очищаем массив выбранных id
      this.checkedUsersIds = [];
    }

    this.selectedRecordsCount = this.checkedUsersIds.length;
  }

  uncheckAll(): void {
    this.checkedUsersIds = [];
  }

  isUserChecked(userId: number): boolean {
    return this.checkedUsersIds.includes(userId);
  }
}
