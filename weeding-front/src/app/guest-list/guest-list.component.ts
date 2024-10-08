import { Component } from '@angular/core';
import {Guest} from "./guest.model";
import {GuestService} from "./guest.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
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
    MatLabel
  ],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.css'
})
export class GuestListComponent {

  displayedColumns: string[] = ['name', 'email', 'isAttending', 'plusOnes', 'actions'];
  dataSource = new MatTableDataSource<Guest>();

  newGuest: Guest = {
    name: '',
    email: '',
    isAttending: false,
    plusOnes: 0
  };

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe(
      guests => this.dataSource.data = guests
    );
  }

  addGuest(): void {
    if (this.newGuest.name && this.newGuest.email) {
      this.guestService.addGuest(this.newGuest).subscribe(
        guest => {
          this.dataSource.data = [...this.dataSource.data, guest];
          this.newGuest = {
            name: '',
            email: '',
            isAttending: false,
            plusOnes: 0
          };
        }
      );
    }
  }

  updateGuest(guest: Guest): void {
    this.guestService.updateGuest(guest).subscribe();
  }

  deleteGuest(guest: Guest): void {
    if (guest.id) {
      this.guestService.deleteGuest(guest.id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(g => g.id !== guest.id);
        }
      );
    }
  }
}
