import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from "moment";
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.sass']
})
export class CustomerDetailsComponent implements OnInit {

  customerDetailsForm:FormGroup;
  salutationArray = ['Mr','Mrs','Ms'];
  maritalStatusArray = ['Single','Married'];
  occupationArray = ['Service','Engineer','Doctor'];
  relationshipArray = ['Brother','Sister'];
  @ViewChild('customerDob') customerDob: ElementRef;
  @ViewChild('nomineeDob') nomineeDob: ElementRef;
  @ViewChild('appointeeDob') appointeeDob: ElementRef;
  displayAppointeeFlag: Boolean = false;
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
  
  constructor(private formBuilder: FormBuilder,
              private eventManager: EventManager,
              private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.preFormatDates(this.customerDob.nativeElement);
    this.preFormatDates(this.nomineeDob.nativeElement);
    this.preFormatDates(this.appointeeDob.nativeElement);
  }

  initializeForm(){
    this.customerDetailsForm = this.formBuilder.group({
      salutation: [null],
      firstName:[''],
      middleName:[''],
      lastName:[''],
      customerDob: [''],
      gender:[''],
      maritalStatus:[null],
      occupation:[null],
      panNumber:[''],
      gstin:[''],
      email:[''],
      mobile:[''],
      pinCode:[''],
      addressLine1:[''],
      addressLine2:[''],
      addressLine3:[''],
      city:[''],
      state:[''],
      nomineeName:[''],
      nomineeDob:[''],
      nomineeRelationship:[null],
      nomineeAddress:[''],
      appointeeName:[''],
      appointeeDob:[''],
      appointeeRelationship:[null],
      appointeeAddress:['']
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

  formatLikeExcel(dobType) {
    var htmlElement = this.getHtmlElement(dobType);
    var values = htmlElement.value;

    var arr = values.split("-");
    // console.log("parsed value",arr,arr.length,arr[1],parseInt(arr[1]));
    if (arr.length > 1) {
      arr[1] = parseInt(arr[1]) ? parseInt(arr[1]) : this.months[arr[1].toLocaleLowerCase()];
      // arr[2] = parseInt(arr[2]) % 100;
      var finalValue = arr.join('/');
      htmlElement.value = finalValue;
    }
    if(dobType=='nominee'){
      this.calculateNomineeAge();
    }
  }

  getHtmlElement(dobType){
    let htmlElemnt ;
    switch (dobType) {
      case 'customer':{
        htmlElemnt = this.customerDob.nativeElement;
        break;
      }
      case 'nominee':{
        htmlElemnt = this.nomineeDob.nativeElement;
        break;
      }
      case 'appointee':{
        htmlElemnt = this.appointeeDob.nativeElement;
        break;
      }
    }
    return htmlElemnt;
  }

  calculateNomineeAge(){
    if(this.nomineeDob.nativeElement.value.length == 10){
      let year = moment().diff(moment(this.nomineeDob.nativeElement.value, "DD/MM/YYYY"), 'years');
      let months = moment().diff(moment(this.nomineeDob.nativeElement.value, "DD/MM/YYYY"), 'months');
      let days = moment().diff(moment(this.nomineeDob.nativeElement.value, "DD/MM/YYYY"), 'days');
      console.log("AGE IN YEARS::::::::::::",year,":::::::::::",months,"::::::::::::::",days);
      if(year>0&&year<18){
        console.log("DISPLAY TRUE:::::::::::::");
        this.displayAppointeeFlag = true;
      }
      else if(year == 0){
        if((months && months>0)||(days&&days>0)){
        console.log("DISPLAY TRUE:::::::::::::");
        this.displayAppointeeFlag = true;
        }
      }
    }
    // if(age && age<18){
    //   this.displayAppointeeFlag = true;
    // }
  }

  formatName(evt : any){
    var regex = new RegExp("^[a-zA-Z \s]+$");
    var str = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
    if (!regex.test(str)) {
      event.preventDefault();
      return false;
  }
  }

  formatEmail(evt: any) {
    var regex = /[A-Z0-9a-z@\._-]/;
    var str = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
    if (regex.test(str)) {
      return true;
    }
    else {
      evt.preventDefault();
      return false;
    }
  }

  route(){
    this.router.navigate(['motorSacpa/vehicledetails']);
  }

  routeBack(){
    this.router.navigate(['motorSacpa/plandetails']);
  }


}
