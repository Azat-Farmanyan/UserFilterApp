import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  Input,
  OnChanges,
  SimpleChanges,
  type OnInit,
} from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  iconPath = '../../../../assets/icons/';

  @Input() type: 'button' | 'submit' = 'button';

  // Название кнопки
  @Input() label!: string;

  // Название иконки (опционально)
  @Input() icon?: string;

  // Позиция иконки (left или right)
  @Input() iconPosition: 'left' | 'right' = 'left';

  // Размер кнопки (нормальный или большой)
  @Input() size: 'normal' | 'large' = 'normal';

  // Состояние кнопки: открыт или disabled
  @Input() state: 'normal' | 'disabled' = 'normal';

  @Input() bg: 'gray' | 'red' = 'red';

  @Input() opened: boolean = false;
}
