import { Routes } from '@angular/router';
import {FoodComponent} from "./food/food.component";
import {GuestViewComponent} from "./view/guest-view/guest-view.component";
import {FamilyDetailsComponent} from "./guest/family-details/family-details.component";
import {CampaignViewComponent} from "./view/campaign-view/campaign-view.component";
import {DashboardViewComponent} from "./view/dashboard-view/dashboard-view.component";


export const routes: Routes = [
  {
    path:'',
    component: DashboardViewComponent
  },
    {
    path:'food',
    component: FoodComponent
  },
  {path:'guest',component:GuestViewComponent},
  {path:'campaign',component:CampaignViewComponent},

  {path:'guest/:id',component:FamilyDetailsComponent}
];
