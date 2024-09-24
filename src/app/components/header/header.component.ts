import { CommonModule } from '@angular/common';
import { Component, input, signal, type OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hideSidebar = input.required<boolean>();
  ngOnInit(): void {}

  menuIsOpen = signal(false);

  // Method to open the menu
  openMenu(): void {
    this.menuIsOpen.set(true);
  }

  // Method to close the menu
  closeMenu(): void {
    this.menuIsOpen.set(false);
  }
}
