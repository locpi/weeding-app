import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [
		MatIcon,
		MatListItemIcon,
		MatListItemTitle,
		MatListItem,
		NgForOf,
		MatNavList,
		RouterLink
	],
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
	menuItems = [
		{icon: 'people', text: 'Dashboard', link: ''},
		{icon: 'people', text: 'Liste des invités', link: 'guest'},
		{icon: 'bar_chart', text: 'Simulateur Traiteur', link: 'food'},
		{icon: 'bar_chart', text: 'Communications', link: 'campaign'},
		{icon: 'peoples', text: 'Administration', link: 'organization'},
		{icon: 'money', text: 'Dépenses', link: 'cost'},

	];
}
