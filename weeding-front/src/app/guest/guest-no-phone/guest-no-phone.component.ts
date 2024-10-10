import { Component } from '@angular/core';
import {Guest} from "../guest-list/guest.model";
import {FamilyService} from "../../services/family.service";
import {NgForOf} from "@angular/common";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSmImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-guest-no-phone',
  standalone: true,
  imports: [
    NgForOf,
    MatCardContent,
    MatCardSmImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardHeader,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatTable,
    MatIcon,
    FormsModule
  ],
  templateUrl: './guest-no-phone.component.html',
  styleUrl: './guest-no-phone.component.css'
})
export class GuestNoPhoneComponent {

  guest!:Guest[];

  constructor(private readonly familyService:FamilyService) {
    this.familyService.getGuestWithoutPhone().subscribe(data=>this.guest=data)

  }


  updateGuest(g: Guest) {
    this.familyService.updateGuest(g).subscribe(d=>{
      let number = this.guest.indexOf(g);
      this.guest.splice(number,1)

    })
  }
}
