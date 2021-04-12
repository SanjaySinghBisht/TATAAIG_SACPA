import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-additional-documents',
  templateUrl: './additional-documents.component.html',
  styleUrls: ['./additional-documents.component.sass']
})
export class AdditionalDocumentsComponent implements OnInit {

  documentForm: FormGroup;
  previousYearPolicyCopyArray = new FormArray([]);
  rcCopyArray = new FormArray([]);
  form2930Array  = new FormArray([]);
  constructor(private formBuilder: FormBuilder,
              private cd : ChangeDetectorRef,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.previousYearPolicyCopyArray.push(this.addDocumentGroup(0));
    this.rcCopyArray.push(this.addDocumentGroup(0));
    this.form2930Array.push(this.addDocumentGroup(0));
    console.log("INITIALIZED FORM::::",this.documentForm);
    
  }

  initializeForm(){
    this.documentForm = this.formBuilder.group({
      documentDetails: [''],
      previousYearPolicyCopy: this.previousYearPolicyCopyArray,
      rcCopy:this.rcCopyArray,
      form2930:this.form2930Array
    });
  }

  addDocumentGroup(ind):FormGroup{
    let documentObject = {};
    let docCnt = 'document_'+ind;
    let docName = 'document_'+ind+'_name';
    let docType = 'document_'+ind+'_type';
    let docRemark = 'remark_'+ind;
    documentObject[docCnt] = [''];
    documentObject[docName] = [''];
    documentObject[docType] = [''];
    documentObject[docRemark] = [''];
    return this.formBuilder.group(documentObject);
  }

  addDocumentFileBtn(docType){
    switch (docType) {
      case 'previousYearPolicyCopy':{
        let length = this.documentForm.get('previousYearPolicyCopy').value.length;
        this.previousYearPolicyCopyArray.push(this.addDocumentGroup(length));
        console.log("PREVARRAY:::",this.previousYearPolicyCopyArray);
        
        // this.documentForm.get('previousYearPolicyCopy').value.push(this.addDocumentGroup(length));
        console.log("DOC FORM ARRAY::",this.documentForm.get('previousYearPolicyCopy').value);
        break;
      }
      case 'rcCopy' : {
        let length = this.documentForm.get('rcCopy').value.length;
        this.rcCopyArray.push(this.addDocumentGroup(length));
        console.log("PREVARRAY:::",this.rcCopyArray);
        
        // this.documentForm.get('previousYearPolicyCopy').value.push(this.addDocumentGroup(length));
        console.log("DOC FORM ARRAY::",this.documentForm.get('rcCopy').value);
        break;
      }
      case 'form2930' : {
        let length = this.documentForm.get('form2930').value.length;
        this.form2930Array.push(this.addDocumentGroup(length));
        console.log("PREVARRAY:::",this.form2930Array);
        
        // this.documentForm.get('previousYearPolicyCopy').value.push(this.addDocumentGroup(length));
        console.log("DOC FORM ARRAY::",this.documentForm.get('form2930').value);
        break;
      }
    }
  }

  onFileChange(event,docFor,ind) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.setFormFileName(docFor,file,ind);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
    
        this.cd.markForCheck();
      };
    }
  }

  setFormFileName(docFor,file,ind){
    switch (docFor) {
      case 'previousYearPolicyCopy':{
        let docName = 'document_'+ind+'_name';
        this.previousYearPolicyCopyArray.controls[ind].get(docName).setValue(file.name);
        console.log("UPDATED:::::NAME:::",this.previousYearPolicyCopyArray);
        break;
      }
      case 'rcCopy':{
        let docName = 'document_'+ind+'_name';
        this.rcCopyArray.controls[ind].get(docName).setValue(file.name);
        console.log("UPDATED:::::NAME:::",this.rcCopyArray);
        break;
      }
      case 'form2930':{
        let docName = 'document_'+ind+'_name';
        this.form2930Array.controls[ind].get(docName).setValue(file.name);
        console.log("UPDATED:::::NAME:::",this.form2930Array);
        break;
      }
    }
  }

  removeDocFile(ind,docFor){
    switch (docFor) {
      case 'previousYearPolicyCopy':{
        let docName = 'document_'+ind+'_name';
        this.previousYearPolicyCopyArray.controls[ind].get(docName).setValue('');
        break;
      }
      case 'rcCopy':{
        let docName = 'document_'+ind+'_name';
        this.rcCopyArray.controls[ind].get(docName).setValue('');
        console.log("UPDATED:::::NAME:::",this.rcCopyArray);
        break;
      }
      case 'form2930':{
        let docName = 'document_'+ind+'_name';
        this.form2930Array.controls[ind].get(docName).setValue('');
        console.log("UPDATED:::::NAME:::",this.form2930Array);
        break;
      }
    }
  }

  removeFileFromArr(ind,docFor){
    switch (docFor) {
      case 'previousYearPolicyCopy':{
        let docName = 'document_'+ind+'_name';
        this.previousYearPolicyCopyArray.removeAt(ind);
        break;
      }
      case 'rcCopy':{
        let docName = 'document_'+ind+'_name';
        this.rcCopyArray.removeAt(ind);
        console.log("UPDATED:::::NAME:::",this.rcCopyArray);
        break;
      }
      case 'form2930':{
        let docName = 'document_'+ind+'_name';
        this.form2930Array.removeAt(ind);
        console.log("UPDATED:::::NAME:::",this.form2930Array);
        break;
      }
    }
  }

  save(){
    console.log("FIANL FORM VALUEIS:::",this.documentForm.value);
    
  }

  route(){
    this.router.navigate(['motorSacpa/reviewproposal']);
  }

  routeBack(){
    this.router.navigate(['motorSacpa/previouspolicydetails']);
  }

}
