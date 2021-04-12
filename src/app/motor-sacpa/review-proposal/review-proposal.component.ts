import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-proposal',
  templateUrl: './review-proposal.component.html',
  styleUrls: ['./review-proposal.component.sass']
})
export class ReviewProposalComponent implements OnInit {

  premiumBreakupModalRef: BsModalRef;
  coverageBreakupModalRef: BsModalRef;
  config = { class: "theme-modal" };
  vehicleArray = [];
  paPolicyDetailsArray = [];
  isProposalFinalized:Boolean = false;

  constructor(private toastr: ToastrService,private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
    this.getVehicleData();
    this.getPaPolicyData();
  }

  getVehicleData(){
    this.vehicleArray = [
      {
        vehicleStatus: 'No',
        registrationNumber: 'MH04 AC4574',
        vehicleType: 'Private Car',
        make: 'Maruti',
        model:'800',
        manufacturingYear:'2020',
        engineNumber:'AX011235ABC',
        chassisNumber:'AX011235ABC'
      },
      {
        vehicleStatus: 'No',
        registrationNumber: 'MH04 AC4574',
        vehicleType: 'Private Car',
        make: 'Maruti',
        model:'800',
        manufacturingYear:'2020',
        engineNumber:'AX011235ABC',
        chassisNumber:'AX011235ABC'
      },
      {
        vehicleStatus: 'No',
        registrationNumber: 'MH04 AC4574',
        vehicleType: 'Private Car',
        make: 'Maruti',
        model:'800',
        manufacturingYear:'2020',
        engineNumber:'AX011235ABC',
        chassisNumber:'AX011235ABC'
      }
    ];
  }

  getPaPolicyData(){
    this.paPolicyDetailsArray = [
      {
        policyNumber: '12345678990',
        insurer:'Bajaj Alianz',
        capitalSumInsured: '15,00,000'
      }
    ];
  }

  finalizeProposal(){
    this.toastr.success('Policy Generated Successfully. Your Policy Number is AXCVBADA.','',{closeButton:true});
    this.isProposalFinalized = true;
  }

  openPremiumModal(premium_breakup_modal_template: TemplateRef<any>){
    this.premiumBreakupModalRef = this.modalService.show(premium_breakup_modal_template,this.config);
  }

  openCoverageModal(coverage_breakup_modal_template: TemplateRef<any>){
    this.coverageBreakupModalRef = this.modalService.show(coverage_breakup_modal_template,this.config);
  }

  routeBack(){
    this.router.navigate(['motorSacpa/additionaldocuments']);
  }

}
