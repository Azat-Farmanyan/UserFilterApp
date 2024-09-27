import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, type OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { FilterComponent } from '../filter/filter.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonComponent,
    FilterComponent,
    UserListComponent,
  ],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent; // Ссылка на дочерний компонент

  filterBlockIsOpen = false;

  // Метод, вызываемый при разблокировке пользователей
  unlockUsers(): void {
    if (this.userListComponent) {
      this.userListComponent.unlockUsers(); // Вызываем метод разблокировки в дочернем компоненте
    }
  }

  // Метод, вызываемый при блокировке пользователей
  blockUsers(): void {
    if (this.userListComponent) {
      this.userListComponent.blockUsers(); // Вызываем метод блокировки в дочернем компоненте
    }
  }

  filterBtnToggle() {
    this.filterBlockIsOpen = !this.filterBlockIsOpen;
  }
}
