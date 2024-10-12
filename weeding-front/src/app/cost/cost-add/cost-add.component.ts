import {Component, Inject, OnInit} from '@angular/core';
import {MatCardActions} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle
} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {AsyncPipe, CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {CostLine, CostObject, CostPayment, CostType, Repartition, TimeLine} from "../cost.service";
import {MatDivider} from "@angular/material/divider";
import {MatLine} from "@angular/material/core";
import {MatListItem} from "@angular/material/list";
import {GroupPeople, GroupPeopleService} from "../../people/group/group-people.service";
import {OrganizerPeople, OrganizerPeopleService} from "../../people/organizer/organizer.service";
import {Observable} from "rxjs";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";

@Component({
	selector: 'app-cost-add',
	standalone: true,
	imports: [MatCardActions,
		MatLabel,
		MatFormField,
		MatDialogContent,
		MatDialogTitle,
		MatInput,
		FormsModule,
		MatDialogClose,
		MatButton,
		MatDialogActions, MatSelect, MatOption, ReactiveFormsModule, NgIf, NgForOf, MatError, MatDivider, CurrencyPipe, DatePipe, MatLine, MatListItem, AsyncPipe, MatCheckbox],
	templateUrl: './cost-add.component.html',
	styleUrl: './cost-add.component.css'
})
export class CostAddComponent implements OnInit {
	form: FormGroup;
	costObjectKeys: string[];
	costPaymentKeys: string[];
	costtype: string[];

	$organizer: Observable<OrganizerPeople[]>
	$peoplegroup: Observable<GroupPeople[]>

	timelineItemForm: FormGroup = new FormGroup({
		dueDate: new FormControl(),
		total: new FormControl(0),
	})

	organizer: OrganizerPeople[] = [];
	peoplegroup: GroupPeople[] = [];

	repartition: Repartition[] = [];

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<CostAddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: CostLine,
		private groupPeopleService: GroupPeopleService,
		private organizerPeopleService: OrganizerPeopleService
	) {
		this.costObjectKeys = Object.keys(CostObject);
		this.costPaymentKeys = Object.keys(CostPayment);
		this.costtype = Object.keys(CostType)
		this.$organizer = this.organizerPeopleService.getAll();
		this.$peoplegroup = this.groupPeopleService.getAll()

		this.form = this.fb.group({
			id: [this.data.id],
			name: [this.data.name, Validators.required],
			description: [this.data.description],
			adultPrice: [this.data.adultPrice, [Validators.min(0)]],
			childPrice: [this.data.childPrice, [Validators.min(0)]],
			priceFixe: [this.data.priceFixe, Validators.min(0)],
			subName: [this.data.subName],
			type: [this.data.type || CostType.FIXE, Validators.required],
			object: [this.data.object, Validators.required],
			paymentType: [this.data.paymentType, Validators.required],
			timeLineList: [],
			repartition: {}
		});
		if (this.form.controls['timeLineList']) {
			if (this.data.timeLineList && this.data.timeLineList.length > 0) {
				this.form.controls['timeLineList'].setValue(this.data.timeLineList)

			} else {
				this.form.controls['timeLineList'].setValue([])

			}
		}
	}

	ngOnInit() {

	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		if (this.form.valid) {
			this.form.controls['repartition'].setValue(this.repartition)
			this.dialogRef.close(this.form.value);
		}
	}


	addTimeLine() {


		const date = new Date(this.timelineItemForm.controls['dueDate'].value);
		const due = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
		const timline: TimeLine = {
			total: this.timelineItemForm.controls['total'].value,
			dueDate: due,
		}
		const arr = this.form.controls['timeLineList'].value;
		arr.push(timline)
		this.form.controls['timeLineList'].setValue(arr);
		this.timelineItemForm.reset()
	}


	setPeople(orga: OrganizerPeople, $event: MatSelectChange) {
		let find = this.repartition.find(f => f.organizerPeople?.id === orga.id);
		if (find) {
			find.peopleGroups = $event.value
		}
	}

	updateOrga(type: OrganizerPeople, $event: MatCheckboxChange) {
		let find = this.repartition.find(f => f.organizerPeople?.id === type.id);
		if ($event.checked) {
			this.repartition.push({
				organizerPeople: type,
				peopleGroups: []
			})
		} else {
			if (find) {
				let number = this.repartition.indexOf(find);
				this.repartition.slice(number, 1)

			}
		}
		console.log(this.repartition)
	}
}
