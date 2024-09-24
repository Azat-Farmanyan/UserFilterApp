import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  emailValidator,
  loginValidator,
  phoneValidator,
} from '../../shared/validators/filter-form-validators';
import { PhoneMaskDirective } from '../../shared/directives/phone-mask.directive';
import { FilterFormService } from '../../shared/services/FilterForm.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonComponent,
    ReactiveFormsModule,
    PhoneMaskDirective,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  statusDropdownOpen = false;
  roleDropdownOpen = false;

  filterFormService = inject(FilterFormService);

  ngOnInit(): void {
    this.filterForm = this.filterFormService.createFilterForm();
  }

  toggleDropdownForStatus() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
  }

  toggleDropdownForRole() {
    this.roleDropdownOpen = !this.roleDropdownOpen;
  }

  setStatus(status: string) {
    this.filterForm.controls['status'].setValue(status);
    this.statusDropdownOpen = false;
  }

  setRole(role: string): void {
    this.filterForm.get('role')?.setValue(role);
    this.roleDropdownOpen = false;
  }

  hasError(controlName: string): boolean {
    return this.filterFormService.hasError(this.filterForm, controlName);
  }

  isNotEmpty(controlName: string): boolean {
    return this.filterFormService.isNotEmpty(this.filterForm, controlName);
  }

  onSubmit() {
    if (this.filterForm.valid) {
      console.log('Форма отправлена', this.filterForm.value);
    }
  }

  resetForm() {
    this.filterFormService.resetForm(this.filterForm);
  }

  onCancel() {
    this.closeDropdowns();
    this.resetForm();
    console.log('Форма отменена');
  }

  onReset() {
    this.closeDropdowns();
    this.resetForm();

    console.log('Форма сброшена');
  }

  closeDropdowns() {
    this.statusDropdownOpen = false;
    this.roleDropdownOpen = false;
  }
}
