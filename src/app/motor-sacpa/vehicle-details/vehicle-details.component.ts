import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.sass']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleTypeArray = ['4W','2W'];
  vehicleDetails = new FormArray([]);
  vehicleMakeArray = [
    'Acura',
    'Allis Chalmers',
    'Alpha Romeo',
    'AMC',
    'Audi',
    'BMW',
    'Briggs & Stratton',
    'Buick',
    'Cadillac',
    'Caterpillar',
    'Chevrolet',
    'Chrysler',
    'Continental',
    'Cummins',
    'Detroit Diesel',
    'Deutz',
    'Deutz(Heavy Duty Trucks)',
    'Dodge',
    'Fiat',
    'Ford',
    'Ford(Heavy Duty Trucks)',
    'Geo',
    'GMC',
    'Henshel',
    'Hercules',
    'Hino',
    'Honda',
    'Hunmer',
    'Honda-Industrial',
    'Hyundai',
    'Infinity',
    'International',
    'Isuzu'
    ];

  vehicleDetailsArray = [
    {
      vehicle:'NEW'
    }
  ];
  innerWidth: any;
  mobileView:Boolean=false;

  constructor(private formBuilder: FormBuilder, private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceWidth();
    this.initializeForm();
  }

  getDeviceWidth(){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 480){
      this.mobileView = true;
    }
    console.log("MOBILE VIEW:::",this.mobileView);
    
  }

  initializeForm(){
    this.vehicleDetails.push(this.createVehicle(0));
    console.log(this.vehicleDetails.value);  
  }

  createVehicle(ind):FormGroup{
    let vehicleCnt = 'vehicle'+ind+'Status';

    let vehicleObj = {
      regNumber1:[''],
      regNumber2:[''],
      regNumber3:[''],
      regNumber4:[''],
      fullRegistrationNumber:[''],
      type:[null],
      make:[null],
      model:[null],
      manufacturingYear:[''],
      engineNumber:[''],
      chassisNumber:[''],
      changeHeadSm:[false],
      cardCollapsed:[false]
    }
    vehicleObj[vehicleCnt] = ['']
    
    return this.formBuilder.group(vehicleObj);
  }


  onInputEntry(evt, nextInput, previousInput, passcode) {
    console.log("PASSCODE::::::::::",passcode);
    

    const input = evt.target;
    const length = input.value.length;
    const maxLength = input.attributes.maxlength.value;

    if (length >= maxLength) {
      nextInput.focus();
    }
    if (evt.target.value != undefined) {
      
      if (evt.keyCode == 13) {
        return false;
      }
      if (evt.keyCode == 8) {
        previousInput.focus();
      }
    }
  }

  addVehicle(){
    let newVehicle = {
      vehicle:'NEW'
    }
    this.vehicleDetailsArray.push(newVehicle);
    let length = this.vehicleDetails.controls.length;
    if(length>9){
      // console.log("LIMIT");
      return;
    }
    this.vehicleDetails.push(this.createVehicle(length));
    console.log("LENGTH OF VEHICLE ARRAY",this.vehicleDetailsArray.length,"FORMARRAY:::",this.vehicleDetails.value);
  }

  cardCollapsed(ind){
    let vehicleCnt = 'vehicle'+ind+'Status';
    if(this.vehicleDetails.controls[ind].get('cardCollapsed').value){
      this.vehicleDetails.controls[ind].get('cardCollapsed').setValue(false);
      }
      else{
        this.vehicleDetails.controls[ind].get('cardCollapsed').setValue(true);
      }
    if(this.vehicleDetails.controls[ind].get(vehicleCnt).value){
      this.vehicleDetails.controls[ind].get('changeHeadSm').setValue(true);
    }
    console.log("VALUE OF CARD FORM:::",this.vehicleDetails.controls[ind].value);
    
  }

  deleteVehicle(index){
    this.vehicleDetails.removeAt(index);
  }

  mergeRegistrationNumber(ind){
    if(this.vehicleDetails.controls[ind].get('regNumber1').value.length < 2 ||
       this.vehicleDetails.controls[ind].get('regNumber2').value.length < 2 ||
       this.vehicleDetails.controls[ind].get('regNumber3').value.length < 2 ||
       this.vehicleDetails.controls[ind].get('regNumber4').value.length < 4
    ){
      return;
    }
    let registrationNumber = [];
    registrationNumber.push(this.vehicleDetails.controls[ind].get('regNumber1').value);
    registrationNumber.push(this.vehicleDetails.controls[ind].get('regNumber2').value);
    registrationNumber.push(this.vehicleDetails.controls[ind].get('regNumber3').value);
    registrationNumber.push(this.vehicleDetails.controls[ind].get('regNumber4').value);
    console.log("Merged registration number is::::",registrationNumber.join(' '));
    this.vehicleDetails.controls[ind].get('fullRegistrationNumber').setValue(registrationNumber.join(' '));
    console.log("INDEX IS::::::",this.vehicleDetails.controls[ind].value);
    
    // if(this.vehicleDetails)
  }

  save(){
    console.log("FORM VALUEIS::::::::::::::::::",this.vehicleDetails);
    for (let vehicle of this.vehicleDetails.controls){
      console.log(vehicle.value);
    }
    this.router.navigate(['motorSacpa/existingpolicydetails']);
    console.log("Navigare");
    
  }

  next(){
    this.toastr.error('Atleast one vehicle details are mandatory.','',{closeButton:true})
  }

  routeBack(){
    this.router.navigate(['motorSacpa/customerdetails']);
  }

}
