import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-previous-policy-details',
  templateUrl: './previous-policy-details.component.html',
  styleUrls: ['./previous-policy-details.component.sass']
})
export class PreviousPolicyDetailsComponent implements OnInit {

  @ViewChild('policyEndDate') policyEndDate: ElementRef;
  @ViewChild('policyStartDate') policyStartDate: ElementRef;
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

  policyDetails: FormGroup;
  insurerArray = ['Bajaj Allianz','HDFC ERGO'];

  constructor(private formBuilder: FormBuilder, private eventManager: EventManager,private router : Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.preFormatDates(this.policyEndDate.nativeElement);
    this.preFormatDates(this.policyStartDate.nativeElement);
  }

  initializeForm(){
    this.policyDetails = this.formBuilder.group({
      policyEndDate: [''],
      policyStartDate: [''],
      insurerName:[null],
      expiringPolicyNumber:[''],
      insurerAddres:['']
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

    var arr = values.split("-");
    // console.log("parsed value",arr,arr.length,arr[1],parseInt(arr[1]));
    if (arr.length > 1) {
      arr[1] = parseInt(arr[1]) ? parseInt(arr[1]) : this.months[arr[1].toLocaleLowerCase()];
      // arr[2] = parseInt(arr[2]) % 100;
      var finalValue = arr.join('/');
      htmlElement.value = finalValue;
    }
  }

  getHtmlElement(policyDateType){
    console.log("COMING CASEIS::::::::",policyDateType);
    
    let htmlElement;
    switch (policyDateType) {
      case 'endDate':{
        htmlElement = this.policyEndDate.nativeElement;
        break;
      }
      case 'startDate': {
        htmlElement = this.policyStartDate.nativeElement;
        break;
      }
    }
    return htmlElement;
  }

  save(){
    this.router.navigate(['motorSacpa/additionaldocuments']);
  }

  routeBack(){
    this.router.navigate(['motorSacpa/existingpolicydetails']);
  }

}
