import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CustomCheckboxComponent } from '../../../shared/components/custom-checkbox/custom-checkbox.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-list-header',
  standalone: true,
  imports: [CommonModule, CustomCheckboxComponent, FormsModule],
  templateUrl: './userListHeader.component.html',
  styleUrls: ['./userListHeader.component.scss'],
})
export class UserListHeaderComponent implements OnInit {
  @Input() recordsPerPage!: number; // Количество записей на странице
  @Input() startRecord!: number; // Первая запись
  @Input() endRecord!: number; // Последняя запись
  @Input() totalRecords!: number; // Общее количество записей
  @Input() selectedRecordsCount!: number; // Количество выбранных записей
  @Input() allUsersChecked!: boolean; // Состояние чекбокса "выбрать всех"

  @Output() recordsPerPageChange = new EventEmitter<number>(); // Событие при изменении количества записей

  ngOnInit(): void {}

  onRecordsPerPageChange(): void {
    this.recordsPerPageChange.emit(this.recordsPerPage);
  }
}
