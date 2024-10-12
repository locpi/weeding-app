import {Routes} from '@angular/router';
import {FoodComponent} from "./food/food.component";
import {GuestViewComponent} from "./view/guest-view/guest-view.component";
import {FamilyDetailsComponent} from "./guest/family-details/family-details.component";
import {CampaignViewComponent} from "./view/campaign-view/campaign-view.component";
import {DashboardViewComponent} from "./view/dashboard-view/dashboard-view.component";
import {authGuard} from "./guards/auth.guard";
import {FinancerListComponent} from "./financer/financer-list/financer-list.component";
import {PeoplesOrganizationComponent} from "./view/peoples-organization/peoples-organization.component";
import {CostComponent} from "./view/cost/cost.component";


export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardViewComponent,
		canActivate: [authGuard]
	},
	{
		path: 'food',
		component: FoodComponent,
		canActivate: [authGuard]

	},

	{
		path: 'guest', component: GuestViewComponent, canActivate: [authGuard]
	},
	{
		path: 'organization', component: PeoplesOrganizationComponent, canActivate: [authGuard]
	},
	{
		path: 'cost', component: CostComponent, canActivate: [authGuard]
	},
	{
		path: 'campaign', component: CampaignViewComponent, canActivate: [authGuard]
	},

	{
		path: 'financer', component: FinancerListComponent, canActivate: [authGuard]
	},
	{
		path: 'guest/:id', component: FamilyDetailsComponent, canActivate: [authGuard]
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}

];
