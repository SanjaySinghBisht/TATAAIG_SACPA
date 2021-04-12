import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SvgIconsComponent } from './directives/svg-icons/svg-icons.component';
import { PlanDetailsComponent } from './motor-sacpa/plan-details/plan-details.component';

const routes: Routes = [  { path: '', redirectTo: 'motorSacpa/plandeatils', pathMatch: 'full' },
						  { path: 'svg-icons', component: SvgIconsComponent},
						  { path: 'motorSacpa/plandeatils', component: PlanDetailsComponent}
						  // { path: 'commonpages', component: CommonpagesComponent}
						];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
