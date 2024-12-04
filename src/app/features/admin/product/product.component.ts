import { SubcategoriaService } from './../services/subcategoria.service';
import { Component ,AfterViewInit,OnInit  } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
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
  filteredProducts: any[] = [];
  productoSeleccionado: any | null = null;
  isLoading = false; // Indicador para estados de carga

  filterNombre: string = '';
  filterCategoria: string = '';
  filterActivo: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.ListProduct();
  }

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

  onFileChange(event: any): void {
    this.imagenes = event.fileList.map((file: any) => ({
      uid: file.uid || `${Date.now()}`,
      name: file.name,
      status: file.status || 'done',
      url: file.url || '',
      originFileObj: file.originFileObj || file,
    }));
  }

  public onSubmit(): void {
    if (this.productoForm.invalid) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const formData = this.buildFormData();
    this.isLoading = true;

    // Usamos un Observable para manejar la creación o edición
    const action$: Observable<any> = this.productoSeleccionado
      ? this.productoService.editarProducto({
          ...formData,
          id_producto: this.productoSeleccionado.id_producto,
        })
      : this.productoService.agregarProducto(formData);

    action$
      .pipe(
        tap(() => {
          alert(this.productoSeleccionado ? 'Producto actualizado con éxito' : 'Producto creado con éxito');
          this.resetForm();
          this.ListProduct();
        }),
        catchError((err) => {
          console.error('Error al procesar la solicitud', err);
          alert('Hubo un error al procesar la solicitud.');
          throw err;
        })
      )
      .subscribe({
        complete: () => (this.isLoading = false),
      });
  }

  private buildFormData(): any {
    const formValue = this.productoForm.value;
    const formData: any = {
      ...formValue,
      imagen_archivo: null, // Inicialmente no hay imagen nueva
    };

    if (this.imagenes.length > 0) {
      const nuevaImagen = this.imagenes[0].originFileObj;
      formData.imagen_archivo = nuevaImagen; // Se asigna la nueva imagen al editar
    }

    // Si estamos editando y no se subió una nueva imagen, usamos la URL existente
    if (this.productoSeleccionado && !formData.imagen_archivo) {
      formData.imagen_url = this.productoSeleccionado.imagen_url;
    }

    return formData;
  }

  ListProduct(): void {
    this.isLoading = true;
    this.productoService.obtenerProductos().pipe(
      tap((data: any[]) => {
        this.listproducts = data;
        console.log("list product",this.listproducts)
        this.filteredProducts = data;
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

  eliminarProducto(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }
    this.isLoading = true;
    this.productoService.eliminarProducto(id).pipe(
      tap(() => {
        this.listproducts = this.listproducts.filter(product => product.id_producto !== id);
        this.applyFilters();
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

  aplicarFiltro(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    const nombreFilter = this.filterNombre.toLowerCase();
    const categoriaFilter = this.filterCategoria.toLowerCase();
    this.filteredProducts = this.listproducts.filter(producto => {
      const nombreMatch = producto.producto_nombre.toLowerCase().includes(nombreFilter);
      const categoriaMatch = producto.categoria_nombre.toLowerCase().includes(categoriaFilter);
      const activoMatch = this.filterActivo === null || producto.activo === this.filterActivo;
      return nombreMatch && categoriaMatch && activoMatch;
    });
  }

  cargarProductoEnFormulario(productId: number): void {
    this.productoService.buscarProductoPorId(productId).pipe(
      tap((producto) => {
        this.productoSeleccionado = producto;
        this.productoForm.patchValue(producto);
      }),
      catchError((err) => {
        console.error('Error al cargar producto', err);
        alert('No se pudo cargar la información del producto.');
        throw err;
      })
    ).subscribe();
  }

  public  resetForm(): void {
    this.productoForm.reset({ activo: true });
    this.imagenes = [];
    this.productoSeleccionado = null;
  }
}