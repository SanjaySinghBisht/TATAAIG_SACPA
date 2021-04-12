import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.sass']
})
export class PlanDetailsComponent implements OnInit, AfterViewInit {

  planDetailsForm: FormGroup;
  sumInsuredArray = ['15,00,000','10,00,000','50,000','25,00,000'];
  months: Object = {
    'jan': '01',
    'feb': '02',
    'mar': '03',
    'apr': '04',
    'may': '05',
    'jun': '06',
    'jul': '07',
    'aug': '08',
    'sep': '09',
    'oct': '10',
    'nov': '11',
    'dec': '12'
  };
  @ViewChild('policyStartDate') policyStartDate: ElementRef;
  @ViewChild('policyEndDate') policyEndDate: ElementRef;
  constructor(private formBuilder: FormBuilder,private eventManager: EventManager,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.preFormatDates(this.policyStartDate.nativeElement);
  }

  initializeForm(){
    this.planDetailsForm = this.formBuilder.group({
      businessType : [''],
      previousPolicyEndDate : [''],
      policyStartDate: [''],
      personalAccidentPolicyRes: [''],
      personalAccidentPolicyType: [''],
      policyProviderName:[''],
      driverCover : [true],
      sumInsured: [null]
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
      console.log("FORMVALUE:::",this.planDetailsForm.value);
      
      return true;
    }
    return false;
  }

  checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str = num > parseInt(max.toString().charAt(0))
        && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
  }

  preFormatDates(htmlElement) {
    this.eventManager.addEventListener(htmlElement, 'keydown', (e) => {
      var input = htmlElement.value;
      if (/[\-]/.test(input)) return;
      var key = e.keyCode || e.charCode;

      if (key == 8 || key == 46)
        return false;

      if (/\D\/$/.test(input)) input = input.substr(0, input.length - 1);
      var values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
      });
      if (values[0]) values[0] = this.checkValue(values[0], 31);
      if (values[1]) values[1] = this.checkValue(values[1], 12);
      var output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + '/' : v;
      });
      htmlElement.value = output.join('').substr(0, 10);
    });
  }

  formatLikeExcel(policyDateType) {
    var htmlElement = this.getHtmlElement(policyDateType);
    var values = htmlElement.value;
    console.log("valueslength::::",values.length,values.split("/").length);
    if(policyDateType == 'endDate'){
      if(values.split("/").length == 3 && values.length == 10){
        console.log("SETSTART DATE");
        this.setPolicyStartDate();
      }
      else if(!values.length){
        this.policyStartDate.nativeElement.value = '';
      }
    }
    var arr = values.split("-");
    // console.log("parsed value",arr,arr.length,arr[1],parseInt(arr[1]));
    if (arr.length > 1) {
      arr[1] = parseInt(arr[1]) ? parseInt(arr[1]) : this.months[arr[1].toLocaleLowerCase()];
      // arr[2] = parseInt(arr[2]) % 100;
      var finalValue = arr.join('/');
      htmlElement.value = finalValue;
      if(policyDateType == 'endDate'){
        this.setPolicyStartDate();
      }
    }
  }

  getHtmlElement(policyDateType){
    let htmlElement;
    switch (policyDateType) {
      case 'endDate':{
      htmlElement = this.policyEndDate.nativeElement;
      break;
      }
      case 'startDate':{
      htmlElement = this.policyStartDate.nativeElement;
      break;
      }
    }
    return htmlElement;
  }

  setPolicyStartDate(){
    let setStartDate = moment(this.policyEndDate.nativeElement.value,"DD/MM/YYYY").add(1,'days')
    console.log("SET START DATE::::::",setStartDate.format('DD/MM/YYYY'));
    this.policyStartDate.nativeElement.value = setStartDate.format('DD/MM/YYYY');
    // let age = moment().diff(moment(this.nominee1Dob.nativeElement.value, "DD/MM/YYYY"), 'years');
    // console.log("AGE IN YEARS::::::::::::",age);   
    // if(age && age<18){
    //   this.displayAppointeeFlag = true;
    // }

  }

  businessTypeSelected(){
    if(this.planDetailsForm.get('businessType').value == 'Roll Over'){
      setTimeout(() => {
        this.preFormatDates(this.policyEndDate.nativeElement);
      },100);
    }
  }

  route(){
    this.router.navigate(['motorSacpa/customerdetails']);
  }

}
