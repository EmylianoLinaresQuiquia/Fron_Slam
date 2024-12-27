import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ApiClient } from '../../../api-client';
import { CrearPedidoRequest } from '../../../api-client';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
@Component({
  selector: 'app-shop-checkout',
  standalone: true,
  imports: [SharedModule],
  providers:[ApiClient],
  templateUrl: './shop-checkout.component.html',
  styleUrl: './shop-checkout.component.css'
})
export class ShopCheckoutComponent {

  user: any;
  direccion = {
    calle: '',
    ciudad: '',
    codigoPostal: '',
    pais: ''
  };

  carrito: any[] = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private apiClient: ApiClient,
    private localStorageService: LocalStorageService

  ) {}

  ngOnInit(): void {
    this.cargarDatosCheckout();
    /*const userCookie = this.cookieService.get('user');
    if (userCookie) {
      this.user = JSON.parse(userCookie);
      console.log('Datos del usuario cargados:', this.user);
    } else {
      console.warn('No se encontraron datos de usuario.');
    }*/
  }

  cargarDatosCheckout(): void {
    const checkoutData = this.localStorageService.getItem('checkoutData');
    if (checkoutData) {
      this.carrito = checkoutData.carrito || [];
      this.subtotal = checkoutData.subtotal || 0;
      this.total = checkoutData.total || 0;
    }
  }
  enviarPedido(): void {
    const pedido = {
      id_usuario: this.user.idUsuario ,
      productos: this.carrito.map((item: any) => ({
        id_producto: item.id_producto,
        cantidad: item.cantidad
      })),
      direccionCalle: "Calle Principal 123",
      direccionCiudad: "Ciudad Ejemplo",
      direccionCodigoPostal: "10001",
      direccionPais: "País Ejemplo"
    } as CrearPedidoRequest; // Type Assertion

    this.apiClient.pedidoPOST(pedido).subscribe({
      next: (response) => {
        console.log('Pedido enviado con éxito:', response);
        alert('Pedido enviado con éxito');
      },
      error: (err) => {
        console.error('Error al enviar el pedido:', err);
        alert('Ocurrió un error al enviar el pedido');
      }
    });
  }







}
