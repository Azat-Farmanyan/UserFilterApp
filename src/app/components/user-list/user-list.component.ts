import { CommonModule } from '@angular/common';
import { Component, inject, input, type OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { FilterFormService } from '../../shared/services/FilterForm.service';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { CustomCheckboxComponent } from '../../shared/components/custom-checkbox/custom-checkbox.component';
import { UserListHeaderComponent } from './userListHeader/userListHeader.component';

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
  checkedUserIds: number[] = [];

  selectedRecordsCount = 0;
  recordsPerPage = 20;
  totalRecords = this.filteredUsers.length;
  startRecord = 1;
  endRecord = 20;
  allUsersChecked = false;

  // Обновляем отображаемый диапазон записей при изменении количества записей на странице
  onRecordsPerPageChange(recordsPerPage: number): void {
    this.recordsPerPage = recordsPerPage;
    this.endRecord = this.recordsPerPage;
  }

  userService = inject(UserService);
  filterFormService = inject(FilterFormService);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Изначально все пользователи отображаются
      this.totalRecords = this.filteredUsers.length;

      this.filterFormService.getFilterValues().subscribe((res) => {
        this.applyFilter(res); // Применение фильтра при изменении значений
      });
    });
  }
  private applyFilter(filterValues: User): void {
    console.log(filterValues);

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

  getMaxRecordPerPage() {
    return this.filteredUsers.length;
  }

  onCheckboxChanged(isChecked: boolean, userId?: number): void {
    // Проверяем, снят ли флажок и выбраны ли все пользователи
    if (
      !isChecked &&
      this.checkedUserIds.length === this.filteredUsers.length
    ) {
      // Если флажок снят и все пользователи были выбраны,
      // то устанавливаем флаг allUsersChecked в false
      this.allUsersChecked = false;
    }

    // Проверяем, передан ли userId
    if (userId) {
      // Если флажок установлен и id пользователя не включен в checkedUserIds
      if (isChecked && !this.checkedUserIds.includes(userId)) {
        // Добавляем id пользователя в массив выбранных пользователей
        this.checkedUserIds = [...this.checkedUserIds, userId];
      }
      // Если флажок снят
      else if (!isChecked) {
        // Удаляем id пользователя из массива выбранных пользователей
        this.checkedUserIds = this.checkedUserIds.filter((id) => id !== userId);
      }

      // Проверяем, выбраны ли все пользователи
      if (this.checkedUserIds.length === this.filteredUsers.length) {
        // Если да, устанавливаем флаг allUsersChecked в true
        this.allUsersChecked = true;
      }

      this.selectedRecordsCount = this.checkedUserIds.length;
    }
  }

  checkAllToggle(isChecked: boolean): void {
    // Устанавливаем состояние выбора всех пользователей
    if (isChecked) {
      this.allUsersChecked = true;
      // Получаем массив всех id отфильтрованных пользователей
      this.checkedUserIds = this.filteredUsers
        .map((user) => user.id!)
        .filter(Boolean);
    } else {
      this.allUsersChecked = false;
      // Очищаем массив выбранных id
      this.checkedUserIds = [];
    }

    this.selectedRecordsCount = this.checkedUserIds.length;
  }

  uncheckAll(): void {
    this.checkedUserIds = [];
  }

  isUserChecked(userId: number): boolean {
    return this.checkedUserIds.includes(userId);
  }
}
