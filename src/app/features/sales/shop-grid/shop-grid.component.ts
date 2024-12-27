import { ApiClient  } from './../../../api-client';
import { Component,OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CategoriaFiltrado } from './../../../api-client';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Categoria } from './../../../api-client';
import { Subcategoria } from './../../../api-client';
@Component({
  selector: 'app-shop-grid',
  standalone: true,
  imports: [SharedModule],
  providers: [ApiClient],

  templateUrl: './shop-grid.component.html',
  styleUrl: './shop-grid.component.css'
})
export class ShopGridComponent implements OnInit{

  productos: CategoriaFiltrado[] = [];
  loading: boolean = false;
  error: string | null = null;
  categoriaId: number | null = null; // Almacena el `categoriaId`

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  subcategoriasPorCategoria: { [key: number]: Subcategoria[] } = {}; // Mapea categorías a subcategorías

  categoriaSeleccionada: number | undefined = undefined;
  subcategoriaSeleccionada: number | undefined = undefined;
  precioMin: number | undefined = undefined;
  precioMax: number | undefined = undefined;
  minCalificacion: number | undefined = undefined; // Rating mínimo


  constructor(private apiClient: ApiClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarCategoriasYSubcategorias();
    this.route.paramMap.subscribe(params => {
      const id = params.get('categoriaId');
      this.categoriaId = id ? +id : null;
      console.log('Parametro categoriaId:', this.categoriaId); // Verificar si se obtiene el parámetro
      this.categoriafiltrado();
    });
  }

  categoriafiltrado(): void {
    const categoriaId = this.categoriaSeleccionada ?? undefined;
    const subcategoriaId = this.subcategoriaSeleccionada ?? undefined;

    console.log('Filtrando con:', {
      categoriaId,
      subcategoriaId,
      precioMin: this.precioMin,
      precioMax: this.precioMax,
      minCalificacion: this.minCalificacion,
    });

    this.apiClient
      .filtrar(undefined, this.precioMin, this.precioMax, categoriaId, subcategoriaId, this.minCalificacion)
      .subscribe({
        next: (productos) => {
          console.log('Productos obtenidos:', productos);
          this.productos = productos;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
          this.error = 'Ocurrió un error al cargar los productos';
          this.loading = false;
        },
      });
  }

  onCategoriaChange(): void {
    this.subcategoriaSeleccionada = undefined;
    console.log('Categoría seleccionada:', this.categoriaSeleccionada);
    this.categoriafiltrado();
  }

  onPrecioChange(min: number, max: number): void {
    this.precioMin = min;
    this.precioMax = max;
    console.log('Rango de precio seleccionado:', { min, max });
    this.categoriafiltrado();
  }

  onRatingChange(rating: number): void {
    this.minCalificacion = rating;
    console.log('Rating mínimo seleccionado:', rating);
    this.categoriafiltrado();
  }


  cargarCategoriasYSubcategorias(): void {
    // Cargar categorías
    this.apiClient.categoriaAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        console.log("categorias",this.categorias)
        // Una vez que las categorías se cargan, carga todas las subcategorías
        this.apiClient.subcategoriaAll().subscribe({
          next: (subcategorias) => {
            this.subcategorias = subcategorias;
            console.log("subcategorias",this.subcategorias)
            // Mapea las subcategorías a sus categorías
            this.subcategoriasPorCategoria = this.subcategorias.reduce<{ [key: number]: Subcategoria[] }>((map, subcategoria) => {
              const categoriaId = subcategoria.idCategoria; // Usa la propiedad correcta

              if (categoriaId !== undefined) { // Asegúrate de que no sea undefined
                if (!map[categoriaId]) {
                  map[categoriaId] = [];
                }
                map[categoriaId].push(subcategoria);
              } else {
                console.warn('Subcategoría sin categoría asociada:', subcategoria);
              }

              return map;
            }, {});
          },
          error: (err) => {
            this.error = 'Error al cargar las subcategorías';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.error = 'Error al cargar las categorías';
        console.error(err);
      }
    });
  }


}
