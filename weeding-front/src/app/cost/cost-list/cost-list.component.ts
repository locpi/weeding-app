import {Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import {CostLine, CostLineService, CostType, TimeLineService} from "../cost.service";
import {MatSort} from "@angular/material/sort";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {CostAddComponent} from "../cost-add/cost-add.component";

@Component({
	selector: 'app-cost-list',
	standalone: true,
	imports: [MatCard,
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
		RouterLink, CurrencyPipe, MatList, MatListItem, MatLine, DatePipe, MatSort],
	templateUrl: './cost-list.component.html',
	styleUrl: './cost-list.component.css',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class CostListComponent {
	costLines: CostLine[] = [];
	displayedColumns: string[] = ['name', 'type', 'adultPrice', 'childPrice', 'total', 'actions'];
	expandedElement!: CostLine | null;

	@ViewChild(MatTable) table!: MatTable<CostLine>;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private costLineService: CostLineService,
		private timeLineService: TimeLineService,
		private dialog: MatDialog
	) {
	}

	ngOnInit() {
		this.loadCostLines();
	}

	loadCostLines() {
		this.costLineService.getAll().subscribe(
			(data) => {
				this.costLines = data;
				this.table.renderRows();
			},
			(error) => console.error('Error fetching cost lines', error)
		);
	}

	openDialog(costLine?: CostLine) {
		const dialogRef = this.dialog.open(CostAddComponent, {
			width: '90vw',
			data: costLine || {},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.id) {
					this.costLineService.update(result).subscribe(() => this.loadCostLines());
				} else {
					this.costLineService.create(result).subscribe(() => this.loadCostLines());
				}
			}
		});
	}

	deleteCostLine(costLine: CostLine) {
		if (confirm('Are you sure you want to delete this cost line?')) {
			this.costLineService.delete(costLine.id).subscribe(() => this.loadCostLines());
		}
	}

	getTotal(costLine: CostLine): number {
		if (costLine.type === CostType.FIXE) {
			return costLine.priceFixe;
		}
		return costLine.adultPrice * costLine.adultQuantity + costLine.childPrice * costLine.childQuantity;
	}
}
