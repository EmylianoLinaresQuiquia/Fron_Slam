
import { ApiClient } from './../../../api-client';
import { Component,CUSTOM_ELEMENTS_SCHEMA,OnInit} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Categoria } from './../../../api-client';
import { Subcategoria } from './../../../api-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-categorie',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SharedModule,NzMenuModule,NzDropDownModule],
  providers: [ApiClient],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent implements OnInit {
  categorias: Categoria[] = [];
  filteredCategorias: any[] = [];
  selectedCategoria: Categoria | null = null;
  selectedSubCategoria: Subcategoria | null = null;
  form!: FormGroup;
  isEditing = false;
  isLoading = false;

  subcategoryForm: FormGroup;
  editSubcategoryForm: FormGroup;
  // Propiedades para los filtros
  filterNombre: string = '';
  filterDescripcion: string = '';

  currentSubcategoryId: number | null | undefined;

  searchQuery: string = ''; // Para el filtro de búsqueda




  constructor(private apiClient: ApiClient, private fb: FormBuilder,private alertService: AlertService) {
    this.subcategoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.editSubcategoryForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
    this.initForm();
  }

  // Carga inicial de categorías
  loadCategorias(): void {
    this.isLoading = true;
    this.apiClient.categoriaAll().subscribe({
      next: (data) => {
        this.categorias = this.filteredCategorias = data;
        console.log("categorias",this.categorias)
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
        this.isLoading = false;
      }
    });
  }


  applyFilters(): void {
    if (!this.categorias || this.categorias.length === 0) {
      this.filteredCategorias = [];
      return;
    }

    this.filteredCategorias = this.categorias.filter(categoria => {
      // Filtro de búsqueda por nombre
      const matchesSearch = this.searchQuery
        ? categoria.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;



      return matchesSearch ;
    });

    console.log('Filtros aplicados:', this.filteredCategorias);
  }


  // Inicialización del formulario reactivo
  initForm(): void {
    this.form = this.fb.group({
      idCategoria: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  // Preparar el modal para agregar una nueva categoría
  prepareCategoriaAddModal(categoria: Categoria): void {
    this.isEditing = false;
    this.selectedCategoria = null; // Limpia la categoría seleccionada
    this.form.reset(); // Limpia el formulario
  }

  // Preparar el modal para editar una categoría existente
  prepareCategoriaEditModal(categoria: Categoria): void {
    this.isEditing = true;
    this.selectedCategoria = categoria; // Asigna la categoría seleccionada
    this.form.patchValue(categoria); // Rellena el formulario con los datos existentes
  }

  openAddSubcategoryModal(categoria: Categoria): void {
    this.selectedCategoria = categoria; // Asignar la categoría seleccionada
    this.subcategoryForm.reset(); // Opcional: Limpia el formulario para evitar datos anteriores
  }

  // Crear nueva categoría
createCategoria(): void {
  if (this.form.invalid) {
    this.alertService.showAlert('warning', 'Por favor, completa todos los campos requeridos.');
    return;
  }

  const categoriaData = this.form.value;

  this.apiClient.categoriaPOST(categoriaData).subscribe({
    next: () => {
      this.loadCategorias();
      this.alertService.showAlert('success', 'Categoría creada con éxito.');
    },
    error: (err) => {
      console.error('Error al crear la categoría:', err);
      this.alertService.showAlert('danger', 'Error al crear la categoría. Intenta nuevamente.');
    },
  });
}

// Actualizar categoría existente
updateCategoria(): void {
  if (!this.selectedCategoria) {
    this.alertService.showAlert('warning', 'No se ha seleccionado ninguna categoría para actualizar.');
    return;
  }

  if (this.form.invalid) {
    this.alertService.showAlert('warning', 'Por favor, completa todos los campos requeridos.');
    return;
  }

  const categoriaData = this.form.value;

  this.apiClient.categoriaPUT(this.selectedCategoria.idCategoria!, categoriaData).subscribe({
    next: () => {
      this.loadCategorias();
      this.alertService.showAlert('success', 'Categoría actualizada con éxito.');
    },
    error: (err) => {
      console.error('Error al actualizar la categoría:', err);
      this.alertService.showAlert('danger', 'Error al actualizar la categoría. Intenta nuevamente.');
    },
  });
}


  // Eliminar categoría
deleteCategoria(id: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
    this.apiClient.categoriaDELETE(id).subscribe({
      next: () => {
        this.loadCategorias();
        this.alertService.showAlert('success', 'Categoría eliminada con éxito.');
      },
      error: (err) => {
        console.error('Error al eliminar categoría:', err);
        this.alertService.showAlert('danger', 'Error al eliminar la categoría.');
      },
    });
  }
}


  // Método para aplicar filtros dinámicos





  // Crear subcategoría
createSubcategory(): void {
  if (!this.selectedCategoria) {
    this.alertService.showAlert('warning', 'Por favor, selecciona una categoría para añadir la subcategoría.');
    return;
  }

  const newSubcategory = new Subcategoria();
  newSubcategory.init({
    nombre: this.subcategoryForm.get('nombre')?.value,
    descripcion: this.subcategoryForm.get('descripcion')?.value,
    idCategoria: this.selectedCategoria.idCategoria!,
  });

  this.apiClient.subcategoriaPOST(newSubcategory).subscribe({
    next: () => {
      this.loadCategorias();
      this.alertService.showAlert('success', 'Subcategoría creada con éxito.');
    },
    error: (err) => {
      console.error('Error al crear la subcategoría:', err);
      this.alertService.showAlert('danger', 'Error al crear la subcategoría.');
    },
  });
}



// Eliminar subcategoría
deleteSubcategory(subcategoriaId: number, categoriaId: number): void {
  this.apiClient.subcategoriaDELETE(subcategoriaId).subscribe({
    next: () => {
      const categoriaIndex = this.categorias?.findIndex(
        (cat) => cat.idCategoria === categoriaId
      );

      if (categoriaIndex !== -1 && this.categorias?.[categoriaIndex]?.subcategorias) {
        this.categorias[categoriaIndex].subcategorias = this.categorias[
          categoriaIndex
        ].subcategorias.filter(
          (subcat) => subcat.id_subcategoria !== subcategoriaId
        );
      }

      this.alertService.showAlert('success', 'Subcategoría eliminada con éxito.');
    },
    error: (error) => {
      console.error('Error al eliminar la subcategoría:', error);
      this.alertService.showAlert('danger', 'Error al eliminar la subcategoría.');
    },
  });
}




prepareEditSubcategoryModal(subcategoria: Subcategoria, idCategoria: number): void {
  // Asegúrate de crear una nueva instancia fiel al tipo Subcategoria
  this.selectedSubCategoria = Object.assign(new Subcategoria(), subcategoria, { idCategoria });

  // Rellena el formulario con los datos de la subcategoría seleccionada
  this.editSubcategoryForm.setValue({
    nombre: subcategoria.nombre,
    descripcion: subcategoria.descripcion,
  });

  console.log('Modal preparado para edición. Subcategoría:', this.selectedSubCategoria);
}


updateSubcategory(): void {
  if (!this.selectedSubCategoria) {
    this.alertService.showAlert('warning', 'No se ha seleccionado ninguna Subcategoría para actualizar.');
    return;
  }

  if (this.editSubcategoryForm.invalid) {
    this.alertService.showAlert('warning', 'Por favor, completa todos los campos requeridos.');
    return;
  }

  // Asegúrate de que subcategoriaData incluye todos los campos necesarios
  const subcategoriaData = {
    ...this.editSubcategoryForm.value,  // Esto tomará 'nombre' y 'descripcion' del formulario
    id_subcategoria: this.selectedSubCategoria.id_subcategoria, // Añadir id_subcategoria
    idCategoria: this.selectedSubCategoria.idCategoria // Añadir idCategoria
  };

  console.log("Datos a enviar a la API:", subcategoriaData);  // Revisa que todos los campos estén presentes

  this.apiClient.subcategoriaPUT(this.selectedSubCategoria.id_subcategoria!, subcategoriaData).subscribe({
    next: () => {
      this.loadCategorias();
      this.alertService.showAlert('success', 'SubCategoría actualizada con éxito.');
    },
    error: (err) => {
      console.error('Error al actualizar la subcategoría:', err);
      this.alertService.showAlert('danger', 'Error al actualizar la subcategoría. Intenta nuevamente.');
    },
  });
}




}
