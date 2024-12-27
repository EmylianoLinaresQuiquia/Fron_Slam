import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwaggerUiComponent } from './shared/swagger-ui/swagger-ui.component'; // Import SwaggerUiComponent
import { AlertComponent } from './shared/components/alert/alert.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SwaggerUiComponent,AlertComponent], // Asegúrate de incluirlo aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FrontSlan';
}
