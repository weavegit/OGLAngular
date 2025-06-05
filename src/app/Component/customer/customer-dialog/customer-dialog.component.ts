import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDTO } from '../../../dto/customer.dto';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-dialog',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.css'
})

export class CustomerDialogComponent {
  addForm!: FormGroup
  customer?: CustomerDTO = new CustomerDTO
  existingCustomer?: CustomerDTO
  mode: string = ""

  activate() {
    if (this.existingCustomer != undefined)
      this.customer = structuredClone(this.existingCustomer)
  }

  setUp() {
    this.addForm = new FormGroup({
      nameInput: new FormControl({ value: this.customer?.name, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      addressInput: new FormControl({ value: this.customer?.address, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      cityInput: new FormControl({ value: this.customer?.city, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      countyInput: new FormControl({ value: this.customer?.county, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      postcodeInput: new FormControl({ value: this.customer?.postcode, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
    })

  }

  //-------------------------------
  // Public Getters
  //-------------------------------
  get nameInput() {
    return this.addForm.get('nameInput')
  }
  get addressInput() {
    return this.addForm.get('addressInput')
  }
  get cityInput() {
    return this.addForm.get('cityInput')
  }
  get countyInput() {
    return this.addForm.get('countyInput')
  }
  get postcodeInput() {
    return this.addForm.get('postcodeInput')
  }

  NotSavable() {
    return !this.addForm.valid
  }

  Cancel() {
    this.activeModal.close()
  }
  Save() {
    this.customer!.name = this.nameInput!.value
    this.customer!.address = this.addressInput!.value
    this.customer!.city = this.cityInput!.value
    this.customer!.county = this.countyInput!.value
    this.customer!.postcode = this.postcodeInput!.value

    this.activeModal.close(this.customer)
  }
  //-------------------------------
  // System
  //-------------------------------
  ngOnInit(): void {
    this.activate()
    this.setUp()
  }
  constructor(private activeModal: NgbActiveModal) {

  }
}
