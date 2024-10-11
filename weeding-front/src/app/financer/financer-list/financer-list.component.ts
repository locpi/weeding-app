import {Component, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
	MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {Financer, FinancerService} from "../financer.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {FinancerAddComponent} from "../financer-add/financer-add.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-financer-list',
  standalone: true,
	imports: [
		MatLabel,
		MatFormField,
		MatButton,
		MatTable,
		MatHeaderCell,
		MatColumnDef,
		MatCell,
		MatCellDef,
		MatHeaderCellDef,
		MatInput,
		MatChip,
		MatIcon,
		MatIconButton,
		MatHeaderRow,
		MatRowDef,
		MatHeaderRowDef,
		MatRow,
		MatNoDataRow,
		MatPaginator,
		MatSort,
		NgForOf,
		MatChip
	],
  templateUrl: './financer-list.component.html',
  styleUrl: './financer-list.component.css'
})
export class FinancerListComponent {
	displayedColumns: string[] = ['code', 'label', 'financerTypeList','population', 'actions'];
	dataSource!: MatTableDataSource<Financer>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private financerService: FinancerService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.loadFinancers();
	}

	loadFinancers() {
		this.financerService.getFinancers().subscribe(financers => {
			this.dataSource = new MatTableDataSource(financers);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	openDialog(financer?: Financer) {
		const dialogRef = this.dialog.open(FinancerAddComponent, {
			width: '500px',
			data: financer || {}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (result.id) {
					this.financerService.updateFinancer(result).subscribe(() => {
						this.loadFinancers();
					});
				} else {
					this.financerService.createFinancer(result).subscribe(() => {
						this.loadFinancers();
					});
				}
			}
		});
	}

	deleteFinancer(financer: Financer) {
		if (confirm('Are you sure you want to delete this financer?')) {
			// this.financerService.deleteFinancer(financer.id).subscribe(() => {
			// 	this.loadFinancers();
			// });
		}
	}
}
