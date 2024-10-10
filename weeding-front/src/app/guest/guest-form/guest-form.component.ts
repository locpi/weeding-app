import { Component } from '@angular/core';
import {
  AdultFormData,
  ChildFormData,
  CreateFamilyDto,
  CreateGuestDto,
  GuestType,
  WitnessType
} from "../guest-list/guest.model";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FamilyService} from "../../services/family.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
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
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-guest-form',
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
    NgIf
  ],
  templateUrl: './guest-form.component.html',
  styleUrl: './guest-form.component.css'
})
export class GuestFormComponent {
  WitnessType = WitnessType;
  familyForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private familyService: FamilyService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.familyForm = this.fb.group({
      familyName: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      adults: this.fb.array([]),
      children: this.fb.array([])
    });
  }

  get adults() {
    return this.familyForm.get('adults') as FormArray;
  }

  get children() {
    return this.familyForm.get('children') as FormArray;
  }

  addAdult() {
    const adultForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      witnessType: [WitnessType.NONE],
      isConfirmed: [false]
    });
    this.adults.push(adultForm);
  }

  addChild() {
    const childForm = this.fb.group({
      firstName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(17)]]
    });
    this.children.push(childForm);
  }

  removeAdult(index: number) {
    this.adults.removeAt(index);
  }

  removeChild(index: number) {
    this.children.removeAt(index);
  }

  onSubmit() {
    if (this.familyForm.valid) {
      const formValue = this.familyForm.value;
      const createFamilyDto: CreateFamilyDto = {
        name: formValue.familyName,
        address: formValue.address,
        postalCode: formValue.postalCode,
        city: formValue.city,
        members: [
          ...formValue.adults.map((adult: AdultFormData): CreateGuestDto => ({
            firstName: adult.firstName,
            lastName: adult.lastName,
            phone: adult.phone,
            guestType: GuestType.ADULT,
            witnessType: adult.witnessType,
            isConfirmed: adult.isConfirmed
          })),
          ...formValue.children.map((child: ChildFormData): CreateGuestDto => ({
            firstName: child.firstName,
            lastName: '', // You might want to use family name here
            guestType: GuestType.CHILD,
            age: child.age,
            isConfirmed: true // Children are usually confirmed by default
          }))
        ]
      };

      this.familyService.createFamily(createFamilyDto).subscribe(
          response => {
            console.log('Family created successfully', response);
            // Handle success (e.g., show notification, redirect)
          },
          error => {
            console.error('Error creating family', error);
            // Handle error
          }
      );
    }
  }
}
