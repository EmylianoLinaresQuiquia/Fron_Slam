import { ApiService } from './../../../core/services/api.service';

import { SubcategoriaService } from './../services/subcategoria.service';
import { Component ,AfterViewInit,OnInit  } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators ,FormsModule } from '@angular/forms';
import { Productolist,Producto } from '../interfaces/producto.model';
import { ProductoService } from '../services/producto.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import * as XLSX from 'xlsx';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import Dropzone from 'dropzone';
import Quill from 'quill';
import { catchError, tap } from 'rxjs/operators';
import { CategoriaService } from '../services/categoria.service';
import { Observable, combineLatest } from 'rxjs';
import { data } from 'jquery';
import { ApiClient } from '../../../api-client';
import { throwError } from 'rxjs';
import { ProductoActualizar } from '../interfaces/producto.model';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule,FormsModule],
  providers:[ApiClient],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productoForm!: FormGroup;
  categorias$!: Observable<any[]>;
  subcategorias$!: Observable<any[]>;
  marcas: any[] = [];
  imagenes: NzUploadFile[] = [];
  listproducts: any[] = [];

  productoSeleccionado: any | null = null;
  isLoading = false; // Indicador para estados de carga

  filterNombre: string = '';
  filterCategoria: string = '';
  filterActivo: boolean | null = null;



  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private ApiClient : ApiClient
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.ListProduct();
  }


// Inicializa el formulario reactivo
private initForm(): void {
  this.productoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    categoria_id: [null, Validators.required],
    subcategoria_id: [null],
    marca: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    cantidad_disponible: [0, [Validators.required, Validators.min(0)]],
    unidad_medida: ['', Validators.required],
    imagen_url: [null], // Solo para agregar producto o mantener imagen existente
    activo: [true],
  });
}

// Carga datos iniciales para los selectores (categorías, subcategorías, marcas)
private loadData(): void {
  this.categorias$ = this.categoriaService.obtenerCategorias();
  this.subcategorias$ = this.subcategoriaService.obtenerSubcategorias();
  this.marcas = [
    { id: 1, nombre: 'Marca 1' },
    { id: 2, nombre: 'Marca 2' },
    { id: 3, nombre: 'Marca 3' },
    { id: 4, nombre: 'Marca 4' },
    { id: 5, nombre: 'Marca 5' },
  ];
}

// Manejo del evento de cambio de archivos
onFileChange(event: any): void {
  this.imagenes = event.fileList.map((file: any) => ({
    uid: file.uid || `${Date.now()}`,
    name: file.name,
    status: file.status || 'done',
    url: file.url || '',
    originFileObj: file.originFileObj || file,
  }));
}

// Método para guardar un producto
guardarProducto(): void {
  console.log('Iniciando el proceso para guardar el producto.');

  if (this.productoForm.invalid) {
    console.error('Formulario inválido:', {
      errores: this.productoForm.errors,
      valores: this.productoForm.value
    });
    alert('Por favor completa todos los campos requeridos.');
    return;
  }

  const formValue = this.productoForm.value;

  // Verificar si hay una imagen seleccionada
  let imagenUrl: any = null;
  if (this.imagenes.length > 0 && this.imagenes[0].originFileObj) {
    const file = this.imagenes[0].originFileObj;
    imagenUrl = { data: file, fileName: file.name };
  }

  // Llamar a productoPOST con parámetros individuales
  this.isLoading = true;
  this.ApiClient.productoPOST(
    0,  // id_producto puede ser 0 para una creación nueva
    formValue.nombre,
    formValue.descripcion,
    formValue.categoria_id,
    formValue.subcategoria_id,
    formValue.marca,
    formValue.precio,
    formValue.cantidad_disponible,
    formValue.unidad_medida,
    imagenUrl,  // Pasar la imagen si está disponible
    new Date(),  // fecha_agregado
    formValue.activo
  )
  .pipe(
    tap(() => {
      alert('Producto creado con éxito.');
      this.productoForm.reset({ activo: true });
      this.imagenes = [];
      this.productoSeleccionado = null;
      this.ListProduct();
    }),
    catchError((err) => {
      console.error('Error al guardar producto:', err);
      alert('Hubo un error al guardar el producto. Revisa los datos e intenta nuevamente.');
      return throwError(err);
    })
  )
  .subscribe({
    next: () => console.log('Proceso de guardado completado con éxito.'),
    error: (error) => console.error('Error en el flujo del observable:', error),
    complete: () => {
      this.isLoading = false;
      console.log('Proceso de guardado finalizado.');
    }
  });
}

