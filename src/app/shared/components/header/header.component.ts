import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSideNavEvent: EventEmitter<any> = new EventEmitter();

  opened = true;

  constructor() {}

  toggleSideNav() {
    this.opened = !this.opened;
    this.toggleSideNavEvent.emit();
  }
}
