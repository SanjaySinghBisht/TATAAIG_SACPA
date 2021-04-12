import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { MotorSacpaRoutingModule } from './motor-sacpa-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ExistingPaPolicyDetailsComponent } from './existing-pa-policy-details/existing-pa-policy-details.component';
import { AdditionalDocumentsComponent } from './additional-documents/additional-documents.component';
import { ReviewProposalComponent } from './review-proposal/review-proposal.component';
import { PreviousPolicyDetailsComponent } from './previous-policy-details/previous-policy-details.component';

@NgModule({
  declarations: [PlanDetailsComponent, CustomerDetailsComponent, VehicleDetailsComponent, ExistingPaPolicyDetailsComponent, AdditionalDocumentsComponent, ReviewProposalComponent, PreviousPolicyDetailsComponent],
  imports: [
    CommonModule,
    MotorSacpaRoutingModule,
    CommonModule,
	NgSelectModule,
	TypeaheadModule.forRoot(),
	FormsModule,
	ReactiveFormsModule,
	Ng2SearchPipeModule,
	CustomFormsModule,
	NgxSpinnerModule,
	NgxPaginationModule,
	NgMultiSelectDropDownModule,
	BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
		timeOut: 20000,
		preventDuplicates: true
	}),
  ]
})
export class MotorSacpaModule { }
