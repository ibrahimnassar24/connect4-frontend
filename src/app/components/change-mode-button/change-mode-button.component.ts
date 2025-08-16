import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { changeMode } from '../../state/status/status.actions';
import { selectMode } from "../../state/status/status.selectors";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-mode-button',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './change-mode-button.component.html',
  styleUrl: './change-mode-button.component.scss'
})
export class ChangeModeButtonComponent {
  darkMode: Observable<boolean>;

  constructor(
    private store: Store
  ) {
    this.darkMode = this.store.select(selectMode);
  }

  onToggleMode() {
    this.store.dispatch(changeMode());
    document.querySelector("html")?.classList.toggle("dark-mode");
  }
}