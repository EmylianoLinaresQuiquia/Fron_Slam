import { Component, ElementRef, ViewChild,AfterViewInit  } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ProductoService } from '../../admin/services/producto.service';
import { Productolist,Producto } from '../../admin/interfaces/producto.model';
import { SharedService } from '../../admin/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CarritoService } from '../../../shared/services/carrito.service';
declare var $: any;
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'

})
export class CatalogComponent  {

  @ViewChild('slider', { static: false }) slider!: ElementRef;
  productos: any[] = [];
  productoSeleccionado: any;
  producto: any = null;
  constructor(private productService: ProductoService,
    private sharedService: SharedService,
    private cookieService: CookieService,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
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
        this.cookieService.set('productoSeleccionado', JSON.stringify(producto), { path: '/' });

        // Redirige al componente ShopSingleComponent
        this.router.navigate(['/ventas/shop-single']);
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.productoSeleccionado = null;
      }
    });
  }

  agregarAlCarrito(producto: any): void {
    if (producto) {
      this.carritoService.agregarProducto(producto);
      alert('Producto agregado al carrito.');
    } else {
      alert('No se pudo agregar el producto al carrito.');
    }
  }





  /*productos: Product[] = []; // Arreglo para almacenar los productos
  ofertaDelDia: Product[] = []; // Arreglo para la oferta del día

  // Variables de control de carrusel
  currentIndexOfertaDelDia = 0;
  currentIndexOfertas = 0;
  itemsVisible = 4; // Cantidad de productos visibles en el carrusel de ofertas

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.obtenerProductos(); // Llamar al método al inicializar el componente
  }

  currentIndex: number = 0;
  images: string[] = [
    'https://yamoshi.com.pe/modules/ps_imageslider/images/89cde8529161e866873f45380c477f51cce72f26_bb8%20(1).png',
    'https://yamoshi.com.pe/modules/ps_imageslider/images/a2f93b63476640699cb6f942f4f0aaf02bdc1abc_bb2.png', // Agrega más imágenes aquí
    'https://yamoshi.com.pe/modules/ps_imageslider/images/08d266548e3c9265644a3ffd727c0cf82d293361_bb7.png'
  ];

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  goToSlide(index: number) {
    this.currentIndex = index;
  }

  obtenerProductos(): void {
    this.productService.obtenerProductos().subscribe(
      (data: Product[]) => {
        this.productos = data; // Asignar los productos al arreglo
        // Separar un producto como "Oferta del día"
        if (this.productos.length > 0) {
          this.ofertaDelDia = [this.productos[0]]; // Asignar el primer producto a "Oferta del día"
          this.productos.shift(); // Remover la oferta del día de la lista general
        }
        console.log('productos', this.productos);
        console.log('Oferta del día', this.ofertaDelDia);
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  // Calcula el transform de CSS para el carrusel
  get transformOfertaDelDia() {
    return `translateX(-${this.currentIndexOfertaDelDia * 100}%)`;
  }

  get transformOfertas() {
    return `translateX(-${this.currentIndexOfertas * (100 / this.itemsVisible)}%)`;
  }

  // Funciones para mover el carrusel de "Oferta del día"
  slideOfertaDelDia(direction: number) {
    const totalItems = this.ofertaDelDia.length;
    this.currentIndexOfertaDelDia = (this.currentIndexOfertaDelDia + direction + totalItems) % totalItems;
  }

  // Funciones para mover el carrusel de "Ofertas"
  slideOfertas(direction: number) {
    const totalItems = this.productos.length - this.itemsVisible;
    this.currentIndexOfertas = (this.currentIndexOfertas + direction + totalItems + 1) % (totalItems + 1);
  }*/


}