editarProducto(): void {
  if (!this.productoSeleccionado) {
    alert('No hay ningún producto seleccionado para editar.');
    return;
  }

  if (this.productoForm.invalid) {
    console.error('Formulario inválido:', this.productoForm.errors, this.productoForm.value);
    alert('Por favor completa todos los campos requeridos.');
    return;
  }

  const formValue = this.productoForm.value;

  // Preparar el archivo de imagen si existe
  let imagenArchivo: File | undefined = undefined;
  if (this.imagenes.length > 0 && this.imagenes[0].originFileObj) {
    imagenArchivo = this.imagenes[0].originFileObj;
  }

  // Crear el objeto ProductoActualizar
  const productoActualizar: ProductoActualizar = {
    id_producto: this.productoSeleccionado.id_producto,
    nombre: formValue.nombre,
    descripcion: formValue.descripcion,
    categoria_id: formValue.categoria_id,
    subcategoria_id: formValue.subcategoria_id || null,
    marca: formValue.marca,
    precio: formValue.precio,
    cantidad_disponible: formValue.cantidad_disponible,
    unidad_medida: formValue.unidad_medida,
    activo: formValue.activo,
    imagen_archivo: imagenArchivo,
    imagen_url: imagenArchivo ? undefined : this.productoSeleccionado.imagen_url, // URL existente si no se selecciona una nueva imagen
  };

  this.isLoading = true;

  // Llamar al servicio con el objeto ProductoActualizar
  this.productoService.editarProducto(productoActualizar)
    .pipe(
      tap(() => {
        alert('Producto actualizado con éxito');
        this.productoForm.reset({ activo: true }); // Reseteo del formulario tras editar
        this.imagenes = []; // Limpieza de imágenes
        this.productoSeleccionado = null; // Limpieza del producto seleccionado
        this.ListProduct(); // Recarga lista de productos
      }),
      catchError((err) => {
        console.error('Error al editar producto:', err);
        alert('Hubo un error al editar el producto. Revisa los datos e intenta nuevamente.');
        return throwError(err);
      })
    )
    .subscribe({
      complete: () => (this.isLoading = false),
    });
}




// Método para cargar un producto existente en el formulario
cargarProductoEnFormulario(productId: number): void {
  this.ApiClient.productoGET(productId)
    .pipe(
      tap((producto) => {
        this.productoSeleccionado = producto;
        this.productoForm.patchValue(producto); // Carga los datos al formulario
      }),
      catchError((err) => {
        console.error('Error al cargar producto', err);
        alert('No se pudo cargar la información del producto.');
        throw err;
      })
    )
    .subscribe();
}


  public  resetForm(): void {
    this.productoForm.reset({ activo: true });
    this.imagenes = [];
    this.productoSeleccionado = null;
  }

  filteredProducts: any[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  ListProduct(): void {
    this.isLoading = true;
    this.productoService.obtenerProductos().pipe(
      tap((data: any[]) => {
        console.log('Datos recibidos:', data);
        this.listproducts = data;
        this.filteredProducts = data; // Inicializa productos filtrados
      }),
      catchError((err) => {
        console.error('Error al cargar productos', err);
        alert('Hubo un error al cargar la lista de productos.');
        throw err;
      })
    ).subscribe({
      complete: () => (this.isLoading = false),
    });
  }

  applyFilters(): void {
    if (!this.listproducts || this.listproducts.length === 0) {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.listproducts.filter(product => {
      const matchesSearch = this.searchQuery
        ? product.producto_nombre?.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      const matchesStatus = this.selectedStatus
        ? (this.selectedStatus === 'Active' && product.activo) ||
          (this.selectedStatus === 'Inactive' && !product.activo) ||
          (this.selectedStatus === 'Draft' && product.draft)
        : true;

      return matchesSearch && matchesStatus;
    });

    console.log('Filtros aplicados:', this.filteredProducts);
  }


  eliminarProducto(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }
    this.isLoading = true;
    this.ApiClient.productoDELETE(id).pipe(
      tap(() => {
        this.listproducts = this.listproducts.filter(product => product.id_producto !== id);
        alert('Producto eliminado con éxito');
      }),
      catchError((err) => {
        console.error('Error al eliminar producto', err);
        alert('No se pudo eliminar el producto.');
        throw err;
      })
    ).subscribe({
      complete: () => (this.isLoading = false),
    });
  }

}
