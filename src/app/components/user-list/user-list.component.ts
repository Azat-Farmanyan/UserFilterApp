import { CommonModule } from '@angular/common';
import { Component, inject, input, type OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { FilterFormService } from '../../shared/services/FilterForm.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];

  userService = inject(UserService);
  filterFormService = inject(FilterFormService);

  ngOnInit(): void {
    this.loadUsers();

    // this.userService.getUsers().subscribe((data) => {
    //   this.users = data;
    //   console.log(this.users);

    //   this.filterFormService.getFilterValues().subscribe((res) => {
    //     this.applyFilter();
    //   });
    // });
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Изначально все пользователи отображаются

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
}
