import {Component, inject} from '@angular/core';
import {CateringItem} from "./food.model";
import {CateringService} from "./food.service";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FamilyService} from "../services/family.service";

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    MatHeaderRow,
    MatRow,
    MatIcon,
    MatIconButton,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatFormField,
    MatInput,
    FormsModule,
    MatTable,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatSelect,
    MatOption,
    MatLabel,
    NgForOf,
    MatButton,
    MatRowDef,
    MatHeaderRowDef
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {

  familyService = inject(FamilyService);

  displayedColumns: string[] = ['name', 'description', 'category', 'adultPrice', 'childPrice', 'adultQuantity', 'childQuantity', 'total', 'actions'];
  dataSource = new MatTableDataSource<CateringItem>();
  categories = ['Entrée', 'Plat principal', 'Dessert', 'Boisson','FIXE'];

  newItem: CateringItem = {
    name: '',
    description: '',
    adultPrice: 0,
    childPrice: 0,
    adultQuantity: 0,
    childQuantity: 0,
    category: '',
    total:0,
    type:'FOOD'
  };

  constructor(private cateringService: CateringService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.cateringService.getItems().subscribe(
      items => this.dataSource.data = items
    );
  }

  addItem(): void {
    if (this.newItem.name && this.newItem.category) {
      this.cateringService.addItem(this.newItem).subscribe(
        item => {
          this.dataSource.data = [...this.dataSource.data, item];
          this.resetNewItem();
        }
      );
    }
  }

  updateItem(item: CateringItem): void {
    this.cateringService.updateItem(item).subscribe();
  }

  deleteItem(item: CateringItem): void {
    if (item.id) {
      this.cateringService.deleteItem(item.id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
        }
      );
    }
  }

  calculateTotal(item: CateringItem): number {
    return item.total;
  }

  calculateGrandTotal(): number {
    return this.dataSource.data.reduce((total, item) =>
      total + item.total, 0);
  }

  resetNewItem(): void {
    this.newItem = {
      name: '',
      description: '',
      adultPrice: 0,
      childPrice: 0,
      adultQuantity: 0,
      childQuantity: 0,
      category: '',
      total:0,
      type:'FOOD'
    };
  }
}
