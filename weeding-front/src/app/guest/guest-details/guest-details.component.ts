import {Component, Inject, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Family} from "../guest-list/guest.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-guest-details',
  standalone: true,
	imports: [
		NgForOf,
		NgIf
	],
  templateUrl: './guest-details.component.html',
  styleUrl: './guest-details.component.css'
})
export class GuestDetailsComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public family:Family) {}
}
