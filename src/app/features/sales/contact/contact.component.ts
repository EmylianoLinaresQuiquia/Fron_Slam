import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  onSubmit() {
    const mailto = `mailto:example@correo.com?subject=Consulta de minoristas`;
    window.location.href = mailto;
    alert('Formulario enviado correctamente. ¡Gracias por su consulta!');
  }
}
