import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-existing-pa-policy-details',
  templateUrl: './existing-pa-policy-details.component.html',
  styleUrls: ['./existing-pa-policy-details.component.sass']
})
export class ExistingPaPolicyDetailsComponent implements OnInit {

  policyDetails = new FormArray([]);
  insurerArray = ['Bajaj Allianz','HDFC ERGO'];
  sumInsuredError: Boolean = true;

  constructor(private formBuilder: FormBuilder, private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.policyDetails.push(this.createPolicyFormGroup());
  }

  createPolicyFormGroup():FormGroup{
    return this.formBuilder.group({
      policyNumber:[''],
      insurer:[null],
      capitalSumInsured:[''],
      showPolicyHeadSm:[false],
      cardCollapsed:[false]
    });
  }

  isNumberKey(evt: any) {
    if (
      (evt.key >= "0" && evt.key <= "9") ||
      evt.key == "Backspace" ||
      evt.key == "Delete" ||
      evt.key == "ArrowLeft" ||
      evt.key == "ArrowRight"
    ) {      
      return true;
    }
    return false;
  }

  addPolicyDetails(){
    this.policyDetails.push(this.createPolicyFormGroup());
  }

  deletePolicyDetails(index){
    this.policyDetails.removeAt(index);
  }

  cardCollapsed(ind){
    if(this.policyDetails.controls[ind].get('cardCollapsed').value){
      this.policyDetails.controls[ind].get('cardCollapsed').setValue(false);
      }
      else{
        this.policyDetails.controls[ind].get('cardCollapsed').setValue(true);
      }
      if(this.policyDetails.controls[ind].get('policyNumber').value){
        this.policyDetails.controls[ind].get('showPolicyHeadSm').setValue(true);
      }
      console.log("CONTROL VALUE:::::::",this.policyDetails.controls[ind].value);
      
  }

  save(){
    console.log("FORM VALUEIS:::::::::::",this.policyDetails.value);
    this.router.navigate(['motorSacpa/previouspolicydetails']);
    // this.router.navigate(['motorSacpa/additionaldocuments']);
  }

  next(){
    this.toastr.error('At least one existing PA policy details are mandatory.','',{closeButton:true})
  }

  routeBack(){
    this.router.navigate(['motorSacpa/vehicledetails']);
  }

}
