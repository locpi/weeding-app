import { Routes } from '@angular/router';
import {FoodComponent} from "./food/food.component";
import {GuestListComponent} from "./guest-list/guest-list.component";

export const routes: Routes = [
  {
    path:'food',
    component: FoodComponent
  },
  {path:'guest',component:GuestListComponent}
];
