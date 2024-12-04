import { Component ,AfterViewInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';
@Component({
  selector: 'app-swagger-ui',
  standalone:true,
  imports:[],
  templateUrl: './swagger-ui.component.html',
  styleUrl: './swagger-ui.component.css'
})
export class SwaggerUiComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    SwaggerUI({
      dom_id: '#swagger-container', // ID del contenedor donde se renderiza
      url: 'https://localhost:7171/swagger/v1/swagger.json', // URL de tu archivo OpenAPI
      deepLinking: true,
      presets: [SwaggerUI.presets.apis],
      layout: "BaseLayout"
    });
  }
}
