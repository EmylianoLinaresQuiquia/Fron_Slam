import { Component,ElementRef, ViewChild } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../admin/services/shared.service';
import { ProductoService } from '../../admin/services/producto.service';
import { CarritoService } from '../../../shared/services/carrito.service';
declare var $: any;
@Component({
  selector: 'app-shop-single',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop-single.component.html',
  styleUrl: './shop-single.component.css'
})
export class ShopSingleComponent {
  producto: any = null;
  currentUrl: string = '';

  @ViewChild('slider', { static: false }) slider!: ElementRef;
  productos: any[] = [];
  productoSeleccionado: any;

  constructor(
    private location: Location,
    private productService: ProductoService,
    private sharedService: SharedService,
    private router: Router,private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    // Recupera los detalles del producto desde la cookie
    /*const productoJson = this.cookieService.get('productoSeleccionado');
    if (productoJson) {
      this.producto = JSON.parse(productoJson);
      console.log('Producto recuperado:', this.producto);
    } else {
      console.warn('No se encontró información del producto.');
    }*/

    // Cargar productos desde el servicio
    this.productService.obtenerProductos().subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
      this.initSlider(); // Inicializa el slider después de cargar los productos
    });
  }



  ngAfterViewInit(): void {
    // No inicializamos sliders aquí para evitar redundancia
    console.log('ngAfterViewInit ejecutado');
  }

  initSlider(): void {
    // Espera un breve momento para garantizar que el DOM esté renderizado
    setTimeout(() => {
      if (this.slider?.nativeElement) {
        // Verifica si Slick ya está inicializado
        if ($(this.slider.nativeElement).hasClass('slick-initialized')) {
          $(this.slider.nativeElement).slick('unslick'); // Destruye la instancia previa
        }

        // Inicializa el slider principal
        $(this.slider.nativeElement).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000,
          prevArrow: '<button type="button" class="slick-prev">❮</button>',
          nextArrow: '<button type="button" class="slick-next">❯</button>'
        });

        // Inicializa un segundo slider si es necesario
        $('.slider-8-columns').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 2000,
          prevArrow: $('#slider-8-columns-arrows .prev'),
          nextArrow: $('#slider-8-columns-arrows .next')
        });

         // Inicializa un tercer slider si es necesario

         $('.product-slider').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          dots: true,
          autoplay: false,
          prevArrow: '<button type="button" class="slick-prev">❮</button>',
          nextArrow: '<button type="button" class="slick-next">❯</button>'
        });


      }
    }, 100);
  }

  mostrarDetallesProducto(id_producto: number): void {
    // Llama al servicio para obtener los detalles del producto
    this.productService.buscarProductoPorId(id_producto).subscribe({
      next: (producto) => {
        this.productoSeleccionado = producto; // Guarda el producto seleccionado
        // Guarda el producto en una cookie
        //this.cookieService.set('productoSeleccionado', JSON.stringify(producto), { path: '/' });

        // Redirige al componente ShopSingleComponent
        this.router.navigate(['/ventas/shop-single']);
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.productoSeleccionado = null;
      }
    });
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.carritoService.agregarProducto(this.producto);
      alert('Producto agregado al carrito.');
    } else {
      alert('No se pudo agregar el producto al carrito.');
    }
  }
}
