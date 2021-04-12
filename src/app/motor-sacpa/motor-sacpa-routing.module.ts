import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ExistingPaPolicyDetailsComponent } from './existing-pa-policy-details/existing-pa-policy-details.component';
import { AdditionalDocumentsComponent } from './additional-documents/additional-documents.component';
import { ReviewProposalComponent } from './review-proposal/review-proposal.component';
import { PreviousPolicyDetailsComponent } from './previous-policy-details/previous-policy-details.component';


const routes: Routes = [
    {path:'motorSacpa/plandetails', component:PlanDetailsComponent},
    {path:'motorSacpa/customerdetails', component:CustomerDetailsComponent},
    {path:'motorSacpa/vehicledetails', component:VehicleDetailsComponent},
    {path:'motorSacpa/existingpolicydetails', component:ExistingPaPolicyDetailsComponent},
    {path:'motorSacpa/previouspolicydetails', component:PreviousPolicyDetailsComponent},
    {path:'motorSacpa/additionaldocuments', component:AdditionalDocumentsComponent},
    {path:'motorSacpa/reviewproposal', component:ReviewProposalComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MotorSacpaRoutingModule { }