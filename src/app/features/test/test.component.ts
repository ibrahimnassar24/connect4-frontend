import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { DialogApiService } from "../../services/dialog-api.service";

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  constructor(
    private store: Store,
    private dialog: DialogApiService
  ) {
  }

  onEdit() {
  }

  onCreate() {
  }


}