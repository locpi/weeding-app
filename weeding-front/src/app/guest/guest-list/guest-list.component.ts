import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FamilyService} from "../../services/family.service";
import {GuestDetailsComponent} from "../guest-details/guest-details.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatCheckbox,
    MatInput,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIcon,
    MatIconButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatCardTitle,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf,
    MatPaginator,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.css'
})
export class GuestListComponent {
  families: any[] = [];
  totalFamilies = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private familyService: FamilyService, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchFamilies();
  }

  fetchFamilies(page: number = 0, size: number = this.pageSize) {
    this.familyService.getFamilies(page,size).subscribe(data=>{
      this.families = data.content;
      this.totalFamilies = data.totalElements;
    })
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchFamilies(this.pageIndex, this.pageSize);
  }

  viewFamily(family: any) {
    this.dialog.open(GuestDetailsComponent, {
      width: '600px',
      data: family
    });
  }
}
