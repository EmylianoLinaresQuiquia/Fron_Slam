import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwaggerUiComponent } from './shared/swagger-ui/swagger-ui.component'; // Import SwaggerUiComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SwaggerUiComponent], // Asegúrate de incluirlo aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FrontSlan';
}
