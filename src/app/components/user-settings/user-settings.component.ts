import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, FilterComponent],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  ngOnInit(): void {}
}
