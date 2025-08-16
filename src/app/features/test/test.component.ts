import { Component, viewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { DialogApiService } from "../../services/dialog-api.service";
import { discardPeriodicTasks } from "@angular/core/testing";
import { Renderer2 } from "@angular/core";
import { UserButtonComponent } from "../../components/user-button/user-button.component";

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
    UserButtonComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  tunnel = viewChild<ElementRef<HTMLDivElement>>("tunnel");

  constructor(
    private store: Store,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.tunnel()?.nativeElement.addEventListener("click", () => {
      this.onCreate();
    })
  }

  onEdit() {
  }

  onCreate() {
    const disc = this.renderer.createElement("div");
    this.renderer.addClass(disc, "disc");
    this.renderer.appendChild(this.tunnel()?.nativeElement, disc);
    this.renderer.addClass(disc, "falling-disc")
  }

}