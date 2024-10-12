import {Routes} from '@angular/router';
import {FoodComponent} from "./food/food.component";
import {GuestViewComponent} from "./view/guest-view/guest-view.component";
import {FamilyDetailsComponent} from "./guest/family-details/family-details.component";
import {CampaignViewComponent} from "./view/campaign-view/campaign-view.component";
import {DashboardViewComponent} from "./view/dashboard-view/dashboard-view.component";
import {authGuard} from "./layout/connected/guards/auth.guard";
import {PeoplesOrganizationComponent} from "./view/peoples-organization/peoples-organization.component";
import {CostComponent} from "./view/cost/cost.component";
import {ValidatePaymentComponent} from "./actions/validate-payment/validate-payment.component";
import {ConnectedComponent} from "./layout/connected/connected.component";
import {PublicComponent} from "./layout/public/public.component";

export const routePublic: Routes = [
	{
		path: 'actions/validate-payment', component: ValidatePaymentComponent
	},
]

export const routesConnected: Routes = [
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
		path: 'guest/:id', component: FamilyDetailsComponent, canActivate: [authGuard]
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}

];

export const globalRoutes: Routes = [

	{
		path: 'site',
		component: PublicComponent,
		children: routePublic
	},
	{
		path: '',
		component: ConnectedComponent,
		children: routesConnected
	}

]

