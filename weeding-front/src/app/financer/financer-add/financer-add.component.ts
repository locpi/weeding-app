import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Financer, FinancerType} from "../financer.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-financer-add',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    NgIf,
    MatOption,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    NgForOf,
      MatError,
      MatLabel
  ],
  templateUrl: './financer-add.component.html',
  styleUrl: './financer-add.component.css'
})
export class FinancerAddComponent {
  form: FormGroup;
  financerTypes = Object.values(FinancerType);
  populationList = ['A','P','T']
  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<FinancerAddComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Financer
  ) {
    this.form = this.fb.group({
      id: [data.id],
      code: [data.code || '', Validators.required],
      label: [data.label || '', Validators.required],
      financerTypeList: [data.financerTypeList || [], Validators.required],
      population: [data.population || []]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
