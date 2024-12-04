import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwaggerUiComponent } from './shared/swagger-ui/swagger-ui.component';
import { AppComponent } from './app.component'; // Import standalone AppComponent
import { routes } from './app.routes';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';

// Ng-Zorro and localization configuration
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, StarOutline, CrownOutline, ShoppingCartOutline } from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';




const icons = [UserOutline, LockOutline, StarOutline, CrownOutline, ShoppingCartOutline];
/**
 * Módulo principal de la aplicación.

 */
@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LayoutsModule,
    NzIconModule,
    //AppComponent // Importing standalone AppComponent here


  ],

  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [] // Use standalone AppComponent directly in bootstrap array
})
export class AppModule { }
