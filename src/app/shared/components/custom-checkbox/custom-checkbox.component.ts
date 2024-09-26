import { CommonModule } from '@angular/common';
import { Component, input, output, type OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="custom-checkbox">
      <input
        type="checkbox"
        [checked]="isChecked()"
        (change)="onCheckboxChange($event)"
      />
      <span class="checkmark">
        <img [src]="iconPath" alt="Checkmark" />
      </span>
      <ng-content></ng-content>
    </label>
  `,
  styles: [
    `
      .custom-checkbox {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
      }

      .custom-checkbox input[type='checkbox'] {
        display: none;
      }

      .custom-checkbox .checkmark {
        width: 24px;
        height: 24px;
        background-color: var(--color-white);
        border: 2px solid #ccc;
        border-radius: 4px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
      }

      .custom-checkbox .checkmark img {
        display: none;
      }

      .custom-checkbox input[type='checkbox']:checked + .checkmark img {
        display: block;
      }
    `,
  ],
})
export class CustomCheckboxComponent implements OnInit {
  iconPath = '../../../../assets/icons/checkmark.svg';

  checkboxChange = output<boolean>();
  isChecked = input<boolean>(false);

  ngOnInit(): void {}

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checkboxChange.emit(isChecked); // Emit the new state
  }
}
