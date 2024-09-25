import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { FilterComponent } from '../filter/filter.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserService } from '../../shared/services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
export class UserSettingsComponent implements OnInit {
  // users: any[] = [];

  // userService = inject(UserService);

  ngOnInit(): void {
    // this.userService.getUsers().subscribe((data) => {
    //   this.users = data;
    //   console.log(this.users);
    // });
  }
}
