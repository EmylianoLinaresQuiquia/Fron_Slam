import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Ng-Zorro y configuración de localización
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, StarOutline, CrownOutline, ShoppingCartOutline } from '@ant-design/icons-angular/icons';

import { environment } from '../environments/environment';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

registerLocaleData(es);

const icons = [UserOutline, LockOutline, StarOutline, CrownOutline, ShoppingCartOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Aquí habilitas `fetch` para HttpClient
    provideAnimations(),
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_ICONS, useValue: icons },
    NzIconModule, // Usa el módulo directamente sin `importProvidersFrom`
    // Configuración de Firebase

  ]
};
