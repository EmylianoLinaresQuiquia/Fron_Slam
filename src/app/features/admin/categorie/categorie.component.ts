import { Component,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzMenuModule } from 'ng-zorro-antd/menu';

export interface Category {
  id: number;
  name: string;
  description: string;
  subcategories?: Category[];  // Recursive type for subcategories
  parentId?: number | null;     // Optional parentId to specify parent category
}

@Component({
  selector: 'app-categorie',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SharedModule,NzMenuModule,NzDropDownModule],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {
  categories: Category[] = [
    {
      id: 1,
      name: 'Food',
      description: 'Food products and drinks.',
      subcategories: [
        { id: 2, name: 'Pasta', description: 'Different types of pasta and noodles.' },
        { id: 3, name: 'Sauces', description: 'Variety of sauces to accompany.' },
      ],
    },
    {
      id: 4,
      name: 'Electronics',
      description: 'Electronic devices and accessories.',
      subcategories: [
        { id: 5, name: 'Smartphones', description: 'Mobile phones and accessories.' },
        { id: 6, name: 'Laptops', description: 'Portable computers and accessories.' },
      ],
    },
  ];

  expandedCategories: number[] = [];
  newCategory: Partial<Category> = { name: '', description: '', parentId: null };
  isAddCategoryModalVisible = false;
  isAddSubcategoryModalVisible = false;

  toggleCategory(categoryId: number): void {
    if (this.expandedCategories.includes(categoryId)) {
      this.expandedCategories = this.expandedCategories.filter((id) => id !== categoryId);
    } else {
      this.expandedCategories.push(categoryId);
    }
  }

  showAddCategoryModal(): void {
    this.newCategory = { name: '', description: '', parentId: null };
    this.isAddCategoryModalVisible = true;
  }

  showAddSubcategoryModal(parentId: number): void {
    this.newCategory = { name: '', description: '', parentId };
    this.isAddSubcategoryModalVisible = true;
  }

  addCategory(): void {
    const newId = Math.max(...this.categories.flatMap((c) => [c.id, ...(c.subcategories || []).map((sc) => sc.id)])) + 1;
    const newCategoryItem: Category = { id: newId, ...this.newCategory } as Category;

    if (this.newCategory.parentId) {
      this.categories = this.categories.map((category) =>
        category.id === this.newCategory.parentId
          ? { ...category, subcategories: [...(category.subcategories || []), newCategoryItem] }
          : category
      );
    } else {
      this.categories.push(newCategoryItem);
    }

    this.isAddCategoryModalVisible = false;
    this.isAddSubcategoryModalVisible = false;
  }

  deleteCategory(categoryId: number, parentId: number | null = null): void {
    if (parentId) {
      this.categories = this.categories.map((category) =>
        category.id === parentId
          ? { ...category, subcategories: category.subcategories?.filter((sc) => sc.id !== categoryId) }
          : category
      );
    } else {
      this.categories = this.categories.filter((category) => category.id !== categoryId);
    }
  }
}
