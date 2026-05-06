import { Component } from '@angular/core';
import { LayoutComponent } from "./components/layout/layout.component";

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Click2BookFrontend';
}
